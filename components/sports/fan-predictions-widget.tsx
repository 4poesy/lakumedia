'use client';

import React, { useState } from 'react';
import { Trophy, Vote, CheckCircle2, Share2, Flame } from 'lucide-react';

export function FanPredictionsWidget() {
  const [selectedHomeVotes, setSelectedHomeVotes] = useState(54);
  const [selectedDrawVotes, setSelectedDrawVotes] = useState(18);
  const [selectedAwayVotes, setSelectedAwayVotes] = useState(28);
  const [userVoted, setUserVoted] = useState<string | null>(null);

  const totalVotes = selectedHomeVotes + selectedDrawVotes + selectedAwayVotes;

  const handleVote = (option: 'home' | 'draw' | 'away') => {
    if (userVoted) return;
    setUserVoted(option);
    if (option === 'home') setSelectedHomeVotes((prev) => prev + 1);
    if (option === 'draw') setSelectedDrawVotes((prev) => prev + 1);
    if (option === 'away') setSelectedAwayVotes((prev) => prev + 1);
  };

  const homePercent = Math.round((selectedHomeVotes / (totalVotes + 1)) * 100);
  const drawPercent = Math.round((selectedDrawVotes / (totalVotes + 1)) * 100);
  const awayPercent = Math.round((selectedAwayVotes / (totalVotes + 1)) * 100);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      {/* Header */}
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#2A2E7F] flex items-center gap-1.5">
          <Vote className="w-4 h-4 text-[#D9541E]" /> FAN MATCH PREDICTIONS
        </h3>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
          <Flame className="w-3 h-3 text-[#D9541E]" /> LIVE POLL
        </span>
      </div>

      {/* Fixture Match Title */}
      <div className="text-center space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#D9541E] font-bold">
          NPFL DERBY CLASH
        </span>
        <h4 className="text-sm font-extrabold text-slate-900">
          Enyimba FC <span className="text-slate-400 font-normal">vs</span> Kano Pillars
        </h4>
        <p className="text-[10px] text-slate-500 font-medium">Who will win today&apos;s match?</p>
      </div>

      {/* Voting Buttons */}
      <div className="space-y-2">
        
        {/* Home Option */}
        <button
          onClick={() => handleVote('home')}
          className={`w-full p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
            userVoted === 'home'
              ? 'border-[#D9541E] bg-orange-50/50'
              : 'border-slate-200 hover:border-[#2A2E7F] bg-white'
          }`}
        >
          {/* Progress Bar Background */}
          {userVoted && (
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#D9541E]/15 transition-all duration-700"
              style={{ width: `${homePercent}%` }}
            />
          )}
          <div className="relative flex items-center justify-between z-10 text-xs font-extrabold text-slate-900">
            <span className="flex items-center gap-1.5">
              {userVoted === 'home' && <CheckCircle2 className="w-4 h-4 text-[#D9541E]" />}
              <span>Enyimba FC Win</span>
            </span>
            <span className="font-mono">{userVoted ? `${homePercent}%` : 'Vote 1'}</span>
          </div>
        </button>

        {/* Draw Option */}
        <button
          onClick={() => handleVote('draw')}
          className={`w-full p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
            userVoted === 'draw'
              ? 'border-[#2A2E7F] bg-blue-50/50'
              : 'border-slate-200 hover:border-[#2A2E7F] bg-white'
          }`}
        >
          {/* Progress Bar Background */}
          {userVoted && (
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#2A2E7F]/15 transition-all duration-700"
              style={{ width: `${drawPercent}%` }}
            />
          )}
          <div className="relative flex items-center justify-between z-10 text-xs font-extrabold text-slate-900">
            <span className="flex items-center gap-1.5">
              {userVoted === 'draw' && <CheckCircle2 className="w-4 h-4 text-[#2A2E7F]" />}
              <span>Draw / Tie</span>
            </span>
            <span className="font-mono">{userVoted ? `${drawPercent}%` : 'Vote X'}</span>
          </div>
        </button>

        {/* Away Option */}
        <button
          onClick={() => handleVote('away')}
          className={`w-full p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
            userVoted === 'away'
              ? 'border-emerald-600 bg-emerald-50/50'
              : 'border-slate-200 hover:border-[#2A2E7F] bg-white'
          }`}
        >
          {/* Progress Bar Background */}
          {userVoted && (
            <div
              className="absolute left-0 top-0 bottom-0 bg-emerald-600/15 transition-all duration-700"
              style={{ width: `${awayPercent}%` }}
            />
          )}
          <div className="relative flex items-center justify-between z-10 text-xs font-extrabold text-slate-900">
            <span className="flex items-center gap-1.5">
              {userVoted === 'away' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              <span>Kano Pillars Win</span>
            </span>
            <span className="font-mono">{userVoted ? `${awayPercent}%` : 'Vote 2'}</span>
          </div>
        </button>

      </div>

      {/* Footer Info */}
      <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 font-bold border-t border-slate-100">
        <span>{totalVotes.toLocaleString()} Total Fan Votes</span>
        <button
          onClick={() => alert('Prediction link copied to clipboard!')}
          className="text-[#D9541E] hover:underline flex items-center gap-1"
        >
          <Share2 className="w-3 h-3" /> Share Poll
        </button>
      </div>
    </div>
  );
}
