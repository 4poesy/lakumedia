'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { VideoReelLightboxModal } from '@/components/multimedia/video-reel-lightbox-modal';
import { CinematicCardMotion } from '@/components/multimedia/motion/cinematic-card-motion';
import { ScrollRevealSection, ScrollRevealChild } from '@/components/multimedia/motion/scroll-reveal-section';

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  imageUrl: string;
  youtubeId: string;
}

interface PortfolioClientGridProps {
  projects: Project[];
}

export function PortfolioClientGrid({ projects }: PortfolioClientGridProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <ScrollRevealSection stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <ScrollRevealChild key={proj.id}>
            <CinematicCardMotion hoverScale={1.025} hoverY={-4}>
              <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-[#10B981] shadow-2xl transition-colors duration-300 group flex flex-col justify-between h-full">
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

                  {/* In-Page Modal Lightbox Play Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setActiveProject(proj)}
                      className="w-14 h-14 rounded-full bg-[#D9541E] hover:bg-[#b84315] text-white flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 transition-transform active:scale-90"
                      aria-label={`Play ${proj.title}`}
                    >
                      <Play className="w-6 h-6 fill-white" />
                    </button>
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
                    <button
                      type="button"
                      onClick={() => setActiveProject(proj)}
                      className="hover:underline flex items-center gap-1 text-[#D9541E]"
                    >
                      <span>Watch Reel</span> →
                    </button>
                  </div>
                </div>
              </div>
            </CinematicCardMotion>
          </ScrollRevealChild>
        ))}
      </ScrollRevealSection>

      {/* Video Reel Lightbox Modal */}
      <VideoReelLightboxModal
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        youtubeId={activeProject?.youtubeId || ''}
        title={activeProject?.title || ''}
      />
    </>
  );
}
