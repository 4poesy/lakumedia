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

const GRADIENT_FALLBACKS = [
  'linear-gradient(160deg, #1e293b, #0f172a)',
  'linear-gradient(160deg, #2A2E7F, #090A0F)',
  'linear-gradient(160deg, #064e3b, #022c22)',
  'linear-gradient(160deg, #7c2d12, #451a03)',
  'linear-gradient(160deg, #312e81, #1e1b4b)',
  'linear-gradient(160deg, #134e4a, #042f2e)',
];

const RENDER_RANGE = 6;

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
  gradient,
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
  gradient: string;
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
    return (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(w, h) / 14);
  });
  const boxShadow = useTransform(pos, (p: number) =>
    Math.abs(relOf(index, p, count)) < 0.5
      ? '0 24px 70px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(16, 185, 129, 0.4)'
      : '0 14px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)'
  );

  // Active details fade in ONLY on center card, smoothly fading out as it slides to slat
  const activeDetailsOpacity = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    return ar < 0.35 ? 1 : ar > 0.7 ? 0 : 1 - (ar - 0.35) / 0.35;
  });

  // Slat minimal label fades in on side cards
  const slatLabelOpacity = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    return ar >= 0.5 ? 1 : 0;
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
          background: gradient,
          boxShadow,
          position: 'relative',
        }}
        className="group select-none"
      >
        {/* Background Image / Silhouette */}
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
            <User className="w-16 h-16 text-slate-500 mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Star</span>
          </div>
        )}

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-950/80 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
            🇳🇬 Super Eagles
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#D9541E] text-white shadow-sm">
            {player.region.toUpperCase().replace('_', ' ')}
          </span>
        </div>

        {/* 1. ACTIVE CENTER CARD: Full Details & CTA Button */}
        <motion.div
          style={{ opacity: activeDetailsOpacity }}
          className="absolute bottom-0 inset-x-0 p-5 text-white z-10 space-y-2 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pointer-events-auto"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{player.position}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white drop-shadow">
            {player.name}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-300 font-bold truncate">
            <span className="flex items-center gap-1 truncate text-slate-200">
              <Shield className="w-3.5 h-3.5 text-[#D9541E] shrink-0" />
              {player.current_club}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-300 shrink-0">
              <Globe className="w-3 h-3 text-slate-400" />
              {player.club_country}
            </span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {seasonString} Scope
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDossier(player);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>View Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* 2. SIDE SLAT: Clean, uncluttered name label */}
        <motion.div
          style={{ opacity: slatLabelOpacity }}
          className="absolute bottom-0 inset-x-0 p-3 text-white z-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none text-center"
        >
          <p className="text-xs font-black uppercase tracking-tight text-white truncate drop-shadow">
            {player.name}
          </p>
          <p className="text-[9px] text-slate-400 font-bold truncate">
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
        borderRadius: '50%',
        border: '1.5px solid rgba(255, 255, 255, 0.25)',
        background,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        zIndex: 2000,
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        WebkitTapHighlightColor: 'transparent',
      }}
      className="hover:scale-110 active:scale-95 transition-transform"
    >
      <svg
        width={size * 0.4}
        height={size * 0.4}
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
  activeWidth?: number;
  activeHeight?: number;
  restWidth?: number;
  restHeight?: number;
  gap?: number;
  radius?: number;
  showArrows?: boolean;
  autoplay?: boolean;
  autoplayDirection?: 'leftToRight' | 'rightToLeft';
}

export function DiasporaCoverflowCarousel({
  players,
  seasonString,
  onOpenDossier,
  activeWidth = 560,
  activeHeight = 380,
  restWidth = 175,
  restHeight = 280,
  gap = 24,
  radius = 16,
  showArrows = true,
  autoplay = true,
  autoplayDirection = 'rightToLeft',
}: DiasporaCoverflowCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const count = Math.max(1, players.length);

  const sizing: Sizing = useMemo(
    () => ({ restWidth, restHeight, activeWidth, activeHeight }),
    [restWidth, restHeight, activeWidth, activeHeight]
  );

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
      const dur = 0.45;
      const step = (1 / dur) * dt;
      const arriving = reducedRef.current || Math.abs(diff) <= step;

      if (arriving) {
        pos.set(targetRef.current);
        if (autoplayingRef.current && !isHoveredRef.current) {
          dwellAccRef.current += dt;
          // 2.2 seconds dwell time between automatic slides
          if (dwellAccRef.current >= 2.2) {
            dwellAccRef.current = 0;
            targetRef.current += dirRef.current;
          }
          rafRef.current = requestAnimationFrame(tick);
          return;
        } else if (autoplayingRef.current && isHoveredRef.current) {
          // Keep ticking while hovered so timer resets smoothly
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
      tabIndex={0}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        dwellAccRef.current = 0;
        ensureRunning();
      }}
      className="relative w-full h-[420px] sm:h-[450px] overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl select-none outline-none"
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
            gradient={GRADIENT_FALLBACKS[i % GRADIENT_FALLBACKS.length]}
            seasonString={seasonString}
            onSelect={goTo}
            onOpenDossier={onOpenDossier}
          />
        ))}
      </div>

      {showArrows && count > 1 && (
        <>
          <ArrowButton
            side="left"
            onClick={goPrev}
            color="#FFFFFF"
            background="#2A2E7F"
            size={46}
            position={94}
          />
          <ArrowButton
            side="right"
            onClick={goNext}
            color="#FFFFFF"
            background="#2A2E7F"
            size={46}
            position={94}
          />
        </>
      )}
    </div>
  );
}
