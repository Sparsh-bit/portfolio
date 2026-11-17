import { readFileSync } from "node:fs";
import { Pool } from "pg";

/** Reads DATABASE_URL from .env.local (written by `neon link`) and applies the bookings schema. */
function loadEnv(file) {
  const out = {};
  try {
    const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].trim().replace(/^"(.*)"$/, "$1");
    }
  } catch { /* file missing */ }
  return out;
}

const env = { ...loadEnv(".env"), ...loadEnv(".env.local") };
const url = process.env.DATABASE_URL ?? env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not found — run `neon link` first.");
  process.exit(1);
}

const pool = new Pool({ connectionString: url, max: 1 });
await pool.query(`
  CREATE TABLE IF NOT EXISTS bookings (
    id bigserial PRIMARY KEY,
    service text NOT NULL CHECK (service IN ('website-build', 'booking-system')),
    name text NOT NULL,
    email text NOT NULL,
    company text,
    message text,
    starts_at timestamptz NOT NULL UNIQUE,
    status text NOT NULL DEFAULT 'requested',
    created_at timestamptz NOT NULL DEFAULT now()
  );
  CREATE INDEX IF NOT EXISTS bookings_starts_idx ON bookings (starts_at);
`);
console.log("bookings table ready");
await pool.end();
