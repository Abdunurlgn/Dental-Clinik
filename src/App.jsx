import { useState, useEffect, useCallback } from "react";

/* ---------- Data ---------- */

const SERVICES = [
  { title: "Teeth whitening", text: "Up to eight shades brighter in a single 60-minute visit, with enamel-safe gel.", icon: "spark", wide: true },
  { title: "Invisible aligners", text: "Custom clear aligners planned with 3D scans. Most plans finish in 6 to 12 months.", icon: "align" },
  { title: "Dental implants", text: "Permanent replacements that look, feel and work like your natural teeth.", icon: "implant" },
  { title: "Family check-ups", text: "Gentle cleanings and exams for every age, including a calm first visit for kids.", icon: "family" },
  { title: "Porcelain veneers", text: "Thin, hand-shaped shells that fix chips, gaps and stains.", icon: "veneer" },
  { title: "Emergency care", text: "Toothache or a broken tooth? We keep same-day slots open every morning.", icon: "alert", wide: true },
];

const TESTIMONIALS = [
  { name: "Hanna Bekele", role: "Invisible aligners, 9 months", quote: "I put off dentists for years because I was nervous. Here I got a clear plan, no pressure, and a smile I actually show in photos." },
  { name: "Daniel Tesfaye", role: "Dental implant", quote: "The team explained every step before touching a thing. The implant feels completely natural and healing was easier than I expected." },
  { name: "Selam Girma", role: "Family patient", quote: "Both of my kids ask to come back. That alone tells you how gentle and patient everyone is. We have all been patients for three years." },
  { name: "Yonas Alemu", role: "Teeth whitening", quote: "In and out in an hour, no sensitivity, and the result looks natural, not stark white. Booking online took two minutes." },
];

const STATS = [
  { value: "12k+", label: "smiles treated" },
  { value: "4.9", label: "average rating" },
  { value: "15 yrs", label: "in practice" },
];

/* ---------- Icons ---------- */

const PATHS = {
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z",
  align: "M4 8c0-2 2-3 4-3h8c2 0 4 1 4 3v2c0 3-3 5-8 5s-8-2-8-5V8z M8 15v3 M16 15v3",
  implant: "M9 3h6l1 5H8l1-5z M10 8v3m4-3v3 M12 11v10 M9 14h6 M9 17h6",
  family: "M8 11a3 3 0 100-6 3 3 0 000 6z M17 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M2 20c0-3 2.5-5 6-5s6 2 6 5 M15 15c3 0 6 1.5 6 4.5",
  veneer: "M6 4h12v6c0 5-2 9-6 10-4-1-6-5-6-10V4z M9 9h6",
  alert: "M12 3l10 18H2L12 3z M12 10v5 M12 18h.01",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18z M12 7v5l3 2",
  pin: "M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z M12 12a2 2 0 100-4 2 2 0 000 4z",
  check: "M5 12l5 5 9-10",
  left: "M15 5l-7 7 7 7",
  right: "M9 5l7 7-7 7",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z",
};

