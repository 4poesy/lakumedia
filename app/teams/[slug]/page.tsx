import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { ScoreCard } from '@/components/sports/score-card';
import { Shield, ArrowLeft, Calendar, Trophy, HelpCircle, Layers } from 'lucide-react';
import { StructuredData } from '@/components/seo/structured-data';

export const revalidate = 60;

interface TeamPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { slug } = params;
  const formattedName = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const supabase = await createClient();
  const { data: teamsData } = await supabase.from('teams').select('*, leagues(name)');
  const team = (teamsData as any[])?.find((t: any) => t.name.toLowerCase().includes(slug.toLowerCase()));
  const teamName = team?.name || formattedName;
  const leagueName = team?.leagues?.name || 'Football League';

  const title = `${teamName} — Fixtures, Live Scores, Results & News`;
  const description = `Follow ${teamName} in the ${leagueName}. Real-time match scores, upcoming fixtures, results, head-to-head records, and news on Laku Media Concept.`;

  return {
    title,
    description,
    keywords: [
      teamName,
      `${teamName} fixtures`,
      `${teamName} live score`,
      `${teamName} results`,
      leagueName,
      'Laku Media Concept',
    ],
    alternates: {
      canonical: `/teams/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://lakumediaconcept.com/teams/${slug}`,
      siteName: 'Laku Media Concept',
      type: 'website',
      images: [
        {
          url: team?.logo_url || 'https://lakumediaconcept.com/brand/laku-media/laku-media-logo-light.jpeg',
          width: 800,
          height: 800,
          alt: `${teamName} Official Club Crest`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = params;
  const supabase = await createClient();

  const formattedName = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Query team details
  const { data: teamsData } = await supabase.from('teams').select('*, leagues(name)');
  const team = (teamsData as any[])?.find((t: any) => t.name.toLowerCase().includes(slug.toLowerCase())) || {
    id: '20000000-0000-0000-0000-000000000001',
    name: formattedName.includes('Enyimba') ? 'Enyimba FC' : formattedName,
    logo_url: '/brand/laku-media/laku-media-logo-symbol.jpeg',
    leagues: { name: 'Nigeria Premier Football League (NPFL)' },
  };

  // Query team fixtures
  const { data: fixturesData } = await supabase
    .from('fixtures')
    .select('*, home_team:teams!home_team_id(name, logo_url), away_team:teams!away_team_id(name, logo_url), league:leagues(name)')
    .order('kickoff_at', { ascending: true });

  const teamFixtures = fixturesData
    ? (fixturesData as any[]).filter(
        (f: any) =>
          f.home_team?.name?.toLowerCase().includes(slug.toLowerCase()) ||
          f.away_team?.name?.toLowerCase().includes(slug.toLowerCase())
      )
    : [
        {
          id: 'f1',
          home_team: { name: team.name, logo_url: team.logo_url },
          away_team: { name: 'Kano Pillars', logo_url: null },
          league: { name: team.leagues?.name || 'NPFL' },
          kickoff_at: new Date().toISOString(),
          home_score: 2,
          away_score: 1,
          status: 'finished' as const,
        },
      ];

  const leagueTitle = team.leagues?.name || 'Football League';

  // Schema.org Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsTeam',
        name: team.name,
        sport: 'Soccer',
        logo: team.logo_url || 'https://lakumediaconcept.com/brand/laku-media/laku-media-logo-symbol.jpeg',
        url: `https://lakumediaconcept.com/teams/${slug}`,
        memberOf: {
          '@type': 'SportsOrganization',
          name: leagueTitle,
        },
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
            name: 'Teams',
            item: 'https://lakumediaconcept.com/live-scores',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: team.name,
            item: `https://lakumediaconcept.com/teams/${slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What league does ${team.name} compete in?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${team.name} competes in the ${leagueTitle}. Match statistics and live scores are tracked on Laku Media Concept.`,
            },
          },
          {
            '@type': 'Question',
            name: `Where can I see live match updates for ${team.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `You can follow real-time scores, lineups, and match commentaries for ${team.name} at Laku Media Concept Match Center (https://lakumediaconcept.com/teams/${slug}).`,
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-8 theme-sports">
      <StructuredData data={structuredData} />

      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <Link
          href="/live-scores"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-emerald-400 gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Match Center
        </Link>

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-emerald-500/40 flex items-center justify-center font-bold text-xl text-white overflow-hidden shadow-lg">
            {team.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={team.logo_url}
                alt={team.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/brand/laku-media/laku-media-logo-symbol.jpeg';
                }}
              />
            ) : (
              <Shield className="w-8 h-8 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <Trophy className="w-3.5 h-3.5" /> {leagueTitle}
            </div>
            <h1 className="text-3xl font-extrabold text-white">{team.name}</h1>
          </div>
        </div>
      </div>

      {/* AEO Quick Fact Block */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-1 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-400 tracking-wider">
          <HelpCircle className="w-4 h-4" /> CLUB OVERVIEW
        </div>
        <p>
          <strong className="text-white">{team.name}</strong> is a professional football club competing in the{' '}
          <strong className="text-emerald-400">{leagueTitle}</strong>. Follow upcoming kickoff times, confirmed matchday scores, and seasonal fixtures below.
        </p>
      </div>

      {/* Team Fixtures */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" /> Matches & Fixtures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamFixtures.map((fix: any) => (
            <ScoreCard
              key={fix.id}
              homeTeam={fix.home_team?.name || team.name}
              awayTeam={fix.away_team?.name || 'Opponent'}
              homeScore={fix.home_score}
              awayScore={fix.away_score}
              kickoffAt={fix.kickoff_at}
              status={fix.status}
              leagueName={fix.league?.name || 'League'}
              homeLogo={fix.home_team?.logo_url}
              awayLogo={fix.away_team?.logo_url}
            />
          ))}
        </div>
      </div>

      {/* Internal Navigation Bar */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-[#D9541E] tracking-widest">
          <Layers className="w-4 h-4 text-emerald-400" /> EXPLORE MORE CLUBS & MATCHES
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold pt-1">
          <Link
            href="/live-scores"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#D9541E] text-white transition-colors border border-slate-700"
          >
            ⚡ Live Match Center
          </Link>
          <Link
            href="/leagues/npfl"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#D9541E] text-white transition-colors border border-slate-700"
          >
            🇳🇬 NPFL League Table
          </Link>
          <Link
            href="/transfers"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#D9541E] text-white transition-colors border border-slate-700"
          >
            ⚽ Transfer News
          </Link>
        </div>
      </div>
    </div>
  );
}
