import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Trophy, ArrowLeft, Calendar, Flag, BarChart2, HelpCircle, Layers, ChevronRight, Activity, Clock } from 'lucide-react';
import { getLiveStandingsForLeague } from '@/lib/live-standings-service';
import { getCurrentSeasonString } from '@/lib/season';
import { StructuredData } from '@/components/seo/structured-data';
import { LEAGUE_META } from '@/lib/leagues-meta';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface LeaguePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: LeaguePageProps): Promise<Metadata> {
  const { slug } = params;
  const slugKey = slug.toLowerCase();
  const meta = LEAGUE_META[slugKey] || {
    name: `${slug.toUpperCase()} Football League`,
    flag: '⚽',
    country: 'International',
  };
  const season = getCurrentSeasonString();

  const title = `${meta.name} Standings, Live Table & Fixtures (${season})`;
  const description = `Live ${meta.name} table standings, points, goal difference, team form, and match scores for the ${season} football season on Laku Media Concept.`;

  return {
    title,
    description,
    keywords: [
      meta.name,
      `${slug} standings`,
      `${slug} table ${season}`,
      `${slug} live scores`,
      `${meta.country} football league`,
      'Laku Media Concept',
    ],
    alternates: {
      canonical: `/leagues/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://lakumediaconcept.com/leagues/${slug}`,
      siteName: 'Laku Media Concept',
      type: 'website',
      images: [
        {
          url: 'https://lakumediaconcept.com/brand/laku-media/laku-media-logo-light.jpeg',
          width: 1200,
          height: 630,
          alt: `${meta.name} Standings Table`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const { slug } = params;
  const slugKey = slug.toLowerCase();
  const season = getCurrentSeasonString();

  const meta = LEAGUE_META[slugKey] || {
    name: `${slug.toUpperCase()} Football League`,
    flag: '⚽',
    country: 'International',
  };

  // Fetch real live standings
  const realStandings = await getLiveStandingsForLeague(slugKey);

  const standingsTable = realStandings.length > 0 ? realStandings.map(s => ({
    rank: s.rank,
    team: s.team,
    mp: s.played,
    w: s.won,
    d: s.drawn,
    l: s.lost,
    gf: s.goalsFor,
    ga: s.goalsAgainst,
    gd: s.goalDifference >= 0 ? `+${s.goalDifference}` : `${s.goalDifference}`,
    pts: s.points,
    form: s.form,
  })) : [];

  const leaderTeam = standingsTable[0]?.team || 'TBD';
  const totalClubs = standingsTable.length || '20+';

  // Schema.org Structured Data: SportsOrganization, BreadcrumbList, and FAQPage (AEO)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsOrganization',
        name: meta.name,
        sport: 'Soccer',
        url: `https://lakumediaconcept.com/leagues/${slug}`,
        description: `Official standings table and match data for ${meta.name} during the ${season} season.`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://lakumediaconcept.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Leagues',
            item: 'https://lakumediaconcept.com/live-scores',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: meta.name,
            item: `https://lakumediaconcept.com/leagues/${slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Who is currently leading the ${meta.name} table in ${season}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: standingsTable.length > 0
                ? `${leaderTeam} currently leads the ${meta.name} table with ${standingsTable[0]?.pts} points from ${standingsTable[0]?.mp} matches played.`
                : `Standings for ${meta.name} are updated in real-time as matchday fixtures conclude.`,
            },
          },
          {
            '@type': 'Question',
            name: `How many teams compete in the ${meta.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `There are ${totalClubs} professional football clubs competing in the ${meta.name} ${season} campaign.`,
            },
          },
          {
            '@type': 'Question',
            name: `Where can I view live scores and match fixtures for ${meta.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `You can follow real-time scores, kickoff schedules, and goal updates across all ${meta.name} fixtures at the Laku Media Concept Live Score Match Center (https://lakumediaconcept.com/live-scores).`,
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <StructuredData data={structuredData} />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <Link
            href="/live-scores"
            className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D9541E]" /> Back to Live Match Center
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded bg-[#D9541E] text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md">
                <Trophy className="w-3.5 h-3.5" /> OFFICIAL LEAGUE HUB ({season})
              </span>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-2 flex items-center gap-3">
                <span>{meta.flag}</span>
                <span>{meta.name}</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" /> Season: {season}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Live Sync Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AEO Direct Answer Summary Box */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-400 tracking-wider">
          <HelpCircle className="w-4 h-4" /> LEAGUE QUICK OVERVIEW & ESSENTIALS
        </div>
        <p>
          The <strong className="text-white">{meta.name}</strong> is currently in its{' '}
          <strong className="text-emerald-400">{season}</strong> season. Real-time match data is synchronized continuously.
          {standingsTable.length > 0 && (
            <> Current league front-runners are <strong className="text-white">{leaderTeam}</strong>, leading the points table. Check complete goal difference, win-draw-loss records, and recent form guides below.</>
          )}
        </p>
      </div>

      {/* Real Standings Table */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-emerald-400" /> Real Standings Table
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-4">Club</th>
                <th className="py-3 px-2 text-center">MP</th>
                <th className="py-3 px-2 text-center">W</th>
                <th className="py-3 px-2 text-center">D</th>
                <th className="py-3 px-2 text-center">L</th>
                <th className="py-3 px-2 text-center">GD</th>
                <th className="py-3 px-3 text-center font-black text-amber-400">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {standingsTable.length > 0 ? (
                standingsTable.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-400">{row.rank}</td>
                    <td className="py-3 px-4 font-extrabold text-white">{row.team}</td>
                    <td className="py-3 px-2 text-center font-mono text-slate-300">{row.mp}</td>
                    <td className="py-3 px-2 text-center font-mono text-emerald-400 font-bold">{row.w}</td>
                    <td className="py-3 px-2 text-center font-mono text-amber-400">{row.d}</td>
                    <td className="py-3 px-2 text-center font-mono text-rose-400">{row.l}</td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-slate-300">{row.gd}</td>
                    <td className="py-3 px-3 text-center font-mono font-black text-amber-400 text-sm">{row.pts}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-bold">
                    Fetching live standings data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal SEO Topic Cluster Interlinking */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-[#D9541E] tracking-widest">
          <Layers className="w-4 h-4 text-emerald-400" /> EXPLORE OTHER LEAGUE HUBS
        </div>
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold pt-1">
          <Link
            href="/leagues/npfl"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#D9541E] text-white transition-colors border border-slate-700 flex items-center gap-1"
          >
            🇳🇬 NPFL Hub
          </Link>
          <Link
            href="/leagues/epl"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#D9541E] text-white transition-colors border border-slate-700 flex items-center gap-1"
          >
            🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League
          </Link>
          <Link
            href="/leagues/laliga"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#D9541E] text-white transition-colors border border-slate-700 flex items-center gap-1"
          >
            🇪🇸 La Liga
          </Link>
          <Link
            href="/leagues/ucl"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#D9541E] text-white transition-colors border border-slate-700 flex items-center gap-1"
          >
            🇪🇺 Champions League
          </Link>
          <Link
            href="/leagues/saudi"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#D9541E] text-white transition-colors border border-slate-700 flex items-center gap-1"
          >
            🇸🇦 Saudi Pro League
          </Link>
          <Link
            href="/live-scores"
            className="px-3.5 py-1.5 rounded-xl bg-rose-950 text-rose-300 hover:bg-rose-900 transition-colors border border-rose-800 flex items-center gap-1"
          >
            ⚡ Full Live Match Center
          </Link>
        </div>
      </div>
    </div>
  );
}
