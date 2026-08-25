'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export function StudioFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What media production services does Laku Media Studio provide?',
      answer:
        'Laku Media is a full-service creative media powerhouse specializing in Broadcast Media Production (TV & Satellite OB Vans), High-Concept 4K/8K Music Videos, Feature Movies & Nollywood Cinema Films, Investigative Documentaries, 24/7 Live Stadium Concert Streaming, and Private Corporate Event Staging.',
    },
    {
      question: 'How do I book Laku Media for a live broadcast or video shoot?',
      answer:
        'You can submit a booking request through our online "Book Us Now" portal, request a package rate on our Pricing page, or contact Executive Director Adebayo Samuel Olaku and our production team directly. We respond within 2 hours with a comprehensive proposal.',
    },
    {
      question: 'What equipment and camera rigs do Laku Media Studios deploy?',
      answer:
        'We operate RED V-Raptor 8K and ARRI Alexa Mini LF cinema camera rigs, multi-camera OB satellite broadcast vans, high-speed FPV aerial drones, Dolby Atmos sound suites, and 4K LED staging walls for concerts and AGMs.',
    },
    {
      question: 'What is the typical turnaround time for film post-production?',
      answer:
        'Commercial spot adverts and music videos are delivered within 3 to 5 business days. Full-length documentaries and theatrical feature films take between 2 to 4 weeks, including color grading, CGI visual effects, and Dolby Atmos audio mastering.',
    },
    {
      question: 'Does Laku Media handle theatrical cinema distribution and TV syndication?',
      answer:
        'Yes! We maintain direct distribution partnerships with West African cinema chains, satellite television channels across Africa, and international digital streaming platforms for original documentaries and feature films.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 shadow-2xl my-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#10B981]" /> FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
            EVERYTHING YOU NEED TO KNOW ABOUT LAKU MEDIA
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-extrabold text-white text-sm sm:text-base hover:text-[#10B981] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#D9541E] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#10B981]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium border-t border-slate-800/60 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
