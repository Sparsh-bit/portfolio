import { Hono } from "hono";
import { attachDatabasePool } from "@neon/functions";
import { Pool } from "pg";

/**
 * Booking API for the Sparsh Sharma portfolio.
 * Runs as a Neon Function on the same branch as the database.
 * DATABASE_URL is injected at runtime by Neon.
 */

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
attachDatabasePool(pool);

const SLOTS = [10, 11, 12, 13, 14, 15, 16, 17]; // 10:00–18:00 IST, hourly

/** Origins allowed to call this API from a browser. `*` would let any site farm the form. */
const ALLOWED_ORIGINS = new Set([
  "https://sparshsharma.in",
  "https://www.sparshsharma.in",
  "http://localhost:4173", // production preview build
  "http://localhost:5173", // vite dev
]);

/** Best-effort in-memory rate limiter (per Neon Function instance): 8 submissions / 15 min per IP. */
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 8;
const rateHits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) return true;
  hits.push(now);
  rateHits.set(ip, hits);
  // occasional cleanup of stale entries
  if (rateHits.size > 500) rateHits.forEach((v, k) => { if (v.every((t) => now - t >= RATE_WINDOW_MS)) rateHits.delete(k); });
  return false;
}

function corsHeaders(origin: string | undefined): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

const json = (c: { json: (o: unknown, s?: number) => Response }, data: unknown, status = 200) => c.json(data, status);

const app = new Hono();

app.use("*", async (c, next) => {
  const origin = c.req.header("origin");
  const headers = corsHeaders(origin);
  if (c.req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  await next();
  Object.entries(headers).forEach(([k, v]) => c.res.headers.set(k, v));
});

/** Health */
app.get("/", (c) => c.text("booking api ok"));

/** GET /slots?date=YYYY-MM-DD — which hourly slots are already booked (IST day). */
app.get("/slots", async (c) => {
  const date = c.req.query("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json(c, { error: "date must be YYYY-MM-DD" }, 400);

  const startsAt = istSlotTimestamp(date, 0);
  const endsAt = istSlotTimestamp(date, 24);
  const { rows } = await pool.query<{ slot_hour: number }>(
    `SELECT (EXTRACT(HOUR FROM starts_at AT TIME ZONE 'Asia/Kolkata'))::int AS slot_hour
     FROM bookings WHERE starts_at >= $1 AND starts_at < $2 AND status <> 'cancelled'`,
    [startsAt, endsAt]
  );
  const taken = rows.map((r) => String(r.slot_hour).padStart(2, "0"));
  return json(c, { date, taken });
});

/** POST /bookings — create a booking request. */
app.post("/bookings", async (c) => {
  const ip = (c.req.header("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) return json(c, { error: "too many requests — try again later" }, 429);

  let body: Record<string, unknown>;
  try {
    body = await c.req.json();
  } catch {
    return json(c, { error: "invalid JSON body" }, 400);
  }

  const service = String(body.service ?? "");
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const company = String(body.company ?? "").trim().slice(0, 120);
  const message = String(body.message ?? "").trim().slice(0, 2000);
  const date = String(body.date ?? "");
  const slot = String(body.slot ?? "");
  const website = String(body.website ?? "");

  // honeypot: bots that fill the hidden "website" field get a silent success
  if (website) return json(c, { ref: "ok" });

  if (!["website-build", "booking-system"].includes(service)) return json(c, { error: "unknown service" }, 400);
  if (name.length < 2 || name.length > 120) return json(c, { error: "name must be 2–120 characters" }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(c, { error: "a valid email is required" }, 400);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json(c, { error: "date must be YYYY-MM-DD" }, 400);
  if (!/^\d{2}$/.test(slot)) return json(c, { error: "slot must be HH (00–23)" }, 400);

  const hour = parseInt(slot, 10);
  if (!SLOTS.includes(hour)) return json(c, { error: "slot outside working hours" }, 400);
  if (isSunday(date)) return json(c, { error: "Sundays are off" }, 400);

  const startsAt = istSlotTimestamp(date, hour);
  if (Date.parse(startsAt) <= Date.now()) return json(c, { error: "that time is in the past" }, 400);

  try {
    const { rows } = await pool.query<{ id: number }>(
      `INSERT INTO bookings (service, name, email, company, message, starts_at)
       VALUES ($1, $2, $3, NULLIF($4, ''), NULLIF($5, ''), $6)
       RETURNING id`,
      [service, name, email, company, message, startsAt]
    );
    const id = rows[0].id;
    return json(c, { ref: `SS-${String(id).padStart(4, "0")}` }, 201);
  } catch (err) {
    const code = (err as { code?: string }).code;
    if (code === "23505") return json(c, { error: "that slot was just taken — please pick another" }, 409);
    console.error("[booking insert]", err);
    return json(c, { error: "could not save booking" }, 500);
  }
});

/** GET /admin/bookings — list all bookings. Requires x-admin-secret header. */
app.get("/admin/bookings", async (c) => {
  const secret = c.req.header("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) return json(c, { error: "unauthorized" }, 401);
  const { rows } = await pool.query(
    `SELECT id, service, name, email, company, message, starts_at AT TIME ZONE 'Asia/Kolkata' AS starts_ist, status, created_at
     FROM bookings ORDER BY starts_at ASC LIMIT 500`
  );
  return json(c, { bookings: rows });
});

export default app;

/* ── helpers ── */

/** Build an ISO timestamptz for date + hour in IST. */
function istSlotTimestamp(date: string, hour: number): string {
  return `${date}T${String(hour).padStart(2, "0")}:00:00+05:30`;
}

function isSunday(date: string): boolean {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() === 0;
}
