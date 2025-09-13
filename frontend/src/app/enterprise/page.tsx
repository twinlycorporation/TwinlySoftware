'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

type Billing = 'monthly' | 'yearly';

export default function EnterprisePage() {
  // --- ROI calculator state ---
  const [teamSize, setTeamSize] = useState<number>(25);       // employees using Twinly
  const [hourValue, setHourValue] = useState<number>(75);     // $ per hour (editable)

  // Derived metrics (3 hours saved / user / week)
  const hoursPerWeek = useMemo(() => teamSize * 3, [teamSize]);
  const moneyPerWeek = useMemo(() => hoursPerWeek * hourValue, [hoursPerWeek, hourValue]);

  const hoursPerMonth = Math.round(hoursPerWeek * 4.345); // avg weeks per month
  const hoursPerYear  = hoursPerWeek * 52;

  const moneyPerMonth = Math.round(moneyPerWeek * 4.345);
  const moneyPerYear  = Math.round(moneyPerWeek * 52);

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  const fmtNumber = (n: number) => new Intl.NumberFormat('en-US').format(n);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav (simple + consistent with pricing) */}
      <nav
        aria-label="Primary"
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[98vw] rounded-full border border-white/15 bg-black/70 backdrop-blur-md"
      >
        <div className="relative h-14">
          <a href="/" className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <Image src="/twinlyremove.png" alt="Twinly" width={28} height={28} />
            <span className="font-semibold">Twinly</span>
          </a>
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
            <a href="/pricing" className="hover:opacity-90">Pricing</a>
            <a href="/enterprise" className="hover:opacity-90">Enterprise</a>
            <a href="#help" className="hover:opacity-90">Help Center</a>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <a
              href="/signin"
              className="rounded-full border border-white/20 bg-white px-4 py-1.5 text-black hover:opacity-90"
            >
              Sign in
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 bg-white px-4 py-1.5 text-black hover:opacity-90"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-6xl px-4 pt-32 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]">
          Enterprise
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Everything in Pro, plus security, control, and onboarding for teams at scale.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="#roi"
            className="rounded-xl border border-white/20 bg-white px-5 py-2.5 text-black font-semibold hover:opacity-90"
          >
            Estimate ROI
          </a>
          <a
            href="#compare"
            className="rounded-xl border border-white/20 px-5 py-2.5 font-semibold hover:bg-white/10"
          >
            Compare features
          </a>
        </div>
      </header>

      {/* ROI Calculator */}
      <section id="roi" className="mx-auto mt-12 max-w-6xl px-4">
        <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 shadow-[0_25px_60px_-20px_rgba(0,0,0,.7)]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Controls */}
            <div>
              <h2 className="text-2xl font-semibold">ROI Calculator</h2>
              <p className="mt-1 text-white/70 text-sm">
                Drag the sliders. We assume <span className="font-semibold text-white">3 hours saved per user per week</span>.
              </p>

              {/* Team size */}
              <div className="mt-6">
                <label htmlFor="team" className="flex items-center justify-between text-sm text-white/80">
                  <span>Team size</span>
                  <span className="font-semibold text-white">{fmtNumber(teamSize)} users</span>
                </label>
                <input
                  id="team"
                  type="range"
                  min={1}
                  max={1000}
                  step={1}
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="twin-range mt-3 w-full"
                />
                <div className="mt-2 flex justify-between text-xs text-white/50">
                  <span>1</span><span>250</span><span>500</span><span>750</span><span>1000</span>
                </div>
              </div>

              {/* Hour value */}
              <div className="mt-8">
                <label htmlFor="hour" className="flex items-center justify-between text-sm text-white/80">
                  <span>Value of 1 hour (fully-loaded cost)</span>
                  <span className="font-semibold text-white">{fmtCurrency(hourValue)}</span>
                </label>
                <input
                  id="hour"
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={hourValue}
                  onChange={(e) => setHourValue(parseInt(e.target.value))}
                  className="twin-range mt-3 w-full"
                />
                <div className="mt-2 flex justify-between text-xs text-white/50">
                  <span>$10</span><span>$125</span><span>$250</span><span>$375</span><span>$500</span>
                </div>

                {/* Optional numeric input */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-white/60">Set exact value:</span>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={hourValue}
                    onChange={(e) => setHourValue(Number(e.target.value || 0))}
                    className="w-28 rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-2xl border border-white/15 bg-black/30 p-6">
              <h3 className="text-lg font-semibold">Your estimated impact</h3>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <KPI label="Hours saved / week" value={fmtNumber(hoursPerWeek)} />
                <KPI label="Hours saved / month" value={fmtNumber(hoursPerMonth)} />
                <KPI label="Hours saved / year" value={fmtNumber(hoursPerYear)} />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <KPI label="Money saved / week" value={fmtCurrency(moneyPerWeek)} />
                <KPI label="Money saved / month" value={fmtCurrency(moneyPerMonth)} />
                <KPI label="Money saved / year" value={fmtCurrency(moneyPerYear)} />
              </div>

              <p className="mt-6 text-xs text-white/60">
                Estimations are illustrative and depend on usage, team workflows, and selected models.
              </p>
              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white px-5 py-2.5 text-black font-semibold hover:opacity-90"
                >
                  Talk to sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison (same structure as pricing, Enterprise highlighted) */}
      <section id="compare" className="mt-16 px-4">
        <div className="mx-auto w-full max-w-6xl overflow-x-auto rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_25px_60px_-20px_rgba(0,0,0,.7)]">
          <table className="w-full table-fixed text-sm text-white">
            <thead className="bg-white/10">
              <tr>
                <th className="w-[40%] px-4 py-4 text-left font-semibold">Features</th>
                <th className="w-[20%] px-4 py-4 text-center font-semibold">Starter<div className="text-xs font-normal">Free</div></th>
                <th className="w-[20%] px-4 py-4 text-center font-semibold">Pro<div className="text-xs font-normal">Full access</div></th>
                <th className="w-[20%] px-4 py-4 text-center font-semibold">
                  <span className="inline-block rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2 py-0.5 text-emerald-200">Enterprise</span>
                  <div className="text-xs font-normal">Custom</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <React.Fragment key={section.name}>
                  <tr className="bg-white/10">
                    <td colSpan={4} className="px-4 py-2 font-semibold">{section.name}</td>
                  </tr>
                  {section.rows.map((row, idx) => (
                    <tr key={row.label} className={idx % 2 === 0 ? 'bg-white/[0.04]' : 'bg-transparent'}>
                      <td className="px-4 py-3 text-left">{row.label}</td>
                      <Cell value={row.starter} />
                      <Cell value={row.pro} />
                      <Cell value={row.ent} />
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="px-4 py-4 text-right text-white/70">
                  © {new Date().getFullYear()} Twinly. All rights reserved.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto mt-16 max-w-6xl px-4 pb-24">
        <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-8 text-center">
          <h3 className="text-2xl font-semibold">Ready to bring Twinly to your team?</h3>
          <p className="mt-2 text-white/70">Priority support, SSO/SAML, admin controls, and custom onboarding.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:sales@twinly.ai"
              className="rounded-xl border border-white/20 bg-white px-5 py-2.5 text-black font-semibold hover:opacity-90"
            >
              Contact sales
            </a>
            <a
              href="/pricing#enterprise"
              className="rounded-xl border border-white/20 px-5 py-2.5 font-semibold hover:bg-white/10"
            >
              See all plans
            </a>
          </div>
        </div>
      </section>

      {/* Slider styling (monochrome) */}
      <style jsx global>{`
        .twin-range {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.18);
          outline: none;
        }
        .twin-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid rgba(255,255,255,0.35);
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0,0,0,.35);
        }
        .twin-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid rgba(255,255,255,0.35);
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0,0,0,.35);
        }
      `}</style>
    </main>
  );
}

/* ---------------- small pieces ---------------- */

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-black/40 p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function Check() {
  return (
    <svg
      className="h-5 w-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Cell({ value }: { value: boolean | string }) {
  return (
    <td className="px-4 py-3">
      <div className="flex items-center justify-center">
        {typeof value === 'boolean'
          ? (value ? <Check /> : <span className="text-white/40">—</span>)
          : <span className="text-white text-center">{value}</span>}
      </div>
    </td>
  );
}

/* ---------- table data (aligned with pricing; no pink) ---------- */
const sections: {
  name: string;
  rows: { label: string; starter: boolean | string; pro: boolean | string; ent: boolean | string }[];
}[] = [
  {
    name: 'Access',
    rows: [
      { label: 'Feature access', starter: 'All features (limited)', pro: 'All features', ent: 'All features' },
      { label: 'Models', starter: 'GPT-4', pro: 'GPT-5 + latest', ent: 'GPT-5 + latest' },
    ],
  },
  {
    name: 'Core',
    rows: [
      { label: 'Custom prompts / instructions', starter: true, pro: true, ent: true },
      { label: 'Conversation dashboard & history', starter: true, pro: true, ent: true },
      // Intentionally keeping the table minimal/neutral per your earlier request
    ],
  },
  {
    name: 'Usage limits',
    rows: [{ label: 'Responses per day', starter: 'Limited', pro: 'Unlimited', ent: 'Unlimited' }],
  },
  {
    name: 'Enterprise extras',
    rows: [
      { label: 'Support', starter: 'Community', pro: 'Standard', ent: 'Priority' },
      { label: 'Advanced customization & onboarding', starter: '—', pro: '—', ent: true },
      { label: 'Volume / team discount', starter: '—', pro: '—', ent: true },
      { label: 'SSO / SAML & Admin controls', starter: '—', pro: '—', ent: true },
      { label: 'Security reviews & DPA', starter: '—', pro: '—', ent: true },
    ],
  },
];
