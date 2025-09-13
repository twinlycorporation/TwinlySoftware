'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SalesPopup from '../../components/SalesPopup';

type Billing = 'monthly' | 'yearly';

export default function PricingPage() {
  const [isSalesPopupOpen, setIsSalesPopupOpen] = useState(false);
  const [billing, setBilling] = useState<Billing>('monthly');

  // Prices
  const PRO_MONTHLY = 20;
  const PRO_YEARLY = 100;
  const proPrice = billing === 'monthly' ? PRO_MONTHLY : PRO_YEARLY;
  const proSuffix = billing === 'monthly' ? '/ month' : '/ year';
  const savePct = 100 - Math.round((PRO_YEARLY / (PRO_MONTHLY * 12)) * 100);

  const subscribeHref =
    billing === 'yearly' ? '/checkout?plan=pro-yearly' : '/checkout?plan=pro-monthly';
  const subscribeLabel = billing === 'yearly' ? 'Subscribe Yearly' : 'Subscribe Monthly';

  return (
    <main className="pricing-page min-h-screen bg-black text-white">
      {/* Nav */}
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
            <a href="#enterprise" className="hover:opacity-90">Enterprise</a>
            <a href="#help" className="hover:opacity-90">Help Center</a>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <a
              href="/signin"
              className="rounded-full border border-white/20 bg-white px-4 py-1.5 text-black hover:opacity-90 on-white"
            >
              Sign in
            </a>
            <a
              href="#download"
              className="rounded-full border border-white/20 bg-white px-4 py-1.5 text-black hover:opacity-90 on-white"
            >
              Get Started for Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-6xl px-4 pt-32 text-center">
        <h1 className="mx-auto flex items-center justify-center gap-3 text-5xl font-bold tracking-tight sm:text-6xl">
          <span>Start</span>
          <span className="rounded-2xl border border-white/25 bg-white/5 p-2">
            <svg width="42" height="42" viewBox="0 0 48 48" fill="none" aria-hidden>
              <circle cx="24" cy="24" r="22" stroke="#fff" strokeOpacity=".35" />
              <path d="M24 12L33 34H15L24 12Z" fill="#fff" />
            </svg>
          </span>
          <span>for free.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl">
          Whether you're using Twinly for meetings, homework, sales calls, or just curious, it's free to use.
        </p>

        {/* Billing Toggle (bigger, smoother, no layout shift) */}
        {/* Billing Toggle (precise, clipped, smooth) */}
        <div className="mt-7 flex items-center justify-center gap-4 select-none">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`text-sm font-semibold whitespace-nowrap transition ${
              billing === 'monthly' ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            Monthly
          </button>

          {/* Track: 56x32 (w-14 h-8). Knob: 24x24 (w-6 h-6). 
              Right position = translate-x-7 (28px). Track clips the knob. */}
          <button
            type="button"
            role="switch"
            aria-checked={billing === 'yearly'}
            aria-label="Toggle billing period"
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative h-8 w-14 overflow-hidden rounded-full border border-white/25
                        transition-colors duration-300 ease-out
                        ${billing === 'yearly' ? 'bg-white/60' : 'bg-white/20'}
                        focus:outline-none focus:ring-2 focus:ring-white/60`}
          >
            <span
              className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow
                          transition-transform duration-300 ease-out will-change-transform
                          ${billing === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`}
            />
          </button>

          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`text-sm font-semibold whitespace-nowrap transition ${
              billing === 'yearly' ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            Annually
          </button>

          {billing === 'yearly' && (
            <span className="ml-2 whitespace-nowrap rounded-full border border-emerald-400/40
                            bg-emerald-500/20 px-3.5 py-1.5 text-base font-semibold text-emerald-200">
              Save {savePct}%
            </span>
          )}
        </div>

      </header>

      {/* Cards */}
      <section className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Starter */}
        <Card>
          <PlanHeader title="Starter" price={<span>Free</span>} sub="All features (limited)." />
          <Button>Get for Windows</Button>
          <Features
            items={[
              'All features (limited)',
              'Models: GPT-4',
              'Custom prompts & instructions',
              'Conversation dashboard & history',
            ]}
          />
        </Card>

        {/* Pro */}
        <Card highlight>
          <PlanHeader
            title="Pro"
            price={<span>${proPrice} <span className="text-base font-normal text-white/90">{proSuffix}</span></span>}
            badge={billing === 'yearly' ? `Save ${savePct}%` : undefined}
            sub="All features. Unlimited usage."
          />
          <a href={subscribeHref}><Button>{subscribeLabel}</Button></a>
          <Features
            items={[
              'All features (full access)',
              'Models: GPT-5 + latest',
              'Unlimited responses / day',
              'Standard support',
            ]}
          />
        </Card>

        {/* Enterprise */}
        <Card id="enterprise">
          <PlanHeader title="Enterprise" price={<span>Custom</span>} sub="For teams at scale." />
          <Button onClick={() => setIsSalesPopupOpen(true)}>Talk to sales</Button>
          <Features
            boldFirst="Everything in Pro, plus…"
            items={[
              'Priority support',
              'Advanced customization & onboarding',
              'Volume / team discount',
            ]}
          />
        </Card>
      </section>

      {/* Comparison Table — centered, simplified */}
      <section className="mt-16 px-4">
        <div className="mx-auto w-full max-w-6xl overflow-x-auto rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_25px_60px_-20px_rgba(0,0,0,.7)]">
          <table className="w-full table-fixed text-sm text-white">
            <thead className="bg-white/10">
              <tr>
                <th className="w-[40%] px-4 py-4 text-left font-semibold">Features</th>
                <th className="w-[20%] px-4 py-4 text-center font-semibold">
                  Starter
                  <div className="text-xs font-normal">Free</div>
                </th>
                <th className="w-[20%] px-4 py-4 text-center font-semibold">
                  Pro
                  <div className="text-xs font-normal">${proPrice} {proSuffix.replace('/', '/ ')}</div>
                </th>
                <th className="w-[20%] px-4 py-4 text-center font-semibold">
                  Enterprise
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

      {/* Sales Popup */}
      <SalesPopup isOpen={isSalesPopupOpen} onClose={() => setIsSalesPopupOpen(false)} />
    </main>
  );
}

