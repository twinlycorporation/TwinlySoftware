'use client';

import Image from 'next/image';
<<<<<<< HEAD
import { useState, useEffect } from 'react';

type ResponseOption = {
  id: number;
  tone: string;
  preview: string;
  full: string;
};

export default function Home() {
  const [showSimulation, setShowSimulation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showEmailContent, setShowEmailContent] = useState(false);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<ResponseOption | null>(null);
=======
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Scrolling testimonials (vertical marquee)
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

  const renderCol = (arr: typeof items, dir: 'up' | 'down', duration: number) => {
    const repeated = Array.from({ length: 6 }).flatMap(() => arr);
    return (
      <div className="relative h-[1200px] md:h-[1400px] overflow-hidden marquee-mask">
        <div
          className={dir === 'up' ? 'animate-marquee-up' : 'animate-marquee-down'}
          style={{ ['--duration' as any]: `${duration}s` }}
        >
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
      {renderCol(c1, 'up', 96)}
      {renderCol(c2, 'down', 104)}
      {renderCol(c3, 'up', 112)}
    </div>
  );
}

export default function Home() {
  const demoRef = useRef<HTMLDivElement | null>(null);
  const smallDemoRef = useRef<HTMLDivElement | null>(null);
  const [overlayRect, setOverlayRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const [activeDemo, setActiveDemo] = useState<'main' | 'small' | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showEmailContent, setShowEmailContent] = useState(false);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);
>>>>>>> e15fe06 (Initial commit)
  const [messageSent, setMessageSent] = useState(false);
  const [showFullResponse, setShowFullResponse] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
<<<<<<< HEAD

  // Add scroll listener for floating nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
=======
  const [isDemoCompact, setIsDemoCompact] = useState(false);
  const [showSmallScreen, setShowSmallScreen] = useState(false);
  const [morph, setMorph] = useState(0); // 0: only big, 1: fully small

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 100);
      setIsDemoCompact(y > 200);
>>>>>>> e15fe06 (Initial commit)
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

