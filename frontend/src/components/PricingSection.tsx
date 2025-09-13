'use client';

import { useEffect, useState } from 'react';

type Billing = 'monthly' | 'yearly';

const PRICING = {
  pro: { monthly: 20, yearly: 100 },
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function PricingSection() {
  const [billing, setBilling] = useState<Billing>('monthly');

  // optional: remember choice between visits
  useEffect(() => {
    const saved = localStorage.getItem('billing') as Billing | null;
    if (saved === 'yearly' || saved === 'monthly') setBilling(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem('billing', billing);
  }, [billing]);

  const proPrice = billing === 'monthly' ? PRICING.pro.monthly : PRICING.pro.yearly;
  const proSuffix = billing === 'monthly' ? '/month' : '/year';
  const savePct =
    100 - Math.round((PRICING.pro.yearly / (PRICING.pro.monthly * 12)) * 100); // 100 - (100/240)*100 = 58

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-white">
      {/* Header + toggle */}
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-tight">Start <span className="align-middle">▲</span> for free.</h1>

        <div className="flex items-center gap-3">
          <span className={`text-sm ${billing === 'monthly' ? 'opacity-100' : 'opacity-60'}`}>Monthly</span>

          {/* Accessible switch */}
          <button
            type="button"
            role="switch"
            aria-checked={billing === 'yearly'}
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            className="relative h-7 w-14 rounded-full bg-zinc-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
                billing === 'yearly' ? 'translate-x-7' : 'translate-x-0.5'
              }`}
            />
          </button>

          <span className={`text-sm ${billing === 'yearly' ? 'opacity-100' : 'opacity-60'}`}>Annually</span>

          {billing === 'yearly' && (
            <span className="ml-2 rounded-full bg-emerald-600/20 px-2 py-0.5 text-xs text-emerald-300">
              Save {savePct}%
            </span>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Starter */}
        <Card>
          <PlanHeader title="Starter" priceLabel="Free" sub="Get for Windows" />
          <ul className="mt-6 space-y-2 text-sm text-zinc-300">
            <li>✓ Limited AI responses</li>
            <li>✓ Unlimited real-time meeting notetaking</li>
            <li>✓ Customize instructions & upload files</li>
            <li>✓ Ask AI about all your past meetings</li>
          </ul>
          <CTA>Get Started</CTA>
        </Card>

        {/* Pro */}
        <Card highlight>
          <PlanHeader
            title="Pro"
            priceLabel={`${fmt(proPrice)} `}
            suffix={proSuffix}
            badge={billing === 'yearly' ? `Billed yearly (${fmt(PRICING.pro.yearly)})` : undefined}
          />
          <ul className="mt-6 space-y-2 text-sm text-zinc-300">
            <li>✓ Everything in Starter, plus…</li>
            <li>✓ Unlimited AI responses</li>
            <li>✓ Unlimited access to latest AI models</li>
            <li>✓ Priority support</li>
          </ul>
          <CTA href={billing === 'yearly' ? '/checkout?plan=pro-yearly' : '/checkout?plan=pro-monthly'}>
            {billing === 'yearly' ? 'Subscribe Yearly' : 'Subscribe Monthly'}
          </CTA>
        </Card>

        {/* Enterprise */}
        <Card>
          <PlanHeader title="Enterprise" priceLabel="Custom" />
          <ul className="mt-6 space-y-2 text-sm text-zinc-300">
            <li>✓ Post-call coaching and analytics</li>
            <li>✓ RAG knowledge base</li>
            <li>✓ User provisioning & role-based access</li>
            <li>✓ SSO & IDP integration</li>
            <li>✓ Enterprise security & no data training</li>
          </ul>
          <CTA href="/contact">Talk to sales</CTA>
        </Card>
      </div>
    </section>
  );
}

function Card({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-sm ${
        highlight
          ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_0_1px_rgba(99,102,241,.4)]'
          : 'border-zinc-800 bg-zinc-900/40'
      }`}
    >
      {children}
    </div>
  );
}

function PlanHeader({
  title,
  priceLabel,
  suffix,
  sub,
  badge,
}: {
  title: string;
  priceLabel: string;
  suffix?: string;
  sub?: string;
  badge?: string;
}) {
  return (
    <div>
      <div className="text-sm uppercase tracking-wide text-zinc-400">{title}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-4xl font-semibold">{priceLabel}</div>
        {suffix && <div className="text-zinc-400">{suffix}</div>}
      </div>
      {sub && <div className="mt-1 text-sm text-zinc-400">{sub}</div>}
      {badge && <div className="mt-2 text-xs text-emerald-300">{badge}</div>}
    </div>
  );
}

function CTA({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const common =
    'mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition';
  if (href) {
    return (
      <a className={`${common} bg-white text-black hover:opacity-90`} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${common} bg-white text-black hover:opacity-90`} type="button">
      {children}
    </button>
  );
}
