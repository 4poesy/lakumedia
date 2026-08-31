'use client';

import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { DiasporaPlayer } from '@/lib/diaspora-service';
import { Shield, Globe, ChevronRight, CheckCircle2, User, Sparkles } from 'lucide-react';

type Sizing = {
  restWidth: number;
  restHeight: number;
  activeWidth: number;
  activeHeight: number;
};

// SOLID Card Background Fallbacks (No Gradients)
const SOLID_FALLBACKS = [
  '#0f172a', // slate-900
  '#1e293b', // slate-800
  '#172554', // blue-950
  '#064e3b', // emerald-950
  '#451a03', // amber-950
  '#1e1b4b', // indigo-950
];

const RENDER_RANGE = 5;

function relOf(index: number, pos: number, count: number): number {
  let rel = (((index - pos) % count) + count) % count;
  if (rel > count / 2) rel -= count;
  return rel;
}

function xForRel(rel: number, s: Sizing, gap: number): number {
  const ar = Math.abs(rel);
  const c1 = s.activeWidth / 2 + gap + s.restWidth / 2;
  const pitch = s.restWidth + gap;
  const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch;
  return (rel < 0 ? -1 : 1) * mag;
}

function blendForRel(rel: number): number {
  return Math.min(Math.abs(rel), 1);
}