<<<<<<< HEAD
  const startSimulation = () => {
    setShowSimulation(true);
=======
  useEffect(() => {
    const el = demoRef.current;
    if (!el) return;

    let raf = 0;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const shouldShow = rect.bottom < vh - 48;
      setShowSmallScreen(shouldShow);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };

    const io = new IntersectionObserver(() => compute(), {
      root: null,
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px 0px -10% 0px',
    });
    io.observe(el);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    compute();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      io.disconnect();
    };
  }, []);

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
      if (p > 0.05) setShowSmallScreen(true);
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
  }, []);

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

  const startSimulation = (which: 'main' | 'small' = 'main') => {
    setShowSimulation(true);
    setActiveDemo(which);
>>>>>>> e15fe06 (Initial commit)
    setShowNotification(false);
    setShowEmailContent(false);
    setShowResponseOptions(false);
    setSelectedResponse(null);
    setMessageSent(false);
<<<<<<< HEAD

    // Show Gmail notification after 1 second
    setTimeout(() => {
      setShowNotification(true);
    }, 1000);
=======
    const refEl = which === 'small' ? smallDemoRef.current : demoRef.current;
    if (refEl) {
      const r = refEl.getBoundingClientRect();
      setOverlayRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
    setTimeout(() => setShowNotification(true), 1000);
>>>>>>> e15fe06 (Initial commit)
  };

  const handleNotificationClick = () => {
    setShowNotification(false);
    setShowEmailContent(true);
<<<<<<< HEAD

    // Show response options after 2 seconds
    setTimeout(() => {
      setShowResponseOptions(true);
    }, 2000);
  };

  const selectResponse = (response: ResponseOption) => {
=======
    setTimeout(() => setShowResponseOptions(true), 2000);
  };

  const selectResponse = (response: any) => {
>>>>>>> e15fe06 (Initial commit)
    setSelectedResponse(response);
    setEditedMessage(response.full);
    setShowResponseOptions(false);
    setShowFullResponse(true);
  };

<<<<<<< HEAD
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    // Update the selected response with the edited message
    setSelectedResponse(prev =>
      prev ? { ...prev, full: editedMessage } : prev
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMessage(selectedResponse?.full ?? '');
=======
  const handleEditClick = () => setIsEditing(true);
  const handleSaveEdit = () => {
    setIsEditing(false);
    setSelectedResponse({ ...selectedResponse, full: editedMessage });
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMessage(selectedResponse.full);
>>>>>>> e15fe06 (Initial commit)
  };

  const sendMessage = () => {
    setMessageSent(true);
    setSelectedResponse(null);
<<<<<<< HEAD

    // Auto-close after showing sent confirmation
=======
>>>>>>> e15fe06 (Initial commit)
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
<<<<<<< HEAD
  };

  // ✅ FIX: this must be an array of ResponseOption
  const responseOptions: ResponseOption[] = [
    {
      id: 1,
      tone: "Professional & Apologetic",
      preview: "Hi Sarah, Thank you for reaching out. I sincerely apologize for the delay...",
      full:
        "Hi Sarah,\n\nThank you for reaching out. I sincerely apologize for the delay in our project timeline. I understand this impacts your schedule, and I want to assure you that we're taking immediate action to resolve this.\n\nOur team has identified the root cause and implemented a solution. We're confident we can deliver the updated deliverables by Friday. I'll send you a detailed progress report tomorrow morning with specific milestones.\n\nYour patience and understanding mean everything to us during this time.\n\nBest regards,\nAlex Chen"
    },
    {
      id: 2,
      tone: "Confident & Solution-Focused",
      preview: "Hi Sarah, I appreciate your message about the timeline. Here's what we're doing...",
      full:
        "Hi Sarah,\n\nI appreciate your message about the timeline. Here's exactly what we're doing to get back on track:\n\n• Identified and resolved the technical bottleneck\n• Added additional resources to the project\n• Implemented daily check-ins to prevent future delays\n\nWe're now ahead of schedule and will deliver by Thursday instead of Friday. I'll send you the completed work tomorrow afternoon.\n\nThank you for your trust in our team.\n\nBest,\nAlex Chen"
    },
    {
      id: 3,
      tone: "Personal & Transparent",
      preview: "Hi Sarah, I wanted to personally reach out about the project delay...",
      full:
        "Hi Sarah,\n\nI wanted to personally reach out about the project delay. I know how frustrating this must be, especially when you're counting on us to deliver.\n\nThe truth is, we hit an unexpected technical challenge that took longer to solve than anticipated. Rather than rush and deliver subpar work, we took the time to do it right.\n\nI'm personally overseeing the final stages and will have everything to you by Friday. I'll also include a bonus feature we developed during the extra time.\n\nThank you for your patience and continued partnership.\n\nWarm regards,\nAlex Chen"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Floating Navigation Bar */}
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Features
            </a>
            <a href="#security" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Security
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              FAQ
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Pricing
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </button>
=======
    setActiveDemo(null);
  };

  const responseOptions = [
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

  // Heading animation (re-used)
  const headingControls = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      const demo = document.getElementById('live-demo');
      if (!demo) return;
      const demoRect = demo.getBoundingClientRect();
      if (demoRect.top < window.innerHeight * 0.7) {
        headingControls.start({ y: 60, scale: 0.85, opacity: 0.5, transition: { duration: 0.8, ease: 'easeInOut' } });
      } else {
        headingControls.start({ y: 0, scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headingControls]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Floating Navigation */}
      <nav
        aria-label="Primary"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isScrolled ? 'opacity-100' : 'opacity-100'
        }`}
      >
        <div
          className={`rounded-full pl-0 pr-0 py-3 border transition-all duration-500 ease-out ${
            isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg border-white/20' : 'bg-transparent border-transparent'
          } w-[98vw] max-w-none mx-auto`}
        >
          <div className="relative h-10">
            <a
              href="/"
              className="absolute left-6 sm:left-8 md:left-10 lg:left-12 top-1/2 -translate-y-1/2 h-12 flex items-center gap-3 text-base font-semibold text-white"
            >
              <Image src="/twinlyremove.png" alt="Twinly Logo" width={40} height={40} className="w-10 h-10" />
              <span className="font-semibold text-lg leading-none">Twinly</span>
            </a>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-8 text-base">
              <a href="/pricing" className="text-white hover:opacity-80 font-semibold">
                Pricing
              </a>
              <a href="/enterprise" className="text-white hover:opacity-80 font-semibold">
                Enterprise
              </a>
            </div>

            <div className="absolute right-6 sm:right-8 md:right-10 lg:right-12 top-1/2 -translate-y-1/2 flex items-center space-x-3 pl-4 text-base">
              <a
                href="/signin"
                className="bg-white text-black hover:bg-gray-100 px-4 py-1.5 rounded-full text-base font-semibold transition-colors border border-white/30 flex items-center h-9"
              >
                Sign in
              </a>
              <a
                href="#download"
                className="bg-white text-black hover:bg-gray-100 px-4 py-1.5 rounded-full text-base font-semibold transition-colors flex items-center space-x-2 h-9"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91v-6.84l10 .15z" />
                </svg>
                <span>Download</span>
              </a>
            </div>
>>>>>>> e15fe06 (Initial commit)
          </div>
        </div>
      </nav>

<<<<<<< HEAD
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Gradient Orbs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse"></div>

          {/* Floating Particles */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-32 left-40 w-5 h-5 bg-blue-300/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
          <div className="absolute top-60 left-1/3 w-3 h-3 bg-blue-500/20 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
          <div className="absolute bottom-60 right-1/3 w-4 h-4 bg-purple-500/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3s' }}></div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: '50px 50px',
                animation: 'grid-move 20s linear infinite'
              }}
            ></div>
          </div>

          {/* Floating Geometric Shapes */}
          <div className="absolute top-32 right-1/4 w-8 h-8 border-2 border-blue-300/30 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-6 h-6 bg-purple-300/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/2 right-20 w-10 h-10 border-2 border-purple-400/25 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-20 w-4 h-4 bg-blue-400/30 transform rotate-12 animate-bounce" style={{ animationDuration: '2s' }}></div>

          {/* Gradient Waves */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-purple-100/20 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white px-8 py-4 rounded-2xl shadow-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Image src="/logo.png" alt="Twinly Logo" width={40} height={40} className="rounded-lg" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Twinly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-thin mb-6">
              <span className="text-gray-900">Your AI Communication </span>
              <span className="text-blue-600">Twin</span>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4"></div>
            </h1>

            {/* Description */}
            <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-thin">
              Boost your productivity, amplify your impact, and get more done while staying authentically you. Experience the future of communication with AI that understands your unique voice and style.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <a
                href="https://github.com/twinlycorporation/TwinlySoftware/releases/download/v0.0.2/Twinly-Setup-0.0.1.dmg"
                target="_blank"
                rel="noopener"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-block"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>Download for Mac</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl"></div>
              </a>

              <a
                href="https://github.com/twinlycorporation/TwinlySoftware/releases/download/v0.0.4/Twinly-Setup-0.0.4.exe"
                target="_blank"
                rel="noopener"
                className="group relative bg-white text-gray-700 px-10 py-4 rounded-2xl text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91v-6.84l10 .15z"/>
                  </svg>
                  <span>Download for Windows</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100/0 via-gray-100/20 to-gray-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl"></div>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Directly under Hero */}
      <div className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Feature - Records your meetings */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Learns your style</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Twinly analyzes your communication patterns to understand your unique style, tone, and preferences.
              </p>

              {/* Settings Card */}
              <div className="bg-gray-100 rounded-2xl p-6 max-w-md">
                <div className="flex items-center space-x-2 mb-6">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-900">Your Communication Profile</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Writing Style */}
                  <div className="bg-white rounded-xl p-4 relative">
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Writing Style</p>
                    <p className="text-xs text-green-600">Professional</p>
                  </div>

                  {/* Tone */}
                  <div className="bg-white rounded-xl p-4 relative">
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Tone</p>
                    <p className="text-xs text-blue-600">Friendly</p>
                  </div>

                  {/* Email Patterns */}
                  <div className="bg-white rounded-xl p-4 relative">
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Email Patterns</p>
                    <p className="text-xs text-purple-600">Analyzed</p>
                  </div>

                  {/* Response Style */}
                  <div className="bg-white rounded-xl p-4 relative">
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Response Style</p>
                    <p className="text-xs text-green-600">Personalized</p>
                  </div>
                </div>
              </div>

              {/* Right Feature - Answers in real-time */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Writes like you</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Twinly generates responses that sound authentically like you, maintaining your unique style across all communications.
                </p>

                {/* Command Card */}
                <div className="bg-gray-100 rounded-2xl p-6 max-w-md relative overflow-hidden">
                  {/* Background text snippets */}
                  <div className="absolute inset-0 opacity-10 text-xs text-gray-500 p-4">
                    <div className="absolute top-4 left-4">Hi Sarah,</div>
                    <div className="absolute top-8 right-8">Thanks for reaching out.</div>
                    <div className="absolute top-16 left-8">I appreciate your</div>
                    <div className="absolute top-20 right-4">Let me know if you need</div>
                    <div className="absolute top-28 left-4">Best regards,</div>
                    <div className="absolute top-32 right-8">Looking forward to</div>
                    <div className="absolute top-40 left-8">Please let me know</div>
                    <div className="absolute top-44 right-4">I'll get back to you</div>
                    <div className="absolute top-52 left-4">Thanks for your patience</div>
                  </div>

                  {/* Command buttons */}
                  <div className="relative z-10 flex items-center justify-center space-x-4 mt-16">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-center">
                        <div className="text-2xl mb-1">✉️</div>
                        <div className="text-sm font-medium text-gray-900">Email</div>
                      </div>
                    </div>
                    <div className="text-gray-400 text-xl">+</div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-center">
                        <div className="text-2xl mb-1">💬</div>
                        <div className="text-sm font-medium text-gray-900">Messages</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-20">
            <button
              onClick={startSimulation}
              className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 border-2 border-white/30"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="relative">
                  Try the Live Demo
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-12 h-12 border border-blue-200 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-8 h-8 border border-purple-200 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-6 h-6 border border-blue-200 rounded-full animate-ping"></div>
          <div className="absolute top-60 right-1/3 w-4 h-4 bg-purple-200 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-blue-700 text-sm font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">Got </span>
              <span className="text-blue-600">Questions?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about Twinly and how it can transform your communication workflow.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How does Twinly learn my communication style?</h3>
              <p className="text-gray-600 leading-relaxed">
                Twinly analyzes your existing emails, messages, and communication patterns to understand your unique voice, tone, and style. It learns from your writing patterns, preferred phrases, and communication preferences to generate responses that sound authentically like you.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is my data secure and private?</h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely. We use end-to-end encryption and never share your personal data. Your communication patterns are processed securely and your messages remain private. We're SOC 2 compliant and follow industry-leading security standards.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I edit the AI-generated responses?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! Twinly always gives you full control. You can edit any AI-generated response before sending it, ensuring every message reflects exactly what you want to say. The AI is there to help, not replace your judgment.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What platforms does Twinly integrate with?</h3>
              <p className="text-gray-600 leading-relaxed">
                Twinly currently integrates with Gmail, Outlook, Slack, and Microsoft Teams. We're constantly adding new integrations based on user feedback. You can also use our API to integrate with custom applications.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How much time can Twinly save me?</h3>
              <p className="text-gray-600 leading-relaxed">
                Most users report saving 2-3 hours per day on communication tasks. Twinly handles routine responses, drafts complex emails, and manages follow-ups, giving you more time to focus on high-value work and strategic thinking.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is there a free trial available?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. You can experience the full power of Twinly and see how it transforms your communication workflow.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">Our team is here to help you get the most out of Twinly.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                  Contact Support
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
                  Schedule a Demo
                </button>
              </div>
=======
      {/* Hero / Demo */}
      <div className="relative overflow-hidden">
        <div className="relative w-full px-6 py-16">
          {/* Demo panel */}
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

              {/* Overlay heading on the demo image (kept subtle) */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-[92%] md:w-[88%] text-center z-30 transition-all duration-500 ease-out ${
                  isDemoCompact ? 'top-10 sm:top-12 lg:top-14' : 'top-20 sm:top-24 lg:top-28 xl:top-32'
                }`}
              >
                {!isDemoCompact ? (
                  <motion.div initial={{ y: 0, scale: 1, opacity: 1 }} animate={headingControls}>
                    <h1 className="font-extrabold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)] text-[9.5vw] sm:text-[8.5vw] lg:text-[6.8vw] xl:text-[6.3vw] leading-[0.9] whitespace-nowrap">
                      The Twin That Talks for You
                    </h1>
                    <p className="mt-10 text-white/80 text-lg sm:text-2xl max-w-4xl mx-auto">
                      Twinly is your digital twin, answering in your voice, organizing every inbox,
                      and nailing follow-ups and tasks across email, chat, and DMs.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                      <button className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-semibold border border-black/20 hover:bg-black/90 transition">
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        Download for Mac
                      </button>
                      <button className="inline-flex items-center bg-white text-black px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-gray-100 transition">
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91v-6.84l10 .15z" />
                        </svg>
                        Download for Windows
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25 z-10" />
>>>>>>> e15fe06 (Initial commit)
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Get Started Section */}
      <div className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Bold Headline */}
            <h2 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8">
              It's time to <span className="text-blue-600">communicate</span>
            </h2>

            {/* Large Background Text */}
            <div className="relative mb-16">
              <div className="text-9xl md:text-[12rem] font-bold text-gray-300 leading-none select-none">
                <div className="mb-4">Emails.</div>
                <div className="mb-4">Messages.</div>
                <div className="text-blue-300">Everything.</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-16">
              <button className="group relative inline-flex items-center px-12 py-5 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Get Started for Free</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl"></div>
              </button>
            </div>

            {/* Step Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <span className="text-gray-700 font-medium">Connect your accounts</span>
              </div>
              <div className="hidden sm:block w-8 h-px bg-gray-300"></div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <span className="text-gray-700 font-medium">Train your AI twin</span>
              </div>
              <div className="hidden sm:block w-8 h-px bg-gray-300"></div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <span className="text-gray-700 font-medium">Start communicating</span>
=======
      {/* Small widescreen demo */}
      <div id="live-demo" className="relative pt-0 pb-16 mt-12 sm:mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div
              className="w-[99%] max-w-[1400px] mx-auto transform-gpu"
              ref={smallDemoRef}
              style={{
                opacity: morph,
                transform: `translateY(${(24 - 24 * morph).toFixed(2)}px) scale(${(0.94 + 0.06 * morph).toFixed(3)})`,
                transition: 'opacity 240ms ease-out',
              }}
            >
              <div className="bg-black/80 rounded-3xl overflow-hidden">
                <div className="windows11-bg h-[460px] sm:h-[540px] lg:h-[600px] relative">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <motion.div initial={{ y: 0, scale: 1, opacity: 1 }} animate={headingControls} className="text-center">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] mb-4">
                        Try the Live Demo
                      </h3>
                      <p className="text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-sm sm:text-base mb-6 max-w-md mx-auto">
                        Experience how Twinly transforms your communication workflow
                      </p>
                      <button
                        onClick={() => startSimulation('small')}
                        className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold text-base rounded-full border border-gray-300 hover:bg-gray-100 transition shadow"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-black/80 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span>Start Demo</span>
                        </div>
                      </button>
                    </motion.div>
                  </div>
                </div>
>>>>>>> e15fe06 (Initial commit)
              </div>
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Image src="/logo.png" alt="Twinly Logo" width={32} height={32} className="rounded-lg" />
=======
      {/* Love Wall */}
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

      {/* Get Started Section — monochrome + generous vertical spacing */}
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
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Image src="/twinlyremove.png" alt="Twinly Logo" width={40} height={40} className="rounded-lg" />
>>>>>>> e15fe06 (Initial commit)
                <span className="text-2xl font-bold">Twinly</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Your AI communication twin that helps you stay productive, authentic, and efficient in all your digital interactions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
<<<<<<< HEAD
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
=======
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
>>>>>>> e15fe06 (Initial commit)
                  </svg>
                </a>
              </div>
            </div>

<<<<<<< HEAD
            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Download</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
=======
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Download
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
>>>>>>> e15fe06 (Initial commit)
              </ul>
            </div>
          </div>

<<<<<<< HEAD
          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                <a href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
                <a href="/gdpr" className="text-gray-400 hover:text-white transition-colors text-sm">GDPR</a>
                <a href="/security" className="text-gray-400 hover:text-white transition-colors text-sm">Security</a>
=======
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </a>
                <a href="/gdpr" className="text-gray-400 hover:text-white transition-colors text-sm">
                  GDPR
                </a>
                <a href="/security" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Security
                </a>
>>>>>>> e15fe06 (Initial commit)
              </div>
              <div className="text-gray-400 text-sm">© 2024 Twinly. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>

<<<<<<< HEAD
      {/* Browser Notification Simulation */}
      {showSimulation && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Blurred Background Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md transition-all duration-500"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          ></div>

          {/* Real Browser Notification */}
          {showNotification && (
            <div className="absolute top-4 right-4 pointer-events-auto">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200 p-4 max-w-sm animate-slide-in" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
=======
      {/* Browser Notification Simulation (confined to demo card) */}
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
>>>>>>> e15fe06 (Initial commit)
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-gray-900">Gmail</p>
<<<<<<< HEAD
                      <p className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded-full">just now</p>
=======
                      <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">just now</p>
>>>>>>> e15fe06 (Initial commit)
                    </div>
                    <p className="text-sm text-gray-600 font-medium">New email from Sarah Chen</p>
                    <p className="text-xs text-gray-500 mt-1">Project Timeline Update Needed</p>
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={handleNotificationClick}
<<<<<<< HEAD
                        className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium flex items-center space-x-1 transform hover:scale-105"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>View Message</span>
=======
                        className="text-xs bg-black text-white px-4 py-2 rounded-full transition-all duration-300 font-medium hover:bg-black/90"
                      >
                        View Message
>>>>>>> e15fe06 (Initial commit)
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

<<<<<<< HEAD
          {/* Email Content Display */}
          {showEmailContent && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-200 p-6 max-w-2xl w-full mx-4 animate-slide-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
=======
          {/* Email Content */}
          {showEmailContent && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-5 sm:p-6 w-[85%] max-w-xl mx-auto max-h-[75%] overflow-hidden animate-slide-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
>>>>>>> e15fe06 (Initial commit)
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Sarah Chen</h3>
<<<<<<< HEAD
                      <p className="text-sm text-gray-500 bg-yellow-100 px-2 py-1 rounded-full">sarah.chen@company.com</p>
=======
                      <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">sarah.chen@company.com</p>
>>>>>>> e15fe06 (Initial commit)
                    </div>
                  </div>
                  <button onClick={closeSimulation} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4">
<<<<<<< HEAD
                  <h4 className="text-lg font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-2 rounded-full">Project Timeline Update Needed</h4>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4">
                    <p className="text-gray-700 leading-relaxed">
                      Hi there,<br />
                      <br />
                      I hope this email finds you well. I'm reaching out regarding the project we discussed last week.
                      I noticed that we haven't received the deliverables that were promised for this week, and I wanted to
                      check in on the current status.<br />
                      <br />
                      Our team is planning to move forward with the next phase, but we need the completed work from your
                      end to proceed. Could you please provide an update on the timeline and let me know when we can
                      expect to receive the deliverables?<br />
                      <br />
                      I understand that unexpected challenges can arise, and I'm happy to discuss any concerns or
                      adjustments that might be needed. Please let me know how I can support you in getting this back on track.<br />
                      <br />
                      Looking forward to hearing from you soon.<br />
                      <br />
                      Best regards,<br />
=======
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
>>>>>>> e15fe06 (Initial commit)
                      Sarah
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

<<<<<<< HEAD
          {/* Response Options Popup */}
          {showResponseOptions && !selectedResponse && !messageSent && (
            <div className="absolute bottom-6 right-6 pointer-events-auto">
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-200 p-6 max-w-md animate-slide-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
=======
          {/* Response Options */}
          {showResponseOptions && !selectedResponse && !messageSent && (
            <div className="absolute bottom-4 right-4 pointer-events-auto">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 max-w-md animate-slide-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
>>>>>>> e15fe06 (Initial commit)
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Twinly AI Generated</h3>
<<<<<<< HEAD
                      <p className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full">3 personalized responses ready</p>
=======
                      <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">3 personalized responses ready</p>
>>>>>>> e15fe06 (Initial commit)
                    </div>
                  </div>
                  <button onClick={closeSimulation} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
<<<<<<< HEAD
                  {responseOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => selectResponse(option)}
                      className="w-full text-left p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group transform hover:scale-105"
=======
                  {responseOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => selectResponse(option)}
                      className="w-full text-left p-4 border border-gray-200 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group"
>>>>>>> e15fe06 (Initial commit)
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
<<<<<<< HEAD
                            <p className="text-sm font-bold text-gray-900 group-hover:text-blue-900">{option.tone}</p>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
=======
                            <p className="text-sm font-bold text-gray-900 group-hover:text-gray-950">{option.tone}</p>
                            <div className="w-2 h-2 bg-black rounded-full"></div>
>>>>>>> e15fe06 (Initial commit)
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2 bg-white p-2 rounded-lg">{option.preview}</p>
                        </div>
                        <div className="ml-2 flex-shrink-0">
<<<<<<< HEAD
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
=======
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
>>>>>>> e15fe06 (Initial commit)
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
<<<<<<< HEAD
            <div className="absolute bottom-6 right-6 pointer-events-auto">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-lg animate-slide-in">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
=======
            <div className="absolute bottom-4 right-4 pointer-events-auto">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-lg animate-slide-in">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
>>>>>>> e15fe06 (Initial commit)
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
<<<<<<< HEAD
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">AI Generated</span>
=======
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-xs text-gray-700 font-medium">AI Generated</span>
>>>>>>> e15fe06 (Initial commit)
                    </div>
                  </div>
                  <div className="bg-white rounded border p-3">
                    {isEditing ? (
                      <textarea
                        value={editedMessage}
<<<<<<< HEAD
                        onChange={e => setEditedMessage(e.target.value)}
=======
                        onChange={(e) => setEditedMessage(e.target.value)}
>>>>>>> e15fe06 (Initial commit)
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
<<<<<<< HEAD
                    className="flex-1 bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
=======
                    className="flex-1 bg-black text-white text-sm py-2 px-4 rounded-lg hover:bg-black/90 transition-colors flex items-center justify-center space-x-1"
>>>>>>> e15fe06 (Initial commit)
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

<<<<<<< HEAD
                {/* Edit Button */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 bg-green-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 border border-gray-300 text-gray-700 text-xs py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
=======
                <div className="mt-3 pt-3 border-t border-gray-200">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button onClick={handleSaveEdit} className="flex-1 bg-black text-white text-xs py-2 px-3 rounded-lg hover:bg-black/90 transition-colors">
                        Save Changes
                      </button>
                      <button onClick={handleCancelEdit} className="flex-1 border border-gray-300 text-gray-700 text-xs py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
>>>>>>> e15fe06 (Initial commit)
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

<<<<<<< HEAD
          {/* Message Sent Animation */}
          {messageSent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              {/* Success Animation */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
                {/* Animated Checkmark */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
=======
          {/* Message Sent */}
          {messageSent && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto">
>>>>>>> e15fe06 (Initial commit)
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
<<<<<<< HEAD

                {/* Success Message */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-4">Your response has been delivered to Sarah Chen</p>

                {/* Success Details */}
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Email sent successfully</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Response delivered in your authentic voice</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
=======
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
>>>>>>> e15fe06 (Initial commit)
                    <span>Professional tone maintained</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