/* ---------- small components ---------- */

function Card({
  children,
  highlight,
  id,
}: {
  children: React.ReactNode;
  highlight?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`rounded-3xl border p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,.6)] ${
        highlight ? 'border-white/25 bg-white/12' : 'border-white/15 bg-white/[0.08]'
      }`}
    >
      {children}
    </div>
  );
}

function PlanHeader({
  title,
  price,
  sub,
  badge,
}: {
  title: string;
  price: React.ReactNode;
  sub?: string;
  badge?: string;
}) {
  return (
    <div>
      <div className="text-sm uppercase tracking-wide text-white/90">{title}</div>
      <div className="mt-1 text-4xl font-semibold text-white">{price}</div>
      {sub && <div className="mt-1 text-sm text-white/90">{sub}</div>}
      {badge && (
        <div className="mt-2 inline-block rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-200">
          {badge}
        </div>
      )}
    </div>
  );
}

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="on-white mt-5 w-full rounded-xl border border-white/25 bg-white px-5 py-2.5 text-center font-medium text-black transition hover:opacity-90"
    >
      {children}
    </button>
  );
}

function Features({ items, boldFirst }: { items: string[]; boldFirst?: string }) {
  return (
    <ul className="mt-5 space-y-2 text-sm">
      {boldFirst && <li className="font-semibold text-white">{boldFirst}</li>}
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2 text-white">
          <Check /> {t}
        </li>
      ))}
    </ul>
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

/* ---------- table data (simplified to your rules) ---------- */

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
    ],
  },
  {
    name: 'Usage limits',
    rows: [
      { label: 'Responses per day', starter: 'Limited', pro: 'Unlimited', ent: 'Unlimited' },
    ],
  },
  {
    name: 'Enterprise extras',
    rows: [
      { label: 'Support', starter: 'Community', pro: 'Standard', ent: 'Priority' },
      { label: 'Advanced customization & onboarding', starter: '—', pro: '—', ent: true },
      { label: 'Volume / team discount', starter: '—', pro: '—', ent: true },
    ],
  },
];
