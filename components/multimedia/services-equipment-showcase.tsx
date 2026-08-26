'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Radio, Volume2, Cpu, Sparkles, CheckCircle2, Zap, Shield, Globe } from 'lucide-react';
import { ScrollRevealSection, ScrollRevealChild } from '@/components/multimedia/motion/scroll-reveal-section';
import { CinematicCardMotion } from '@/components/multimedia/motion/cinematic-card-motion';

function CameraRigAutoCrossfade() {
  const images = [
    {
      src: '/assest/service_camera_auto_1.png',
      alt: 'RED V-Raptor 8K Cinema Camera Body & Monitor',
      label: 'RED V-RAPTOR 8K VV CINEMA SENSOR',
      contain: true,
    },
    {
      src: '/assest/service_camera_auto_2.jpg',
      alt: 'ARRI Alexa Mini LF Cinema Camera Side Profile',
      label: 'ARRI ALEXA MINI LF LARGE FORMAT CINE RIG',
      contain: true,
    },
    {
      src: '/assest/service_camera_auto_3.jpg',
      alt: 'RED 8K Cinema Rig with Fujinon 25-300mm Lens',
      label: 'FUJINON 25-300mm CINE ZOOM & FOLLOW FOCUS',
      contain: false,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#05060A] flex items-center justify-center">
      {images.map((img, idx) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className={img.contain ? 'object-contain p-6' : 'object-cover'}
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Cinematic Dark Bottom Overlay & Dynamic Label */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />
      
      <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md z-10 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-[#D9541E] block">
            AUTO-CHANGING CAMERA TECH SPEC (3 SLIDES)
          </span>
          <h4 className="text-xs font-extrabold text-white">
            {images[currentIndex].label}
          </h4>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-[#D9541E] w-5' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DroneRigAutoCrossfade() {
  const images = [
    {
      src: '/assest/service_drone_auto_1.jpg',
      alt: 'iFLIGHT Carbon Fiber FPV Cinema Racing Drone Rig',
      label: 'iFLIGHT CARBON FIBER FPV CINE RIG (140KM/H)',
      contain: false,
    },
    {
      src: '/assest/service_drone_auto_2.jpg',
      alt: '3D Stadium Wire Cablecam System over Pitch',
      label: '3D STADIUM WIRE CABLECAM SYSTEM',
      contain: false,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#05060A] flex items-center justify-center">
      {images.map((img, idx) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className={img.contain ? 'object-contain p-6' : 'object-cover'}
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Cinematic Dark Bottom Overlay & Dynamic Label */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />
      
      <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md z-10 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-purple-400 block">
            AUTO-CHANGING AERIAL TECH SPEC (2 SLIDES)
          </span>
          <h4 className="text-xs font-extrabold text-white">
            {images[currentIndex].label}
          </h4>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-purple-500 w-5' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesEquipmentShowcase() {
  const equipmentCards = [
    {
      id: 'eq-1',
      badge: '8K CINEMA RIGS',
      badgeColor: 'bg-[#D9541E] text-white',
      title: 'RED V-Raptor 8K & ARRI Alexa Mini LF',
      description: 'We deploy state-of-the-art RED V-Raptor 8K VV sensor systems and ARRI Alexa Mini LF cinema rigs equipped with anamorphic cine prime lenses, follow focus, wireless video transmitters, and 3-axis motorized gimbal stabilizers for high-end film shoots.',
      features: ['8K Resolution & 120fps High-Speed', 'Anamorphic Cinema Prime Lenses', 'ProRes 4444 XQ & RAW Workflows'],
      imageAlt: 'RED V-Raptor 8K Cinema Camera Rig with Fujinon Lens',
      imageOnRight: true, // Content LEFT, Image RIGHT
      useCameraSlider: true,
    },
    {
      id: 'eq-2',
      badge: 'SATELLITE OB FLEET',
      badgeColor: 'bg-[#10B981] text-slate-950',
      title: 'Dual C/Ku-Band OB Satellite Uplink Van',
      description: 'We facilitate and engineer mobile satellite Outside Broadcast (OB) vans fitted with dual motorized 2.4m satellite dish antennas, 16-channel 4K video switchers, multi-cam live graphics engines, and satellite uplink transmitters.',
      features: ['Dual C/Ku-Band Satellite Transponders', '16-Channel 4K Triax Switcher', 'Live Stadium Realtime Graphics Engine'],
      image: '/assest/service_satellite_ob_dish.jpg',
      imageAlt: 'Laku Media C/Ku-Band Satellite Teleport Uplink Dish Antenna',
      imageOnRight: false, // Image LEFT, Content RIGHT
    },
    {
      id: 'eq-3',
      badge: 'MASTER AUDIO & COLOR',
      badgeColor: 'bg-[#2A2E7F] text-[#10B981]',
      title: 'Dolby Atmos 7.1.4 Surround Sound Suite',
      description: 'Access certified Dolby Atmos spatial audio studio environments featuring Pro Tools HDX hardware DSP, Genelec Smart Active 7.1.4 monitors, acoustically-isolated recording booths, and DaVinci Resolve Studio 8K color suites.',
      features: ['Dolby Atmos Certified 7.1.4 Room', 'Genelec Smart Active DSP Monitors', 'DaVinci Resolve Studio 8K Color Grading'],
      image: '/assest/user_about_control_room_2.jpg',
      imageAlt: 'Laku Media Master Control Room & Audio Production Suite',
      imageOnRight: true, // Content LEFT, Image RIGHT
    },
    {
      id: 'eq-4',
      badge: 'AERIAL & SPECIAL EFFECTS',
      badgeColor: 'bg-purple-600 text-white',
      title: 'FPV Racing Drones & Stadium Cablecam',
      description: 'Specialized 4K aerial cinema rigs including custom high-speed FPV racing drones capable of 140km/h chase shots, heavy-lift octocopters, and high-tension stadium 3D wire cable cam rigs for live sports and concert stages.',
      features: ['140km/h High-Speed FPV Chase Shots', '3D Stadium Wire Cablecam Rigging', 'Realtime 4K Wireless Zero-Delay Video'],
      imageAlt: 'Laku Media Satellite & Aerial Production Infrastructure',
      imageOnRight: false, // Image LEFT, Content RIGHT
      useDroneSlider: true,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto space-y-12 my-12">
      {/* Section Header */}
      <ScrollRevealSection className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> PRODUCTION TECH & EQUIPMENT STAGING
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            WORLD-CLASS CINEMA & BROADCAST TECH CAPABILITIES
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl">
            Through our network of elite technical partners and expert production crew, Laku Media deploys, stages, and operates industry-standard broadcast equipment, satellite OB vans, 8K RED cinema rigs, and Dolby Atmos audio suites for client productions.
          </p>
        </div>
      </ScrollRevealSection>

      {/* 4 Alternating 2-Column Cards */}
      <ScrollRevealSection stagger className="space-y-10">
        {equipmentCards.map((card) => (
          <ScrollRevealChild key={card.id}>
            <CinematicCardMotion hoverScale={1.015} hoverY={-3}>
              <div className="bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden hover:border-[#10B981] transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      card.imageOnRight ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                    }`}
                  >
                    <div className="space-y-2">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-slate-700 inline-block ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      {card.description}
                    </p>

                    {/* Feature Bullet Points */}
                    <div className="space-y-2 pt-2 border-t border-slate-900">
                      {card.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group ${
                      card.imageOnRight ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
                    }`}
                  >
                    {card.useCameraSlider ? (
                      <CameraRigAutoCrossfade />
                    ) : card.useDroneSlider ? (
                      <DroneRigAutoCrossfade />
                    ) : (
                      <>
                        <Image
                          src={card.image || ''}
                          alt={card.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#10B981] block">
                            PRODUCTION TECH & STAGING CAPABILITIES
                          </span>
                          <h4 className="text-xs font-extrabold text-white">{card.title}</h4>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </CinematicCardMotion>
          </ScrollRevealChild>
        ))}
      </ScrollRevealSection>
    </section>
  );
}
