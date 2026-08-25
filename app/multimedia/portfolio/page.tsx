import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { BookUsNowSection } from '@/components/multimedia/book-us-now';
import { StudioFaqSection } from '@/components/multimedia/studio-faq';
import { StudioSubscriberSection } from '@/components/multimedia/newsletter-popup-modal';

export const dynamic = 'force-dynamic';

export default function MultimediaPortfolioPage() {
  const portfolioProjects = [
    {
      id: 'port-1',
      title: 'Lagos Stadium International Music Concert',
      category: 'LIVE CONCERT BROADCAST',
      client: 'African Music Awards Network',
      description: 'Full multi-camera satellite OB van live stream to 1.5 million viewers across YouTube and African television networks.',
      imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop',
      youtubeId: '3Q06g9O0J-Y',
    },
    {
      id: 'port-2',
      title: 'Giants of Africa: Feature Cinema Documentary',
      category: 'DOCUMENTARY FILM',
      client: 'Laku Media Originals',
      description: 'Feature length 4K theatrical documentary exploring grassroots football talent discovery in West Africa.',
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop',
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 'port-3',
      title: 'Global Afrobeats Music Video Shoot',
      category: 'MUSIC VIDEO DIRECTION',
      client: 'Starboy Entertainment',
      description: 'Hollywood-grade RED Cinema 8K music video production shot on location in Aba and Lagos.',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop',
      youtubeId: 'L_LUpnjgPso',
    },
    {
      id: 'port-4',
      title: 'Annual Banking Executives Summit AGM',
      category: 'CORPORATE EVENT STAGING',
      client: 'First Bank of Nigeria',
      description: 'Stage lighting choreography, 4K multi-cam live LED wall feed, and executive keynote video production.',
      imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&auto=format&fit=crop',
      youtubeId: 'kXYiU_JCYtU',
    },
    {
      id: 'port-5',
      title: 'National Television Broadcast Commercial Advert',
      category: 'BROADCAST ADVERTISING',
      client: 'MTN Telecommunications',
      description: 'High-impact 30-second broadcast TV advert with 3D CGI animation and Dolby sound mixing.',
      imageUrl: 'https://images.unsplash.com/photo-1543351611-c823945f1007?w=1200&auto=format&fit=crop',
      youtubeId: '3Q06g9O0J-Y',
    },
    {
      id: 'port-6',
      title: 'Aerial Drone Cinematography Spotlight',
      category: 'DRONE & VISUAL EFFECTS',
      client: 'Laku Media Creative Studio',
      description: 'FPV high-speed drone aerial filming across Nigerian landmarks and coastal infrastructure.',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop',
      youtubeId: 'dQw4w9WgXcQ',
    },
  ];

  return (
    <div className="bg-[#090A0F] text-white min-h-screen space-y-16">
      
      {/* Studio Portfolio Hero Header (Using assest/studio_background.jpg) */}
      <section className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-center justify-center border-2 border-slate-800 shadow-2xl">
        <Image
          src="/assest/studio_background.jpg"
          alt="Laku Media Production Portfolio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/80 to-[#090A0F]/50" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12 space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight uppercase drop-shadow-2xl">
            OUR RECENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D9541E]">PRODUCTION JOBS</span> & REELS
          </h1>

          <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Explore completed music videos, live stadium broadcasts, corporate event keynotes, and cinema films produced by Laku Media.
          </p>
        </div>
      </section>

      {/* Portfolio Projects Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-[#10B981] shadow-2xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <Image
                src={proj.imageUrl}
                alt={proj.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md bg-[#2A2E7F] text-[#10B981] font-extrabold text-[10px] uppercase tracking-widest border border-slate-700 shadow-md">
                  {proj.category}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={`https://www.youtube.com/watch?v=${proj.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 rounded-full bg-[#D9541E] hover:bg-[#b84315] text-white flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 transition-transform"
                >
                  <Play className="w-6 h-6 fill-white" />
                </a>
              </div>
            </div>

            <div className="p-6 space-y-3 bg-slate-950 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">
                  CLIENT: {proj.client}
                </span>
                <h3 className="text-xl font-extrabold text-white group-hover:text-[#10B981] transition-colors leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {proj.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-extrabold text-[#D9541E]">
                <span className="text-slate-400 font-mono">Status: Delivered</span>
                <a
                  href={`https://www.youtube.com/watch?v=${proj.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Watch Reel</span> →
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto">
        <StudioFaqSection />
      </div>

      {/* Subscriber Section */}
      <div className="max-w-7xl mx-auto">
        <StudioSubscriberSection />
      </div>

      {/* Book Us Section */}
      <div className="max-w-7xl mx-auto">
        <BookUsNowSection />
      </div>

    </div>
  );
}
