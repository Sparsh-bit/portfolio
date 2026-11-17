import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animate, stagger } from "animejs";
import { motionOff } from "@/hooks/motion";
import { Spotlight, burst } from "@/components/Anim";
import { BorderBeam } from "@/components/lightswind/border-beam";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import { bookingServices } from "@/lib/data";
import { SLOT_HOURS, slotLabel, fetchTakenSlots, submitBooking, type ServiceId } from "@/lib/api";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, Globe, Loader2, MonitorSmartphone, PlugZap } from "lucide-react";

const IST = "Asia/Kolkata";
const STEP_LABELS = ["Service", "Date & time", "Your details"];

function istToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: IST, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}
function istMonthStart(): { y: number; m: number } {
  const [y, m] = istToday().split("-").map(Number);
  return { y, m };
}

/** Booking: pick a service, pick a slot on the calendar, leave your details — stored in Neon Postgres. */
export function Booking() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceId | null>(null);
  const [month, setMonth] = useState(istMonthStart);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [taken, setTaken] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ref: string } | null>(null);
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // animate each step's content in (anime.js stagger)
  useEffect(() => {
    if (motionOff() || !panel.current) return;
    const a = animate(panel.current.querySelectorAll("[data-step]"), { opacity: [0, 1], translateY: [18, 0], duration: 650, delay: stagger(80), ease: "outQuart" });
    return () => { a.revert(); };
  }, [step]);

  useEffect(() => {
    if (!date) { setTaken([]); return; }
    let alive = true;
    setSlotsLoading(true);
    fetchTakenSlots(date)
      .then((t) => { if (alive) setTaken(t); })
      .catch(() => { if (alive) setTaken([]); })
      .finally(() => { if (alive) setSlotsLoading(false); });
    return () => { alive = false; };
  }, [date]);

  const calendar = useMemo(() => buildCalendar(month.y, month.m, istToday()), [month]);
  const today = istToday();

  const next = () => setStep((s) => Math.min(2, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  async function submit() {
    if (!service || !date || !slot) return;
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email.";
    if (form.message.length > 2000) errs.message = "Message is too long.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    const res = await submitBooking({ service, name: form.name, email: form.email, company: form.company, message: form.message, date, slot, website: form.website });
    setSubmitting(false);
    if (res.ok) {
      setResult({ ref: res.ref ?? "" });
      burst(section.current);
    } else {
      setErrors({ form: res.error });
    }
  }

  return (
    <section ref={section} id="booking" className="relative overflow-hidden bg-slate grain py-24 text-white md:py-32">
      <Spotlight color="rgba(95,196,190,.14)" size={640} />
      <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-teal/10 blur-[140px]" aria-hidden />

      <div className="wrap relative z-10">
        <p className="t-mono flex items-center gap-3 uppercase !text-teal" data-reveal="fade">
          <span className="h-px w-10 bg-teal" aria-hidden /> Booking // 05
        </p>
        <h2 className="t-h1 mt-6 max-w-[18ch] text-white" data-reveal="up">
          Book me to <span className="serif-it text-gold">build it</span> — or to wire in <span className="serif-it text-gold">your own booking system</span>
        </h2>
        <p className="t-lead mt-4 max-w-xl !text-white/60" data-reveal="up">
          Pick a service, choose a free slot, and your request lands directly in my booking system. I'll confirm by email within a day.
        </p>

        {/* Step indicator */}
        <div className="mt-10 flex items-center gap-3" data-reveal="fade">
          {STEP_LABELS.map((l, i) => (
            <div key={l} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-300 ${i < step ? "border-teal/60 bg-teal/10 text-teal" : i === step ? "border-teal bg-teal text-slate" : "border-white/15 text-white/40"}`}>
                <span className="font-mono text-[11px]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[12px] font-[550] max-sm:hidden">{l}</span>
                {i < step && <Check size={13} />}
              </div>
              {i < STEP_LABELS.length - 1 && <span className="h-px w-8 bg-white/15" aria-hidden />}
            </div>
          ))}
        </div>

        <div ref={panel} className="mt-8 rounded-3xl border border-white/10 bg-white/[.03] p-6 backdrop-blur-sm md:p-10">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="done" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal text-slate"><Check size={26} strokeWidth={2.4} /></div>
                <h3 className="t-h2 mt-6 text-white">Request received</h3>
                <p className="t-body mt-3 !text-white/60">
                  {bookingServices.find((s) => s.id === service)?.title} · {date} · {slot && slotLabel(parseInt(slot, 10))}
                </p>
                <p className="t-mono mt-4 uppercase !text-teal">Reference {result.ref}</p>
                <p className="t-body mt-4 !text-white/60">I'll confirm (or propose a different slot) at <span className="text-white">{form.email}</span> within 24 hours.</p>
                <button className="btn btn-light btn-sm mx-auto mt-8" onClick={() => { setResult(null); setStep(0); setService(null); setDate(null); setSlot(null); }}>Make another request</button>
              </motion.div>
            ) : (
              <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}>
                {step === 0 && <StepService service={service} setService={setService} next={next} />}
                {step === 1 && <StepSchedule month={month} setMonth={setMonth} calendar={calendar} date={date} setDate={setDate} slot={slot} setSlot={setSlot} taken={taken} loading={slotsLoading} today={today} next={next} back={back} />}
                {step === 2 && <StepDetails form={form} setForm={setForm} errors={errors} submitting={submitting} submit={submit} back={back} summary={{ service: bookingServices.find((s) => s.id === service)?.title ?? "", date: date ?? "", slot: slot ? slotLabel(parseInt(slot, 10)) : "" }} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="t-mono mt-6 uppercase !text-white/40" data-reveal="fade">
          Slots are 60 minutes · IST (UTC+5:30) · Sundays off · Bookings are stored in my own Neon Postgres booking system — the same one I can integrate into your site.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Step 1 · service ───────────────────────── */

function StepService({ service, setService, next }: { service: ServiceId | null; setService: (s: ServiceId) => void; next: () => void }) {
  const icons = { "website-build": MonitorSmartphone, "booking-system": PlugZap };
  return (
    <div data-step>
      <div className="grid gap-4 md:grid-cols-2">
        {bookingServices.map((s) => {
          const Icon = icons[s.id];
          const active = service === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setService(s.id)}
              aria-pressed={active}
              className={`group relative overflow-hidden rounded-2xl border p-7 text-left transition-all duration-300 ${active ? "border-teal bg-teal/[.08]" : "border-white/12 bg-white/[.02] hover:border-white/25"}`}
            >
              {active && <BorderBeam size={70} duration={6} colorFrom="#5FC4BE" colorTo="#20736E" />}
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? "bg-teal text-slate" : "bg-white/[.06] text-teal"}`}><Icon size={20} strokeWidth={1.9} /></div>
                <span className="t-mono uppercase !text-white/40">{s.weeks}</span>
              </div>
              <h3 className="t-h3 mt-6 text-white">{s.title}</h3>
              <p className="t-body mt-2 !text-white/60">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-[.92rem] text-white/80">
                    <Check size={15} className="text-teal" strokeWidth={2.2} /> {d}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex justify-end">
        <MagneticButton variant="light" size="lg" disabled={!service} onClick={next}>Choose a slot <ArrowRight size={16} className="arr" /></MagneticButton>
      </div>
    </div>
  );
}

/* ───────────────────────── Step 2 · calendar + slots ───────────────────────── */

type Cal = { y: number; m: number } & { cells: Array<{ d: number; iso: string } | null> };
function buildCalendar(y: number, m: number, todayISO: string): Cal {
  const first = new Date(Date.UTC(y, m - 1, 1));
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const lead = (first.getUTCDay() + 6) % 7; // Monday-first grid
  const cells: Array<{ d: number; iso: string } | null> = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) {
    const iso = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ d, iso });
  }
  while (cells.length % 7) cells.push(null);
  return { y, m, cells };
}

