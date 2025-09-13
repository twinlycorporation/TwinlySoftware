'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function FAQPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Floating Navigation Bar + Logo */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
        }`}
        aria-label="Primary"
      >
        <div
          className={`rounded-full px-6 py-3 border transition-all duration-500 ease-out ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-md shadow-lg border-gray-200/50'
              : 'bg-transparent backdrop-blur-0 shadow-none border-transparent'
          }`}
        >
          <div className="flex items-center space-x-8">
            <a href="/#features" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">
              Features
            </a>
            <a href="/security" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">
              Security
            </a>
            <a href="/faq" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">
              FAQ
            </a>
            <a href="/#pricing" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">
              Pricing
            </a>
            <a href="/#download" className="nav-cta bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Logo top-left */}
      <div className="fixed top-5 left-6 z-50">
        <a href="/" className="flex items-center space-x-3">
          <Image src="/twinlyremove.png" alt="Twinly Logo" width={52} height={52} />
          <span className="text-2xl font-bold text-gray-900">Twinly</span>
        </a>
      </div>
      <div className="relative">
        {/* soft shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-white/50 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-blue-300/40 rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
            <span className="text-blue-700 text-sm font-semibold">Frequently Asked Questions</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-gray-900">Got </span>
            <span className="text-blue-600">Questions?</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl">
            Everything you need to know about Twinly and how it can transform your communication workflow.
          </p>

          {/* FAQ Items */}
          <div className="mt-10 space-y-6">
            {/* 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How does Twinly learn my communication style?</h3>
              <p className="text-gray-600 leading-relaxed">
                Twinly analyzes your existing emails, messages, and communication patterns to understand your unique voice, tone, and style. It learns from your writing patterns, preferred phrases, and communication preferences to generate responses that sound authentically like you.
              </p>
            </div>
            {/* 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is my data secure and private?</h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely. We use end-to-end encryption and never share your personal data. Your communication patterns are processed securely and your messages remain private. We're SOC 2 compliant and follow industry‑leading security standards.
              </p>
            </div>
            {/* 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Can I edit the AI‑generated responses?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! Twinly always gives you full control. You can edit any AI‑generated response before sending it, ensuring every message reflects exactly what you want to say. The AI is there to help, not replace your judgment.
              </p>
            </div>
            {/* 4 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">What platforms does Twinly integrate with?</h3>
              <p className="text-gray-600 leading-relaxed">
                Twinly currently integrates with Gmail, Outlook, Slack, and Microsoft Teams. We're constantly adding new integrations based on user feedback. You can also use our API to integrate with custom applications.
              </p>
            </div>
            {/* 5 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How much time can Twinly save me?</h3>
              <p className="text-gray-600 leading-relaxed">
                Most users report saving 2–3 hours per day on communication tasks. Twinly handles routine responses, drafts complex emails, and manages follow‑ups, giving you more time to focus on high‑value work and strategic thinking.
              </p>
            </div>
            {/* 6 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is there a free trial available?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! We offer a 14‑day free trial with full access to all features. No credit card required to start. You can experience the full power of Twinly and see how it transforms your communication workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
