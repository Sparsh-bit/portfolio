/** Base URL of the deployed Neon booking Function. Set at build time via VITE_BOOKING_API. */
export const BOOKING_API = (import.meta.env.VITE_BOOKING_API as string | undefined) ?? "";

export type ServiceId = "website-build" | "booking-system";

export type BookingRequest = {
  service: ServiceId;
  name: string;
  email: string;
  company?: string;
  message?: string;
  date: string; // YYYY-MM-DD (IST)
  slot: string; // HH:MM (IST)
  website?: string; // honeypot — must stay empty
};

/** Slots the booking system offers each working day (IST). */
export const SLOT_HOURS = [10, 11, 12, 13, 14, 15, 16, 17] as const;
export const slotLabel = (h: number) => `${String(h).padStart(2, "0")}:00 – ${String(h + 1).padStart(2, "0")}:00 IST`;

export async function fetchTakenSlots(date: string): Promise<string[]> {
  if (!BOOKING_API) return [];
  const res = await fetch(`${BOOKING_API}/slots?date=${encodeURIComponent(date)}`);
  if (!res.ok) throw new Error("availability unavailable");
  const data = (await res.json()) as { taken: string[] };
  return data.taken;
}

export async function submitBooking(req: BookingRequest): Promise<{ ok: boolean; ref?: string; error?: string }> {
  const res = await fetch(`${BOOKING_API}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string; ref?: string };
  if (!res.ok) return { ok: false, error: data.error ?? `Booking failed (${res.status})` };
  return { ok: true, ref: data.ref ?? "" };
}