const Icon = ({ name, className = "h-6 w-6", fill = false }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill={fill ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={PATHS[name]} />
  </svg>
);

/* ---------- Component ---------- */

export default function SmileCraftLanding() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", date: "", time: "Morning", notes: "",
  });

  /* slider: 1 card on mobile, 2 on large screens */
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxSlide = TESTIMONIALS.length - perView;
  const current = Math.min(slide, maxSlide);

  const go = useCallback(
    (dir) => setSlide((s) => {
      const c = Math.min(s, maxSlide);
      return dir > 0 ? (c >= maxSlide ? 0 : c + 1) : (c <= 0 ? maxSlide : c - 1);
    }),
    [maxSlide]
  );

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [paused, go]);

  /* form */
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Enter your full name.";
    if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!form.service) e.service = "Choose a service.";
    if (!form.date) e.date = "Pick a preferred date.";
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", phone: "", email: "", service: "", date: "", time: "Morning", notes: "" });
  };

  const today = new Date().toISOString().split("T")[0];

  const field =
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-800 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/15";
  const border = (k) => (errors[k] ? "border-rose-400" : "border-slate-200");

  return (
    <div className="sc-root min-h-screen bg-stone-50 text-slate-700 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap');
        .sc-root { font-family: 'Manrope', system-ui, sans-serif; }
        .sc-display { font-family: 'Fraunces', Georgia, serif; letter-spacing: -0.02em; }
        @keyframes sc-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .sc-hero > * { animation: sc-rise .7s cubic-bezier(.2,.7,.2,1) both; }
        .sc-hero > *:nth-child(2) { animation-delay: .08s; }
        .sc-hero > *:nth-child(3) { animation-delay: .16s; }
        .sc-hero > *:nth-child(4) { animation-delay: .24s; }
        @media (prefers-reduced-motion: reduce) {
          .sc-hero > * { animation: none; }
          .sc-track { transition: none !important; }
        }
      `}</style>

      {/* ---------- Nav ---------- */}
      <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-stone-50/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="sc-display flex items-center gap-2 text-2xl font-semibold text-teal-900">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-700 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 11c2 5 12 5 14 0" />
              </svg>
            </span>
            SmileCraft
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a className="hover:text-teal-700" href="#services">Services</a>
            <a className="hover:text-teal-700" href="#reviews">Patient stories</a>
            <a className="hover:text-teal-700" href="#book">Contact</a>
          </nav>
          <a
            href="#book"
            className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            Book a visit
          </a>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-20">
            <div className="sc-hero">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                New patients welcome this week
              </p>
              <h1 className="sc-display text-5xl font-semibold leading-[1.05] text-slate-900 sm:text-6xl lg:text-[4.25rem]">
                Dentistry that feels as good as the result looks.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                Unhurried appointments, modern 3D imaging and a team that explains every step. Book online in two minutes and get a care plan the same day.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#book"
                  className="inline-flex items-center justify-center rounded-full bg-teal-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5 hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                >
                  Book your free consultation
                </a>
                <a
                  href="tel:+251111234567"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-800"
                >
                  <Icon name="phone" className="h-5 w-5" />
                  Call +251 11 123 4567
                </a>
              </div>
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="sc-display text-3xl font-semibold text-teal-800">{s.value}</dt>
                    <dd className="text-sm text-slate-500">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Smile-arc composition */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-gradient-to-b from-teal-700 via-teal-600 to-emerald-500">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-stone-50" style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
                <div className="absolute left-1/2 top-[26%] -translate-x-1/2 text-center text-white">
                  <p className="sc-display text-7xl font-semibold leading-none">98%</p>
                  <p className="mt-2 text-sm font-medium text-teal-50">of patients would<br />recommend us</p>
                </div>
              </div>
              <div className="absolute -left-2 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-slate-900/10 sm:-left-8">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <Icon name="clock" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">Next free slot</p>
                  <p className="text-sm text-slate-500">Tomorrow, 9:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <h2 className="sc-display text-4xl font-semibold text-slate-900 sm:text-5xl">
                Everything your smile needs, under one roof
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From routine cleanings to full smile makeovers, each plan is built around your goals and your schedule.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <article
                  key={s.title}
                  className={`group flex flex-col rounded-3xl p-7 transition hover:shadow-lg hover:shadow-teal-900/10 ${
                    s.wide ? "bg-teal-800 text-teal-50 lg:col-span-2" : "bg-stone-100 text-slate-600 hover:bg-teal-50"
                  }`}
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${
                      s.wide ? "bg-white/15 text-white" : "bg-white text-teal-700"
                    }`}
                  >
                    <Icon name={s.icon} />
                  </span>
                  <h3 className={`sc-display mt-6 text-2xl font-semibold ${s.wide ? "text-white" : "text-slate-900"}`}>
                    {s.title}
                  </h3>
                  <p className="mt-2 leading-relaxed">{s.text}</p>
                  <a
                    href="#book"
                    className={`mt-auto pt-6 text-sm font-bold underline-offset-4 hover:underline ${
                      s.wide ? "text-emerald-200" : "text-teal-700"
                    }`}
                  >
                    Book this treatment
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Testimonials ---------- */}
        <section id="reviews" className="py-20 lg:py-28" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 className="sc-display max-w-xl text-4xl font-semibold text-slate-900 sm:text-5xl">
                Patients say it best
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="grid h-12 w-12 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-teal-600 hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700"
                >
                  <Icon name="left" className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="grid h-12 w-12 place-items-center rounded-full bg-teal-700 text-white transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                >
                  <Icon name="right" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-10 overflow-hidden" aria-live="polite">
              <div
                className="sc-track flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${(current * 100) / perView}%)` }}
              >
                {TESTIMONIALS.map((t) => (
                  <div key={t.name} className="shrink-0 px-2.5" style={{ width: `${100 / perView}%` }}>
                    <figure className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-8">
                      <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Icon key={i} name="star" className="h-5 w-5" fill />
                        ))}
                      </div>
                      <blockquote className="sc-display mt-5 text-xl leading-relaxed text-slate-800">
                        “{t.quote}”
                      </blockquote>
                      <figcaption className="mt-auto flex items-center gap-3 pt-7">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-slate-900">{t.name}</span>
                          <span className="block text-sm text-slate-500">{t.role}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === current}
                  className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-teal-700" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Booking ---------- */}
        <section id="book" className="bg-teal-900 py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="text-teal-50">
              <h2 className="sc-display text-4xl font-semibold text-white sm:text-5xl">
                Book your visit
              </h2>
              <p className="mt-4 max-w-md text-lg text-teal-100">
                Tell us what you need and we will confirm your appointment within two working hours.
              </p>
              <ul className="mt-10 space-y-6">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10"><Icon name="pin" className="h-5 w-5" /></span>
                  <span><span className="block font-bold text-white">Bole Road, Addis Ababa</span><span className="text-teal-100">Free parking behind the building</span></span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10"><Icon name="clock" className="h-5 w-5" /></span>
                  <span><span className="block font-bold text-white">Mon to Sat, 8:00 AM to 7:00 PM</span><span className="text-teal-100">Emergency line open 24/7</span></span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10"><Icon name="phone" className="h-5 w-5" /></span>
                  <span><span className="block font-bold text-white">+251 11 123 4567</span><span className="text-teal-100">hello@smilecraft.example</span></span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-9">
              {submitted ? (
                <div className="py-10 text-center" role="status">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Icon name="check" className="h-8 w-8" />
                  </span>
                  <h3 className="sc-display mt-6 text-3xl font-semibold text-slate-900">Request received</h3>
                  <p className="mx-auto mt-3 max-w-sm text-slate-600">
                    Thank you, {form.name.split(" ")[0]}. We will confirm your {form.service.toLowerCase()} visit for {form.date} ({form.time.toLowerCase()}) by phone or email shortly.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-8 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-800"
                  >
                    Book another visit
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-800">Full name</label>
                    <input id="name" value={form.name} onChange={set("name")} placeholder="Your name" autoComplete="name"
                      className={`${field} ${border("name")}`} aria-invalid={!!errors.name} />
                    {errors.name && <p className="mt-1.5 text-sm text-rose-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-800">Phone</label>
                    <input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+251 9XX XXX XXX" autoComplete="tel"
                      className={`${field} ${border("phone")}`} aria-invalid={!!errors.phone} />
                    {errors.phone && <p className="mt-1.5 text-sm text-rose-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-800">Email</label>
                    <input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email"
                      className={`${field} ${border("email")}`} aria-invalid={!!errors.email} />
                    {errors.email && <p className="mt-1.5 text-sm text-rose-600">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-slate-800">Treatment</label>
                    <select id="service" value={form.service} onChange={set("service")}
                      className={`${field} ${border("service")}`} aria-invalid={!!errors.service}>
                      <option value="">Choose a service</option>
                      {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                      <option>Not sure yet</option>
                    </select>
                    {errors.service && <p className="mt-1.5 text-sm text-rose-600">{errors.service}</p>}
                  </div>

                  <div>
                    <label htmlFor="date" className="mb-1.5 block text-sm font-semibold text-slate-800">Preferred date</label>
                    <input id="date" type="date" min={today} value={form.date} onChange={set("date")}
                      className={`${field} ${border("date")}`} aria-invalid={!!errors.date} />
                    {errors.date && <p className="mt-1.5 text-sm text-rose-600">{errors.date}</p>}
                  </div>

                  <fieldset>
                    <legend className="mb-1.5 text-sm font-semibold text-slate-800">Time of day</legend>
                    <div className="grid grid-cols-3 gap-2">
                      {["Morning", "Afternoon", "Evening"].map((t) => (
                        <label key={t} className="cursor-pointer">
                          <input type="radio" name="time" value={t} checked={form.time === t} onChange={set("time")} className="peer sr-only" />
                          <span className="block rounded-xl border border-slate-200 bg-white py-3 text-center text-sm font-semibold text-slate-600 transition peer-checked:border-teal-700 peer-checked:bg-teal-700 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-teal-600/25">
                            {t}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold text-slate-800">
                      Anything we should know? <span className="font-normal text-slate-400">(optional)</span>
                    </label>
                    <textarea id="notes" rows={3} value={form.notes} onChange={set("notes")}
                      placeholder="Pain, allergies, or questions" className={`${field} border-slate-200 resize-none`} />
                  </div>

                  <div className="sm:col-span-2">
                    <button type="submit"
                      className="w-full rounded-full bg-teal-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
                      Request appointment
                    </button>
                    <p className="mt-3 text-center text-sm text-slate-500">No payment needed. Free cancellation up to 24 hours before.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-slate-500 sm:flex-row">
          <p className="sc-display text-lg font-semibold text-teal-900">SmileCraft</p>
          <p>© {new Date().getFullYear()} SmileCraft Dental Clinic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}