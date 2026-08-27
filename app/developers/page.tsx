'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Code, Terminal, Key, ShieldCheck, Zap, Copy, Check, ExternalLink, Activity, Database, BookOpen, Layers, Server } from 'lucide-react';

export default function DeveloperPortalPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'auth' | 'rate-limits'>('overview');
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'javascript' | 'python'>('javascript');
  const [userApiKey, setUserApiKey] = useState('laku_dev_demo_key_2026');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const generateNewKey = () => {
    const randomHex = Math.random().toString(36).substring(2, 10);
    setUserApiKey(`laku_live_key_${randomHex}_2026`);
  };

  const endpoints = [
    {
      id: 'fixtures-all',
      method: 'GET',
      path: '/api/v1/fixtures',
      desc: 'List all global sports fixtures with optional league and status filters.',
      exampleParams: '?league=epl&status=live',
    },
    {
      id: 'fixtures-live',
      method: 'GET',
      path: '/api/v1/fixtures/live',
      desc: 'Retrieve real-time in-play live fixtures across all covered global leagues.',
      exampleParams: '',
    },
    {
      id: 'leagues-slug',
      method: 'GET',
      path: '/api/v1/leagues/npfl',
      desc: 'Fetch full league metadata, fixtures, and standings table by league slug.',
      exampleParams: '',
    },
    {
      id: 'teams-slug',
      method: 'GET',
      path: '/api/v1/teams/enyimba-fc',
      desc: 'Retrieve team details, squad profile, and recent match history.',
      exampleParams: '',
    },
    {
      id: 'articles-all',
      method: 'GET',
      path: '/api/v1/articles',
      desc: 'Get latest published breaking sports articles and RSS wire streams.',
      exampleParams: '?limit=10',
    },
  ];

  const codeSnippets = {
    javascript: (path: string) => `// JavaScript (Fetch API)
const response = await fetch('https://lakumedia.vercel.app${path}', {
  headers: {
    'x-api-key': '${userApiKey}',
    'Accept': 'application/json'
  }
});
const data = await response.json();
console.log(data);`,
    curl: (path: string) => `# cURL Command
curl -X GET "https://lakumedia.vercel.app${path}" \\
  -H "x-api-key: ${userApiKey}" \\
  -H "Accept: application/json"`,
    python: (path: string) => `# Python (Requests)
import requests

url = "https://lakumedia.vercel.app${path}"
headers = {
    "x-api-key": "${userApiKey}",
    "Accept": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())`,
  };

  return (
    <div className="min-h-screen bg-[#0E1015] text-slate-100 font-sans p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-[#141824] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-[#D9541E]/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9541E]/20 text-[#D9541E] border border-[#D9541E]/30 text-xs font-black uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 text-[#D9541E]" /> LAKU MEDIA PUBLIC REST API V1
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              DEVELOPER PORTAL & API HUB
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl font-medium">
              Integrate 100% real-time sports fixtures, live match scores, standings, and breaking African & Global sports news into your apps, widgets, and analytical models.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>YOUR API KEY</span>
              <button onClick={generateNewKey} className="text-[#D9541E] hover:underline cursor-pointer">Generate New</button>
            </div>
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
              <Key className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate max-w-[180px]">{userApiKey}</span>
              <button
                onClick={() => copyToClipboard(userApiKey, 'user-key')}
                className="ml-auto p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
              >
                {copiedEndpoint === 'user-key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-t border-slate-800 pt-4 overflow-x-auto text-xs font-black">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#D9541E] text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'endpoints' ? 'bg-[#D9541E] text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            REST API ENDPOINTS ({endpoints.length})
          </button>
          <button
            onClick={() => setActiveTab('auth')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'auth' ? 'bg-[#D9541E] text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            AUTHENTICATION & HEADERS
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#141824] border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base">Real-Time In-Play Stream</h3>
            <p className="text-xs text-slate-400">
              Low-latency JSON feeds for live match minutes, current scores, goalscorers, cards, and match status.
            </p>
          </div>

          <div className="bg-[#141824] border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base">Additive 2026/2027 Schema</h3>
            <p className="text-xs text-slate-400">
              Full alignment with external_ref_id mapping. NPFL human admin entry and world football automated APIs run in parallel.
            </p>
          </div>

          <div className="bg-[#141824] border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base">99.9% Uptime Guarantee</h3>
            <p className="text-xs text-slate-400">
              Serverless edge architecture with automatic fallback cache and zero-downtime rate limit guards.
            </p>
          </div>
        </div>
      )}

      {/* Endpoints Listing */}
      {(activeTab === 'endpoints' || activeTab === 'overview') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase text-white tracking-tight flex items-center gap-2">
              <Code className="w-5 h-5 text-[#D9541E]" /> API ENDPOINTS DOCUMENTATION
            </h2>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setSelectedLanguage('javascript')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${selectedLanguage === 'javascript' ? 'bg-[#D9541E] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                JavaScript
              </button>
              <button
                onClick={() => setSelectedLanguage('curl')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${selectedLanguage === 'curl' ? 'bg-[#D9541E] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                cURL
              </button>
              <button
                onClick={() => setSelectedLanguage('python')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${selectedLanguage === 'python' ? 'bg-[#D9541E] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Python
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {endpoints.map((ep) => (
              <div key={ep.id} className="bg-[#141824] border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black font-mono">
                      {ep.method}
                    </span>
                    <span className="font-mono text-sm text-white font-extrabold">{ep.path}</span>
                  </div>

                  <Link
                    href={`${ep.path}${ep.exampleParams}`}
                    target="_blank"
                    className="text-xs font-bold text-[#D9541E] hover:underline flex items-center gap-1 w-fit"
                  >
                    <span>Test Endpoint</span> <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-xs text-slate-300 font-medium">{ep.desc}</p>

                {/* Code Snippet Box */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 relative">
                  <pre className="overflow-x-auto">{codeSnippets[selectedLanguage](ep.path)}</pre>
                  <button
                    onClick={() => copyToClipboard(codeSnippets[selectedLanguage](ep.path), ep.id)}
                    className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    {copiedEndpoint === ep.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs font-mono text-slate-400 pt-8 border-t border-slate-800">
        LAKU MEDIA PUBLIC REST API — NIGERIA & GLOBAL SPORTS MEDIA PLATFORM © 2026
      </div>

    </div>
  );
}