function Card({
  player,
  index,
  pos,
  count,
  R,
  sizing,
  gap,
  radius,
  solidBg,
  seasonString,
  onSelect,
  onOpenDossier,
}: {
  player: DiasporaPlayer;
  index: number;
  pos: MotionValue<number>;
  count: number;
  R: number;
  sizing: Sizing;
  gap: number;
  radius: number;
  solidBg: string;
  seasonString: string;
  onSelect: (index: number) => void;
  onOpenDossier: (player: DiasporaPlayer) => void;
}) {
  const [imgError, setImgError] = useState(false);

  const x = useTransform(pos, (p: number) =>
    xForRel(relOf(index, p, count), sizing, gap)
  );
  const opacity = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    return ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R);
  });
  const zIndex = useTransform(pos, (p: number) =>
    Math.round(1000 - Math.abs(relOf(index, p, count)) * 100)
  );
  const width = useTransform(pos, (p: number) => {
    const a = blendForRel(relOf(index, p, count));
    return sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a;
  });
  const height = useTransform(pos, (p: number) => {
    const a = blendForRel(relOf(index, p, count));
    return sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a;
  });
  const borderRadius = useTransform(pos, (p: number) => {
    const a = blendForRel(relOf(index, p, count));
    const w = sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a;
    const h = sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a;
    return (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(w, h) / 16);
  });
  const boxShadow = useTransform(pos, (p: number) =>
    Math.abs(relOf(index, p, count)) < 0.4
      ? '0 20px 50px rgba(0,0,0,0.6), 0 0 0 2px #10B981'
      : '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px #334155'
  );

  // Active details fade in ONLY on center card
  const activeDetailsOpacity = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    return ar < 0.3 ? 1 : ar > 0.6 ? 0 : 1 - (ar - 0.3) / 0.3;
  });

  // Slat minimal label on side cards
  const slatLabelOpacity = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    return ar >= 0.4 ? 1 : 0;
  });

  return (
    <motion.div
      onClick={() => onSelect(index)}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x,
        zIndex,
        opacity,
        cursor: 'pointer',
      }}
    >
      <motion.div
        style={{
          x: '-50%',
          y: '-50%',
          width,
          height,
          borderRadius,
          overflow: 'hidden',
          backgroundColor: solidBg,
          boxShadow,
          position: 'relative',
        }}
        className="group select-none border border-slate-700"
      >
        {/* Background Headshot / Silhouette (Clean Solid Container) */}
        {player.photo_url && !imgError ? (
          <img
            src={player.photo_url}
            alt={player.name}
            onError={() => setImgError(true)}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-900">
            <User className="w-12 h-12 text-slate-500 mb-2" />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Verified Star</span>
          </div>
        )}

        {/* Top Badges (Solid Pills) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-slate-950 text-emerald-400 border border-emerald-500/50">
            🇳🇬 Super Eagles
          </span>
          <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#D9541E] text-white">
            {player.region.toUpperCase().replace('_', ' ')}
          </span>
        </div>

        {/* 1. ACTIVE CENTER CARD: Solid Dark Footer Block */}
        <motion.div
          style={{ opacity: activeDetailsOpacity }}
          className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800 text-white z-10 space-y-1.5 pointer-events-auto"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{player.position}</span>
          </div>

          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white truncate">
            {player.name}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-300 font-bold truncate">
            <span className="flex items-center gap-1 truncate text-slate-200">
              <Shield className="w-3.5 h-3.5 text-[#D9541E] shrink-0" />
              {player.current_club}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-400 shrink-0">
              <Globe className="w-3 h-3 text-slate-400" />
              {player.club_country}
            </span>
          </div>

          <div className="pt-1.5 flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{seasonString}</span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDossier(player);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-emerald-400 text-slate-950 text-xs font-black shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>View Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* 2. SIDE SLAT: Minimal Solid Label */}
        <motion.div
          style={{ opacity: slatLabelOpacity }}
          className="absolute bottom-0 inset-x-0 p-2 bg-slate-950/95 border-t border-slate-800 text-white z-10 pointer-events-none text-center"
        >
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-white truncate">
            {player.name}
          </p>
          <p className="text-[8px] sm:text-[9px] text-slate-400 font-bold truncate">
            {player.current_club}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ArrowButton({
  side,
  onClick,
  color,
  background,
  size,
  position,
}: {
  side: 'left' | 'right';
  onClick: () => void;
  color: string;
  background: string;
  size: number;
  position: number;
}) {
  const isLeft = side === 'left';
  const p = Math.max(0, Math.min(100, position));
  const inset = `calc((50% - ${size}px) * ${(100 - p) / 100})`;
  return (
    <button
      type="button"
      aria-label={isLeft ? 'Previous Player' : 'Next Player'}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: 'absolute',
        top: '50%',
        [isLeft ? 'left' : 'right']: inset,
        transform: 'translateY(-50%)',
        width: size,
        height: size,
        borderRadius: '8px', // Solid square/rounded button
        border: '1px solid #475569',
        backgroundColor: background,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        zIndex: 2000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        WebkitTapHighlightColor: 'transparent',
      }}
      className="hover:bg-[#D9541E] transition-colors"
    >
      <svg
        width={size * 0.45}
        height={size * 0.45}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pointerEvents: 'none' }}
      >
        {isLeft ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

interface DiasporaCoverflowCarouselProps {
  players: DiasporaPlayer[];
  seasonString: string;
  onOpenDossier: (player: DiasporaPlayer) => void;
  showArrows?: boolean;
  autoplay?: boolean;
  autoplayDirection?: 'leftToRight' | 'rightToLeft';
  activeWidth?: number;
  activeHeight?: number;
  restWidth?: number;
  restHeight?: number;
  gap?: number;
  radius?: number;
}

export function DiasporaCoverflowCarousel({
  players,
  seasonString,
  onOpenDossier,
  showArrows = true,
  autoplay = true,
  autoplayDirection = 'rightToLeft',
}: DiasporaCoverflowCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);

  // Responsive mobile measurement
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setContainerWidth(w);
        setIsMobile(w < 640);
      } else {
        const isMob = typeof window !== 'undefined' && window.innerWidth < 640;
        setIsMobile(isMob);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const count = Math.max(1, players.length);

  // Dynamic Mobile vs Desktop Sizing
  const sizing: Sizing = useMemo(() => {
    if (isMobile) {
      const activeW = Math.min(containerWidth - 32, 300);
      return {
        activeWidth: activeW,
        activeHeight: 330,
        restWidth: 55,
        restHeight: 250,
      };
    }
    return {
      activeWidth: Math.min(containerWidth - 100, 480),
      activeHeight: 360,
      restWidth: 160,
      restHeight: 270,
    };
  }, [isMobile, containerWidth]);

  const gap = isMobile ? 12 : 22;
  const radius = 12;

  const R = Math.max(1, Math.min(RENDER_RANGE, Math.floor(count / 2) - 1));

  const pos = useMotionValue(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number | null>(null);
  const autoplayingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dirRef = useRef(autoplayDirection === 'leftToRight' ? -1 : 1);
  const dwellAccRef = useRef(0);
  const reducedRef = useRef(prefersReducedMotion);
  reducedRef.current = prefersReducedMotion;

  const tick = useCallback(
    (t: number) => {
      const last = lastTRef.current ?? t;
      const dt = Math.min((t - last) / 1000, 1 / 30);
      lastTRef.current = t;

      const cur = pos.get();
      const diff = targetRef.current - cur;
      const dur = 0.4;
      const step = (1 / dur) * dt;
      const arriving = reducedRef.current || Math.abs(diff) <= step;

      if (arriving) {
        pos.set(targetRef.current);
        if (autoplayingRef.current && !isHoveredRef.current) {
          dwellAccRef.current += dt;
          if (dwellAccRef.current >= 2.4) {
            dwellAccRef.current = 0;
            targetRef.current += dirRef.current;
          }
          rafRef.current = requestAnimationFrame(tick);
          return;
        } else if (autoplayingRef.current && isHoveredRef.current) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        rafRef.current = null;
        lastTRef.current = null;
        return;
      }

      pos.set(cur + Math.sign(diff) * step);
      rafRef.current = requestAnimationFrame(tick);
    },
    [pos]
  );

  const ensureRunning = useCallback(() => {
    if (rafRef.current == null) {
      lastTRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const goNext = useCallback(() => {
    targetRef.current += 1;
    dwellAccRef.current = 0;
    ensureRunning();
  }, [ensureRunning]);

  const goPrev = useCallback(() => {
    targetRef.current -= 1;
    dwellAccRef.current = 0;
    ensureRunning();
  }, [ensureRunning]);

  const goTo = useCallback(
    (index: number) => {
      const cur = targetRef.current;
      let d = index - cur;
      d = ((d % count) + count) % count;
      if (d > count / 2) d -= count;
      targetRef.current = cur + d;
      dwellAccRef.current = 0;
      ensureRunning();
    },
    [ensureRunning, count]
  );

  // Initialize and run autoplay immediately on mount
  useEffect(() => {
    autoplayingRef.current = autoplay && count > 1;
    dirRef.current = autoplayDirection === 'leftToRight' ? -1 : 1;
    dwellAccRef.current = 0;
    ensureRunning();

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [autoplay, autoplayDirection, count, ensureRunning]);

  // Touch Swipe Gesture for Mobile
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isHoveredRef.current = true;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    isHoveredRef.current = false;
    dwellAccRef.current = 0;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isHoveredRef.current) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        dwellAccRef.current = 0;
        ensureRunning();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[370px] sm:h-[420px] overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-xl select-none outline-none"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          isolation: 'isolate',
          zIndex: 0,
        }}
      >
        {players.map((player, i) => (
          <Card
            key={player.id || player.slug}
            player={player}
            index={i}
            pos={pos}
            count={count}
            R={R}
            sizing={sizing}
            gap={gap}
            radius={radius}
            solidBg={SOLID_FALLBACKS[i % SOLID_FALLBACKS.length]}
            seasonString={seasonString}
            onSelect={goTo}
            onOpenDossier={onOpenDossier}
          />
        ))}
      </div>

      {/* Prev and Next Arrow buttons removed as requested */}
    </div>
  );
}