function StepSchedule(props: {
  month: { y: number; m: number }; setMonth: (v: { y: number; m: number }) => void;
  calendar: Cal; date: string | null; setDate: (d: string) => void;
  slot: string | null; setSlot: (s: string) => void;
  taken: string[]; loading: boolean; today: string;
  next: () => void; back: () => void;
}) {
  const { month, setMonth, calendar, date, setDate, slot, setSlot, taken, loading, today, next, back } = props;
  const [y, m] = [calendar.y, calendar.m];
  const shiftMonth = (delta: number) => {
    const nm = m + delta;
    setMonth(nm < 1 ? { y: y - 1, m: 12 } : nm > 12 ? { y: y + 1, m: 1 } : { y, m: nm });
  };
  const isPast = (iso: string) => iso < today;
  const isSunday = (iso: string) => { const [Y, M, D] = iso.split("-").map(Number); return new Date(Date.UTC(Y, M - 1, D)).getUTCDay() === 0; };
  const monthName = new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en", { month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr]" data-step>
      {/* calendar */}
      <div>
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-[550] text-white"><CalendarDays size={16} className="text-teal" /> {monthName}</p>
          <div className="flex gap-2">
            <button onClick={() => shiftMonth(-1)} disabled={monthName === new Date().toLocaleString("en", { month: "long", year: "numeric" })} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 text-white/70 transition-colors hover:border-teal hover:text-teal disabled:opacity-30" aria-label="Previous month"><ArrowLeft size={14} /></button>
            <button onClick={() => shiftMonth(1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 text-white/70 transition-colors hover:border-teal hover:text-teal" aria-label="Next month"><ArrowRight size={14} /></button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => <span key={d} className="t-mono py-1 uppercase !text-white/35">{d}</span>)}
          {calendar.cells.map((c, i) => c === null ? <span key={`x${i}`} /> : (
            <button
              key={c.iso}
              disabled={isPast(c.iso) || isSunday(c.iso)}
              onClick={() => { setDate(c.iso); setSlot(""); }}
              aria-pressed={date === c.iso}
              className={`slot-pop aspect-square rounded-lg border text-[13px] font-[550] transition
                ${date === c.iso ? "border-teal bg-teal text-slate"
                  : isPast(c.iso) || isSunday(c.iso) ? "border-transparent text-white/20"
                  : "border-white/10 text-white/80 hover:border-teal/60 hover:bg-teal/10"}`}
            >
              {c.d}
            </button>
          ))}
        </div>
        <p className="t-mono mt-4 uppercase !text-white/35">Sundays unavailable · Greyed = past</p>
      </div>

      {/* slots */}
      <div>
        <p className="flex items-center gap-2 text-sm font-[550] text-white"><Clock size={16} className="text-teal" /> Available slots {date && <span className="t-mono uppercase !text-white/40">· {date}</span>}</p>
        {!date ? (
          <p className="t-body mt-6 !text-white/45">Pick a date on the calendar to see open slots.</p>
        ) : loading ? (
          <div className="mt-6 flex items-center gap-2 t-body !text-white/45"><Loader2 size={15} className="animate-spin" /> Checking availability…</div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-2">
            {SLOT_HOURS.map((h) => {
              const hh = String(h).padStart(2, "0");
              const isTaken = taken.includes(hh);
              const active = slot === hh;
              return (
                <button
                  key={h}
                  disabled={isTaken}
                  onClick={() => setSlot(hh)}
                  aria-pressed={active}
                  className={`slot-pop rounded-lg border px-3 py-2.5 text-left text-[13px] font-[550]
                    ${active ? "border-teal bg-teal text-slate"
                      : isTaken ? "border-white/5 text-white/25 line-through"
                      : "border-white/10 text-white/80 hover:border-teal/60 hover:bg-teal/10"}`}
                >
                  {slotLabel(h)}
                </button>
              );
            })}
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <button onClick={back} className="btn btn-sm border border-white/12 text-white/70 hover:border-white/30"><ArrowLeft size={15} className="arr" /> Back</button>
          <MagneticButton variant="light" size="lg" disabled={!date || !slot} onClick={next}>Your details <ArrowRight size={16} className="arr" /></MagneticButton>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Step 3 · details ───────────────────────── */

function StepDetails({ form, setForm, errors, submitting, submit, back, summary }: {
  form: { name: string; email: string; company: string; message: string; website: string };
  setForm: (f: typeof form) => void;
  errors: Record<string, string>;
  submitting: boolean;
  submit: () => void;
  back: () => void;
  summary: { service: string; date: string; slot: string };
}) {
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]" data-step>
      <form onSubmit={(e) => { e.preventDefault(); submit(); }} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label !text-white" htmlFor="bk-name">Name *</label>
            <input id="bk-name" className="field" value={form.name} onChange={set("name")} aria-invalid={!!errors.name} autoComplete="name" />
            {errors.name && <p className="field-err">{errors.name}</p>}
          </div>
          <div>
            <label className="field-label !text-white" htmlFor="bk-email">Email *</label>
            <input id="bk-email" type="email" className="field" value={form.email} onChange={set("email")} aria-invalid={!!errors.email} autoComplete="email" />
            {errors.email && <p className="field-err">{errors.email}</p>}
          </div>
        </div>
        <div>
          <label className="field-label !text-white" htmlFor="bk-company">Company / institution</label>
          <input id="bk-company" className="field" value={form.company} onChange={set("company")} placeholder="Optional" />
        </div>
        <div>
          <label className="field-label !text-white" htmlFor="bk-msg">What are we building?</label>
          <textarea id="bk-msg" rows={4} className="field" value={form.message} onChange={set("message")} placeholder="A few lines about the project, pages, features, deadline…" />
          {errors.message && <p className="field-err">{errors.message}</p>}
        </div>
        {/* honeypot — humans never see or fill this */}
        <input type="text" name="website" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        {errors.form && <p className="field-err" role="alert">{errors.form}</p>}
        <div className="flex justify-between pt-2">
          <button type="button" onClick={back} className="btn btn-sm border border-white/12 text-white/70 hover:border-white/30"><ArrowLeft size={15} className="arr" /> Back</button>
          <MagneticButton variant="light" size="lg" disabled={submitting} onClick={() => submit()}>
            {submitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Request booking <ArrowRight size={16} className="arr" /></>}
          </MagneticButton>
        </div>
      </form>

      {/* summary rail */}
      <aside className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
        <p className="t-mono uppercase !text-teal">Your booking</p>
        <dl className="mt-4 space-y-3 text-[.95rem]">
          <div className="flex justify-between gap-4 border-b border-white/8 pb-3"><dt className="text-white/50">Service</dt><dd className="text-right font-[550] text-white">{summary.service}</dd></div>
          <div className="flex justify-between gap-4 border-b border-white/8 pb-3"><dt className="text-white/50">Date</dt><dd className="text-right font-[550] text-white">{summary.date}</dd></div>
          <div className="flex justify-between gap-4 border-b border-white/8 pb-3"><dt className="text-white/50">Slot</dt><dd className="text-right font-[550] text-white">{summary.slot}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-white/50">Duration</dt><dd className="text-right font-[550] text-white">60 min call</dd></div>
        </dl>
        <p className="t-mono mt-6 flex items-center gap-2 uppercase !text-white/40"><Globe size={13} /> Timezone IST (UTC+5:30)</p>
        <p className="t-body mt-3 !text-white/50">You'll get an email confirmation; the slot is held the moment you submit.</p>
      </aside>
    </div>
  );
}
