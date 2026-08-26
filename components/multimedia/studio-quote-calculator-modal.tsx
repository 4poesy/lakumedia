'use client';

import React, { useState } from 'react';
import { X, Calculator, Camera, Radio, Volume2, Calendar, CheckCircle2, MessageSquare, Sparkles, Send } from 'lucide-react';
import { NeonBorder } from '@/components/ui/neon-border';

interface StudioQuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export function StudioQuoteCalculatorModal({
  isOpen,
  onClose,
  initialService = 'RED 8K Cinema Camera Rigs',
}: StudioQuoteCalculatorModalProps) {
  const [cameraRigsCount, setCameraRigsCount] = useState(1);
  const [obVanCount, setObVanCount] = useState(0);
  const [soundstageDays, setSoundstageDays] = useState(1);
  const [dolbyAudioDays, setDolbyAudioDays] = useState(0);
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [projectNotes, setProjectNotes] = useState('');

  if (!isOpen) return null;

  // Rate calculations in USD & NGN equivalent ($1 = N1,500)
  const cameraDailyRateUsd = 1200; // $1,200 per day for RED 8K Rig
  const obVanDailyRateUsd = 3500;  // $3,500 per day for Satellite OB Van
  const soundstageDailyRateUsd = 2000; // $2,000 per day for 12,000 sq ft soundstage
  const dolbyDailyRateUsd = 1500;  // $1,500 per day for Dolby Atmos Suite

  const totalUsd =
    cameraRigsCount * cameraDailyRateUsd * soundstageDays +
    obVanCount * obVanDailyRateUsd * soundstageDays +
    soundstageDays * soundstageDailyRateUsd +
    dolbyAudioDays * dolbyDailyRateUsd;

  const totalNgn = totalUsd * 1500;

  const handleSendWhatsappQuote = () => {
    const quoteSummary = `Hello CEO Adebayo Samuel Olaku, I calculated a studio production quote on Laku Media website:
    
- Client: ${clientName || 'Valued Production Partner'} (${clientCompany || 'Independent Studio'})
- Soundstage Duration: ${soundstageDays} Days
- RED 8K Camera Rigs: ${cameraRigsCount} Unit(s)
- Satellite OB Van Uplink: ${obVanCount} Unit(s)
- Dolby Atmos Sound Suite: ${dolbyAudioDays} Day(s)
- Total Estimated Quote: $${totalUsd.toLocaleString()} USD (approx. ₦${totalNgn.toLocaleString()} NGN)
- Notes: ${projectNotes || 'No additional notes provided.'}

I would like to confirm gear availability and finalize our production contract.`;

    const encodedMsg = encodeURIComponent(quoteSummary);
    window.open(`https://wa.me/2348103285303?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto">
        
        {/* Prominent Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close quote calculator"
          className="absolute -top-3 -right-3 z-30 w-11 h-11 rounded-full bg-slate-900 border-2 border-slate-700 text-white flex items-center justify-center shadow-2xl hover:bg-[#D9541E] hover:border-orange-400 transition-all active:scale-90"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        <NeonBorder color="#10B981" rounded={28} thickness={4} borderSize={60} glow={95}>
          <div className="bg-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-6 max-h-[88vh] overflow-y-auto">
            
            {/* Header */}
            <div className="space-y-2 text-center border-b border-slate-800 pb-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-extrabold tracking-widest uppercase border border-[#10B981]/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>INSTANT STUDIO RATE CALCULATOR</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                ESTIMATE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#D9541E]">PRODUCTION BUDGET</span>
              </h2>
              <p className="text-xs text-slate-300 font-medium max-w-md mx-auto">
                Customize equipment rigs, OB satellite vans, and studio soundstage days to calculate an instant quote.
              </p>
            </div>

            {/* Gear Selection Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Soundstage Days */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Calendar className="w-4 h-4" /> Soundstage Duration
                  </span>
                  <span className="text-[#10B981] font-mono">{soundstageDays} Day(s)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={soundstageDays}
                  onChange={(e) => setSoundstageDays(parseInt(e.target.value, 10))}
                  className="w-full accent-[#10B981] cursor-pointer"
                />
              </div>

              {/* RED 8K Camera Rigs */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5 text-[#D9541E]">
                    <Camera className="w-4 h-4" /> RED 8K Camera Rigs
                  </span>
                  <span className="text-[#D9541E] font-mono">{cameraRigsCount} Unit(s)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={cameraRigsCount}
                  onChange={(e) => setCameraRigsCount(parseInt(e.target.value, 10))}
                  className="w-full accent-[#D9541E] cursor-pointer"
                />
              </div>

              {/* Satellite OB Vans */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Radio className="w-4 h-4" /> Satellite OB Vans
                  </span>
                  <span className="text-emerald-400 font-mono">{obVanCount} Unit(s)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  value={obVanCount}
                  onChange={(e) => setObVanCount(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Dolby Audio Suite */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <Volume2 className="w-4 h-4" /> Dolby Atmos Audio Suite
                  </span>
                  <span className="text-purple-400 font-mono">{dolbyAudioDays} Day(s)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  value={dolbyAudioDays}
                  onChange={(e) => setDolbyAudioDays(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Client Information Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Producer Name"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981]"
              />
              <input
                type="text"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                placeholder="Production Company / Network"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981]"
              />
            </div>

            {/* Calculated Quote Display Box */}
            <div className="bg-slate-900 p-5 rounded-2xl border-2 border-[#10B981] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#10B981] block">
                  CALCULATED ESTIMATED BUDGET QUOTE
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  ${totalUsd.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">USD</span>
                </div>
                <div className="text-xs text-amber-400 font-mono font-bold">
                  ≈ ₦{totalNgn.toLocaleString()} NGN
                </div>
              </div>

              <button
                onClick={handleSendWhatsappQuote}
                type="button"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-transform active:scale-95 border border-emerald-300 shrink-0"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Send Quote to CEO WhatsApp</span>
              </button>
            </div>

          </div>
        </NeonBorder>
      </div>
    </div>
  );
}
