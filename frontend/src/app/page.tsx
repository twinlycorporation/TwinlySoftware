'use client';

import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';

/* ---------- Types ---------- */
type DemoWhich = 'main' | 'small';
interface ResponseOption {
  id: number;
  tone: string;
  preview: string;
  full: string;
}

/* Helpers */
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

/* ---------- Testimonials Marquee (vertical) ---------- */
function TestimonialsMarquee() {
  const items = [
    { quote: 'Twinly drafts replies that sound exactly like me.', name: 'Avery', title: 'Founder', platform: 'Gmail' },
    { quote: 'Follow-ups are automatic and on-point.', name: 'Jordan', title: 'Sales', platform: 'LinkedIn' },
    { quote: 'Huge time saver for daily standups and updates.', name: 'Riley', title: 'PM', platform: 'Slack' },
    { quote: 'I review and send. It’s that good.', name: 'Taylor', title: 'Consultant', platform: 'Gmail' },
    { quote: 'Team voice is consistent across channels.', name: 'Kai', title: 'Marketing', platform: 'LinkedIn' },
    { quote: 'My inbox anxiety is gone.', name: 'Morgan', title: 'Support', platform: 'Gmail' },
    { quote: 'Clients reply faster with clearer messages.', name: 'Charlie', title: 'Agency', platform: 'Slack' },
    { quote: 'Best writing assistant I’ve tried this year.', name: 'Parker', title: 'Recruiting', platform: 'LinkedIn' },
    { quote: 'Set it up once, massive daily gains.', name: 'Reese', title: 'Engineer', platform: 'Slack' },
    { quote: 'Drafts are shockingly accurate.', name: 'Quinn', title: 'Ops', platform: 'Gmail' },
    { quote: 'Feels like a second brain for comms.', name: 'Sky', title: 'Research', platform: 'LinkedIn' },
    { quote: 'Our team communicates 2x faster now.', name: 'Rowan', title: 'CX', platform: 'Slack' },
  ];

  type StyleWithVar = CSSProperties & { '--duration'?: string };

  const renderCol = (arr: typeof items, dir: 'up' | 'down', duration: number) => {
    const repeated = Array.from({ length: 6 }).flatMap(() => arr);
    const style: StyleWithVar = { '--duration': `${duration}s` };

    return (
      <div className="relative h-[1200px] md:h-[1400px] overflow-hidden marquee-mask">
        <div className={dir === 'up' ? 'animate-marquee-up' : 'animate-marquee-down'} style={style}>
          <div className="flex flex-col gap-3">
            {repeated.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="p-5 rounded-2xl bg-white text-black border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <div className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-black text-white">
                  {t.platform}
                </div>
                <p className="mt-3 text-gray-900 leading-relaxed">{t.quote}</p>
                <div className="mt-4 text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{t.name}</span> · {t.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const third = Math.ceil(items.length / 3);
  const c1 = items.slice(0, third);
  const c2 = items.slice(third, third * 2);
  const c3 = items.slice(third * 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {renderCol(c1, 'up', 48)}
      {renderCol(c2, 'down', 52)}
      {renderCol(c3, 'up', 56)}
    </div>
  );
}

/* ---------- Page ---------- */
export default function Home() {
  const demoRef = useRef<HTMLDivElement | null>(null);
  const smallDemoRef = useRef<HTMLDivElement | null>(null);

  // Overlay confinement for the simulation
  const [overlayRect, setOverlayRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [activeDemo, setActiveDemo] = useState<DemoWhich | null>(null);

  // Morph/sticky hero behaviour
  const [isDemoCompact, setIsDemoCompact] = useState(false);
  const [morph, setMorph] = useState(0); // 0 big → 1 small

  // Live demo flow
  const [showSimulation, setShowSimulation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showEmailContent, setShowEmailContent] = useState(false);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<ResponseOption | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [showFullResponse, setShowFullResponse] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');

  // Heading animation (subtle shrink only when approaching small demo)
  const headingControls = useAnimation();

  /* listeners for compact demo */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsDemoCompact(y > 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* morph amount (ties big hero to small demo) */
  useEffect(() => {
    const computeMorph = () => {
      const main = demoRef.current;
      const smallSection = document.getElementById('live-demo');
      if (!main || !smallSection) return;

      const smallTop = smallSection.getBoundingClientRect().top;
      const vh = window.innerHeight || document.documentElement.clientHeight;

      const start = vh * 0.85;
      const end = vh * 0.35;
      const p = clamp((start - smallTop) / (start - end), 0, 1);
      setMorph(p);

      if (p < 0.12) {
        headingControls.start({
          y: 0,
          scale: 1,
          opacity: 1,
          transition: { duration: 0.35, ease: 'easeInOut' },
        });
      } else {
        headingControls.start({
          y: 12,
          scale: 0.96,
          opacity: 0.92,
          transition: { duration: 0.35, ease: 'easeInOut' },
        });
      }
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        computeMorph();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    computeMorph();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [headingControls]);

  /* keep overlay pinned to chosen demo card */
  useEffect(() => {
    const update = () => {
      if (!showSimulation || !activeDemo) return;
      const refEl = activeDemo === 'small' ? smallDemoRef.current : demoRef.current;
      if (refEl) {
        const r = refEl.getBoundingClientRect();
        setOverlayRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [activeDemo, showSimulation]);

  /* live demo actions */
  const startSimulation = (which: DemoWhich = 'main') => {
    setActiveDemo(which);
    setShowSimulation(true);
    setShowNotification(false);
    setShowEmailContent(false);
    setShowResponseOptions(false);
    setSelectedResponse(null);
    setMessageSent(false);
    setShowFullResponse(false);
    setIsEditing(false);

    const refEl = which === 'small' ? smallDemoRef.current : demoRef.current;
    if (refEl) {
      const r = refEl.getBoundingClientRect();
      setOverlayRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
    setTimeout(() => setShowNotification(true), 1000);
  };

  const handleNotificationClick = () => {
    setShowNotification(false);
    setShowEmailContent(true);
    setTimeout(() => setShowResponseOptions(true), 2000);
  };

  const selectResponse = (response: ResponseOption) => {
    setSelectedResponse(response);
    setEditedMessage(response.full);
    setShowResponseOptions(false);
    setShowFullResponse(true);
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveEdit = () => {
    setIsEditing(false);
    setSelectedResponse(prev => (prev ? { ...prev, full: editedMessage } : prev));
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMessage(selectedResponse?.full ?? '');
  };
  const sendMessage = () => {
    setMessageSent(true);
    setSelectedResponse(null);
    setTimeout(() => {
      setShowSimulation(false);
      setShowEmailContent(false);
      setMessageSent(false);
    }, 2000);
  };
  const closeSimulation = () => {
    setShowSimulation(false);
    setShowNotification(false);
    setShowEmailContent(false);
    setShowResponseOptions(false);
    setSelectedResponse(null);
    setMessageSent(false);
    setActiveDemo(null);
  };

  const responseOptions: ResponseOption[] = [
    {
      id: 1,
      tone: 'Professional & Apologetic',
      preview: 'Hi Sarah, Thank you for reaching out. I sincerely apologize for the delay...',
      full:
        "Hi Sarah,\n\nThank you for reaching out. I sincerely apologize for the delay in our project timeline. I understand this impacts your schedule, and I want to assure you that we're taking immediate action to resolve this.\n\nOur team has identified the root cause and implemented a solution. We're confident we can deliver the updated deliverables by Friday. I'll send you a detailed progress report tomorrow morning with specific milestones.\n\nYour patience and understanding mean everything to us during this time.\n\nBest regards,\nAlex Chen",
    },
    {
      id: 2,
      tone: 'Confident & Solution-Focused',
      preview: "Hi Sarah, I appreciate your message about the timeline. Here's what we're doing...",
      full:
        "Hi Sarah,\n\nI appreciate your message about the timeline. Here's exactly what we're doing to get back on track:\n\n• Identified and resolved the technical bottleneck\n• Added additional resources to the project\n• Implemented daily check-ins to prevent future delays\n\nWe're now ahead of schedule and will deliver by Thursday instead of Friday. I'll send you the completed work tomorrow afternoon.\n\nThank you for your trust in our team.\n\nBest,\nAlex Chen",
    },
    {
      id: 3,
      tone: 'Personal & Transparent',
      preview: 'Hi Sarah, I wanted to personally reach out about the project delay...',
      full:
        "Hi Sarah,\n\nI wanted to personally reach out about the project delay. I know how frustrating this must be, especially when you're counting on us to deliver.\n\nThe truth is, we hit an unexpected technical challenge that took longer to solve than anticipated. Rather than rush and deliver subpar work, we took the time to do it right.\n\nI'm personally overseeing the final stages and will have everything to you by Friday. I'll also include a bonus feature we developed during the extra time.\n\nThank you for your patience and continued partnership.\n\nWarm regards,\nAlex Chen",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <nav>
        <TopNav active="home" ctaLabel="Download" ctaHref="#download" />
      </nav>

      {/* HERO / DEMO (big) */}
      <div className="relative overflow-hidden">
        <div className="relative w-full px-6 py-16">
          <div id="download" className="mt-6 sm:mt-9 lg:mt-12">
            <div
              ref={demoRef}
              className={`demo-card relative ${isDemoCompact ? 'sticky top-4' : ''}
                 max-w-none w-[98%] mx-auto rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10
                 transition-all duration-700 ease-out transform-gpu ${isDemoCompact ? 'scale-[0.96]' : 'scale-100'}`}
              style={{
                transform: `translateY(${(-12 * morph).toFixed(2)}px) scale(${(1 - 0.08 * morph).toFixed(3)})`,
                opacity: 1,
              }}
            >
              <div
                className={`windows11-bg relative w-full transition-all duration-500 ease-out ${
                  isDemoCompact ? 'h-[300px] sm:h-[340px] lg:h-[380px]' : 'h-[560px] sm:h-[660px] lg:h-[720px]'
                }`}
              >
                <div
                  className={`absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out ${
                    isDemoCompact ? 'bottom-0' : 'bottom-0'
                  } pointer-events-none select-none`}
                >
                  <Image
                    src="/cursor.png"
                    alt="Editor preview"
                    width={1400}
                    height={720}
                    className="w-[94vw] max-w-6xl rounded-2xl lg:rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-black/20 border border-white/10"
                  />
                </div>
              </div>

              {/* Overlay heading on the demo image (centered wrapper) */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-[92%] md:w-[88%] text-center z-30 transition-all duration-500 ease-out ${
                  isDemoCompact ? 'top-10 sm:top-12 lg:top-14' : 'top-20 sm:top-24 lg:top-28 xl:top-32'
                }`}
              >
                {!isDemoCompact ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }}>
                    <h1
                      className="font-extrabold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)] text-[9.5vw] sm:text-[8.5vw] lg:text-[6.8vw] xl:text-[6.3vw] leading-[0.9] whitespace-nowrap transform-gpu sm:-translate-x-2 md:-translate-x-4 lg:-translate-x-6 xl:-translate-x-8"
                    >
                      The Twin That Talks for You
                    </h1>

                    <p className="mt-10 text-white/80 text-lg sm:text-2xl max-w-4xl mx-auto">
                      Twinly is your digital twin, answering in your voice, organizing every inbox,
                      and nailing follow-ups and tasks across email, chat, and DMs.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                      {/* your two download buttons here if needed */}
                    </div>
                  </motion.div>
                ) : null}
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25 z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* LIVE DEMO (small) */}
      <div id="live-demo" ref={smallDemoRef} className="relative">
        <div className="windows11-bg h-[460px] sm:h-[540px] lg:h-[600px] relative rounded-3xl overflow-hidden mx-3">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center z-30 p-6">
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-center"
            >
              <h3 className="text-white font-extrabold tracking-tight text-[clamp(32px,6vw,64px)] [text-shadow:0_8px_24px_rgba(0,0,0,.65)]">
                Try the Live Demo
              </h3>
              <p className="mt-3 text-white/90 text-[clamp(14px,2.2vw,18px)] [text-shadow:0_4px_14px_rgba(0,0,0,.5)]">
                Experience how Twinly transforms your communication workflow
              </p>
              <button
                onClick={() => startSimulation('small')}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-8 py-3 text-black font-semibold hover:bg-white/90 transition"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Demo
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* LOVE WALL */}
      <section className="py-56 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-white">Loved by world-class teams</h2>
            <p className="text-white/70 text-lg">Messages from Gmail, LinkedIn, Slack and more</p>
          </div>
        </div>
        <div className="relative overflow-hidden marquee-mask">
          <div className="marquee-fade-left" />
          <div className="marquee-fade-right" />
          <div className="px-0">
            <TestimonialsMarquee />
          </div>
        </div>
      </section>

      {/* GET STARTED */}
      <section className="relative overflow-hidden bg-black py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-18rem] h-[28rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)] blur-2xl" />
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-[clamp(28px,6.5vw,84px)] font-extrabold tracking-tight text-white">
            <span className="text-white/60">It&apos;s time to </span>
            <span className="text-white">communicate</span>
          </h2>

          <div className="mt-10 space-y-12 sm:space-y-14 lg:space-y-16 select-none">
            <div className="text-[clamp(64px,15vw,168px)] font-extrabold leading-none tracking-tight text-white">Emails.</div>
            <div className="text-[clamp(64px,15vw,168px)] font-extrabold leading-none tracking-tight text-white">Messages.</div>
            <div className="text-[clamp(64px,15vw,168px)] font-extrabold leading-none tracking-tight text-white">Everything.</div>
          </div>

          <div className="mt-12">
            <a
              href="#download"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-7 py-3.5 text-black font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started for Free
            </a>
            <div className="mt-3 text-sm text-white/60">No credit card required.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* ------ Live Demo Overlay (confined to demo card) ------ */}
      {showSimulation && overlayRect && (
        <div
          className="fixed z-50 pointer-events-none rounded-3xl overflow-hidden p-3 sm:p-4"
          style={{ top: overlayRect.top, left: overlayRect.left, width: overlayRect.width, height: overlayRect.height }}
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md transition-all duration-500 rounded-3xl"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          />

          {/* Notification */}
          {showNotification && (
            <div className="absolute top-3 right-3 pointer-events-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm animate-slide-in" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-gray-900">Gmail</p>
                      <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">just now</p>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">New email from Sarah Chen</p>
                    <p className="text-xs text-gray-500 mt-1">Project Timeline Update Needed</p>
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={handleNotificationClick}
                        className="text-xs bg-black text-white px-4 py-2 rounded-full transition-all duration-300 font-medium hover:bg-black/90"
                      >
                        View Message
                      </button>
                      <button onClick={closeSimulation} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Content */}
          {showEmailContent && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-5 sm:p-6 w-[85%] max-w-xl mx-auto max-h-[75%] overflow-hidden animate-slide-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Sarah Chen</h3>
                      <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">sarah.chen@company.com</p>
                    </div>
                  </div>
                  <button onClick={closeSimulation} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 bg-gray-50 px-3 py-2 rounded-full">Project Timeline Update Needed</h4>
                  <div className="bg-gray-50 rounded-2xl p-4 max-h-[38vh] overflow-y-auto">
                    <p className="text-gray-700 leading-relaxed">
                      Hi there,<br />
                      <br />
                      I hope this email finds you well. I'm reaching out regarding the project we discussed last week. I noticed that we
                      haven't received the deliverables that were promised for this week, and I wanted to check in on the current status.
                      <br />
                      <br />
                      Our team is planning to move forward with the next phase, but we need the completed work from your end to proceed.
                      Could you please provide an update on the timeline and let me know when we can expect to receive the deliverables?
                      <br />
                      <br />
                      I understand that unexpected challenges can arise, and I'm happy to discuss any concerns or adjustments that might be
                      needed. Please let me know how I can support you in getting this back on track.
                      <br />
                      <br />
                      Looking forward to hearing from you soon.
                      <br />
                      <br />
                      Best regards,
                      <br />
                      Sarah
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Response Options */}
          {showResponseOptions && !selectedResponse && !messageSent && (
            <div className="absolute bottom-4 right-4 pointer-events-auto">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 max-w-md animate-slide-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Twinly AI Generated</h3>
                      <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">3 personalized responses ready</p>
                    </div>
                  </div>
                  <button onClick={closeSimulation} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {responseOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => selectResponse(option)}
                      className="w-full text-left p-4 border border-gray-200 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="text-sm font-bold text-gray-900 group-hover:text-gray-950">{option.tone}</p>
                            <div className="w-2 h-2 bg-black rounded-full" />
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2 bg-white p-2 rounded-lg">{option.preview}</p>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Or write your own response</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Full Response Preview */}
          {showFullResponse && selectedResponse && !messageSent && (
            <div className="absolute bottom-4 right-4 pointer-events-auto">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-lg animate-slide-in">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">AI Response Ready!</h3>
                    <p className="text-xs text-gray-500">Review and send your message</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-gray-600 font-medium">{selectedResponse.tone}</p>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span className="text-xs text-gray-700 font-medium">AI Generated</span>
                    </div>
                  </div>
                  <div className="bg-white rounded border p-3">
                    {isEditing ? (
                      <textarea
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        className="w-full h-32 text-sm text-gray-800 leading-relaxed resize-none border-none outline-none"
                        placeholder="Edit your message..."
                      />
                    ) : (
                      <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{selectedResponse.full}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={sendMessage}
                    className="flex-1 bg-black text-white text-sm py-2 px-4 rounded-lg hover:bg-black/90 transition-colors flex items-center justify-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send Now</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedResponse(null);
                      setShowFullResponse(false);
                      setShowResponseOptions(true);
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Options
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button onClick={handleSaveEdit} className="flex-1 bg-black text-white text-xs py-2 px-3 rounded-lg hover:bg-black/90 transition-colors">
                        Save Changes
                      </button>
                      <button onClick={handleCancelEdit} className="flex-1 border border-gray-300 text-gray-700 text-xs py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEditClick}
                      className="w-full text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit this message</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Message Sent */}
          {messageSent && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-4">Your response has been delivered to Sarah Chen</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span>Email sent successfully</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span>Response delivered in your authentic voice</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span>Professional tone maintained</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Global CSS used by this page (animations, bg) */}
      <style jsx global>{`
        .windows11-bg {
          background:
            radial-gradient(1200px 600px at 50% -200px, rgba(255, 255, 255, 0.16), transparent 60%),
            radial-gradient(800px 400px at -10% 120%, rgba(255, 255, 255, 0.08), transparent 60%),
            linear-gradient(180deg, #171717 0%, #0a0a0a 100%);
        }
        @keyframes marqueeUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marqueeDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-up > .flex { will-change: transform; animation: marqueeUp var(--duration, 90s) linear infinite; }
        .animate-marquee-down > .flex { will-change: transform; animation: marqueeDown var(--duration, 90s) linear infinite; }
        .marquee-mask { mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); }
        .marquee-fade-left { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, #000 0%, transparent 6%, transparent 94%, #000 100%); }
        .marquee-fade-right { display: none; }
        @keyframes slideIn {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 300ms ease-out both; }
        @keyframes scaleIn {
          from { transform: scale(.98); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scaleIn 380ms cubic-bezier(.16,.84,.44,1) both; }
      `}</style>
    </main>
  );
}
