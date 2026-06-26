import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TerminalSquare, Link2, X, ExternalLink, Github, Globe, ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '@/components/RightSidebar';
import { useSidebar } from '@/context/SidebarContext';

/* ─── Types ──────────────────────────────────────────────────── */

interface ProjectMedia {
  type: 'image' | 'gif' | 'video';
  src: string;
  caption?: string;
}

interface ProjectLink {
  label: string;
  url: string;
  icon: 'github' | 'live' | 'external';
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: 'DEPLOYED' | 'ACTIVE' | 'BETA' | 'LIVE' | 'ARCHIVED';
  description: string;
  longDescription: string;
  tags: string[];
  thumbnail: string;
  media: ProjectMedia[];
  links: ProjectLink[];
  awards?: string[];
  year: string;
  sysName: string;
}

/* ─── Placeholder Data ───────────────────────────────────────── */

const PROJECTS_DATA: Project[] = [
  {
    id: 'project-1',
    title: 'Amperon',
    sysName: 'AMPERON',
    subtitle: 'Prompt-Based Circuit Design Platform • 🏆 Winner @ NexHacks',
    status: 'LIVE',
    description: 'AI-powered collaborative circuit design and learning platform that generates schematics from natural language and validates physical wiring via AR.',
    longDescription: `Amperon is a high-fidelity circuit design and learning platform that bridges the gap between digital schematics and physical prototyping. Born from the challenges of robotics engineering, it empowers builders to design, simulate, and debug electronics using state-of-the-art AI.\n\nKey Capabilities:\n• Natural Language Schematic Generation: Describe a circuit in plain text, and Amperon (via Claude/GPT) automatically places and connects valid components using 10,000+ industry-accurate KiCad symbols.\n• AR Breadboard Analysis: A first-of-its-kind mobile integration that uses the Overshoot AI SDK to scan physical circuits in real time, detecting wiring errors, reading resistor color bands, and identifying polarity issues through the camera.\n• Custom Simulation Engine: Custom-built graph traversal engine that detects short circuits, missing power/ground, and invalid connections instantly.\n• Real-Time Collaboration: Multi-user editing via Socket.io allows teams to work on the same schematic live, similar to Figma for hardware.\n\nTechnical Stack:\nBuilt with a cutting-edge stack including React 19, TypeScript, React Flow for the infinite canvas, Socket.io for real-time state, and OpenRouter API for the design intelligence.`,
    tags: ['REACT', 'TYPESCRIPT', 'NODE.JS', 'SOCKET.IO', 'WEBGL'],
    thumbnail: '/amperon_segment1.gif',
    media: [
      { type: 'gif' as const, src: '/amperon_segment1.gif', caption: 'Real-time collaborative schematic editor' },
      { type: 'gif' as const, src: '/amperon_segment4.gif', caption: 'AI generation of complex logic gates' },
      { type: 'gif' as const, src: '/amperon_segment2.gif', caption: 'Educational learning mode with live feedback' },
      { type: 'gif' as const, src: '/amperon_segment5.gif', caption: 'Interactive component placement and simulation' },
      { type: 'gif' as const, src: '/amperon_segment3.gif', caption: 'AR implementation for physical circuit validation' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/shourya-sh/amperon', icon: 'github' as const },
      { label: 'Live Application', url: 'https://circuitco.web.app/', icon: 'live' as const },
      { label: 'Devpost Submission', url: 'https://devpost.com/software/circuito', icon: 'external' as const },
    ],
    awards: ['🏆 NexHacks Winner — TRAE (ByteDance) Sponsor Track'],
    year: '2026',
  },
  {
    id: 'project-2',
    title: 'Communico',
    sysName: 'COMMUNICO',
    subtitle: 'AAC Communication App • 🏆 Best Accessibility Hack @ DeltaHacks 12',
    status: 'DEPLOYED',
    description: 'All-in-one augmented and alternative communication app allowing nonverbal and ASD users to communicate through symbols, emotions, drawings, and transcriptions.',
    longDescription: `Communico is an all-in-one Augmented and Alternative Communication app that allows nonverbal or differently abled users to express themselves using picture-based tiles, sentence building, drawings, transcriptions, and AI-assisted conversation support.\n\nUsers can visually construct sentences, hear them spoken aloud, receive real-time next-word tile suggestions, convert drawings into simple sentences, and transcribe complex speech or text into AAC-friendly tiles. The app also suggests short, context-aware replies to help users participate in conversations quickly and confidently.\n\nThe inspiration behind this was working as an inclusion and integration instructor for a kid with low-functioning, non-verbal autism spectrum disorder who used an AAC app on his iPad. After realizing how cumbersome the whole system was, this hackathon became the perfect opportunity to reimagine the AAC space.\n\nKey technical highlights:\n• Real-time emotion detection via face-api.js (TensorFlow.js) running inside a WebView, processing webcam frames every ~250ms across 7 core emotions\n• AI-powered next-word suggestions, sentence simplification, and context-aware replies via OpenRouter + Gemini API\n• Natural text-to-speech via ElevenLabs with cached common phrases\n• AAC symbols sourced from OpenSymbols with lazy loading and local caching\n• Built in React Native with Expo, fully cross-platform (Android & iOS)`,
    tags: ['REACT NATIVE', 'TYPESCRIPT', 'GEMINI', 'ELEVENLABS', 'TENSORFLOW.JS'],
    thumbnail: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/151/685/datas/original.gif',
    media: [
      { type: 'gif' as const, src: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/151/685/datas/original.gif', caption: 'Communico main interface — AAC tile-based sentence building' },
      { type: 'gif' as const, src: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/151/714/datas/original.gif', caption: 'AI-powered next-word suggestions and conversation support' },
      { type: 'gif' as const, src: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/151/684/datas/original.gif', caption: 'Chat transcription feature leveraging text-to-speech' },
      { type: 'gif' as const, src: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/151/686/datas/original.gif', caption: 'Emotion-based classification system via real-time webcam detection' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/xafn/communico', icon: 'github' as const },
      { label: 'Devpost Submission', url: 'https://devpost.com/software/communico-i5opvc', icon: 'external' as const },
    ],
    awards: ['🏆 Best Accessibility Hack — DeltaHacks 12'],
    year: '2025',
  },
  {
    id: 'project-3',
    title: 'Antifouling Bot',
    sysName: 'ANTIFOULING',
    subtitle: '🥈 2nd in the World @ WRO Future Innovators • 🇨🇦 First Canadian Podium Since 2014',
    status: 'ACTIVE',
    description: 'Autonomous magnetic-climbing robot that removes biofouling from ship hulls — 2nd place at WRO Internationals and Canada\'s first-ever podium at the World Robot Olympiad.',
    longDescription: `The Anti-fouling Autonomous Robotics Mitigation System (A-FARM) is an autonomous robot designed to combat biofouling — the accumulation of microorganisms, algae, and bacteria on underwater surfaces such as vessels, oil rigs, and marine infrastructure.\n\nThe robot autonomously maneuvers around ship hulls using magnetic wheels, cleaning biofouling without toxic chemicals. This tackles critical maritime challenges:\n• Increasing operational efficiency by minimizing drag and improving manoeuvrability\n• Reducing maintenance and fuel costs associated with traditional cleaning methods\n• Significantly improving fuel efficiency and reducing greenhouse gas emissions\n• Stopping the spread of invasive species that harm local communities and food chains\n• Eliminating reliance on harmful toxic anti-fouling chemicals that leach into waterways\n\nBuilt with Fusion 360 for chassis and cleaning system design, 3D-printed components, and Arduino-based control — moving beyond Lego robotics into industrial-grade hardware that can actually benefit the world.\n\nThe team is currently developing a more industrial prototype adaptable to diverse underwater marine infrastructure beyond boat hulls.`,
    tags: ['ARDUINO', 'C++', 'FUSION 360', 'ROBOTICS', '3D PRINTING'],
    thumbnail: '/antifouling_trophy.jpg',
    media: [
      { type: 'image' as const, src: '/antifouling_trophy.jpg', caption: '2nd place at WRO Future Innovators — Senior category, Panama 2023' },
      { type: 'image' as const, src: '/antifouling_presentation.jpg', caption: 'Presenting the biofouling mitigation system to WRO judges' },
      { type: 'image' as const, src: '/antifouling_podium_stage.jpg', caption: 'WRO Panama 2023 awards stage — Canada\'s first podium at WRO Internationals since 2014' },
      { type: 'image' as const, src: '/antifouling_team_robot.jpg', caption: 'Team with the AntiFouling robot and WRO certificates' },
    ],
    links: [
      { label: 'Zebra Robotics Feature', url: 'https://blog.zebrarobotics.com/writing-history-today-for-the-competitors-of-tomorrow/', icon: 'external' as const },
      { label: 'Ingenious+ Program', url: 'https://ingeniousplus.ca/', icon: 'external' as const },
    ],
    awards: [
      '🥈 2nd Place in the World — WRO Future Innovators (Senior), Panama 2023',
      '🇨🇦 First-Ever Canadian Podium at WRO Internationals Since 2014',
      '💰 $1,000 Regional Winner — Ingenious+ Grant, Presented by Lieutenant Governor Edith Dumont',
    ],
    year: '2023',
  },
  {
    id: 'project-4',
    title: 'Yuno Ball',
    sysName: 'YUNO_BALL',
    subtitle: 'NBA Prediction & Analytics Engine • CXC 2026',
    status: 'LIVE',
    description: 'AI-powered NBA game predictor that uses live data pipelines and gradient-boosted models to forecast match outcomes and player performance.',
    longDescription: `Yuno Ball is a high-performance NBA prediction and analytics engine designed to provide fans and analysts with data-driven insights. By leveraging real-time data ingestion and state-of-the-art machine learning models, it transforms complex basketball statistics into actionable intelligence.\n\nKey Capabilities:\n• Live Data Pipeline: Ingests official play-by-play and box score feeds, along with real-time injury and lineup updates, ensuring predictions are always current.\n• Probabilistic Forecasting: Uses gradient-boosted decision trees with probability calibration to produce game win probabilities and projected margins.\n• Explainable AI: Surfaces the "why" behind every prediction by highlighting key features and model insights, building user trust through transparency.\n• Advanced Analytics: Provides player performance forecasts and market-aligned predictions by aggregating data from sources like NBA-API and Polylarket.\n\nTechnical Stack:\nThe engine is powered by Python (FastAPI) and a robust ML stack including Pandas, PyTorch, and Scikit-learn. The frontend is a high-performance React application using TypeScript and Tailwind CSS, with integration of the Gemini API for natural language insights.`,
    tags: ['PYTHON', 'PYTORCH', 'REACT', 'FASTAPI', 'GEMINI'],
    thumbnail: '/yuno_dashboard.gif',
    media: [
      { type: 'gif' as const, src: '/yuno_dashboard.gif', caption: 'Central analytics dashboard with live game probabilities' },
      { type: 'gif' as const, src: '/yuno_analyst.gif', caption: 'AI-powered technical analysis of team matchups' },
      { type: 'gif' as const, src: '/yuno_parlays.gif', caption: 'High-confidence parlay suggestions based on model insights' },
      { type: 'gif' as const, src: '/yuno_live.gif', caption: 'Live win probability shifts based on real-time game data' },
      { type: 'gif' as const, src: '/yuno_futures.gif', caption: 'Long-term futures forecasting and season-level projections' },
      { type: 'gif' as const, src: '/yuno_model.gif', caption: 'Technical model breakdown and feature importance visualization' },
    ],
    links: [
      { label: 'Devpost Submission', url: 'https://devpost.com/software/yuno-ball', icon: 'external' as const },
      { label: 'Demo Video', url: 'https://www.youtube.com/watch?v=U0FEb5V6Gc4', icon: 'live' as const },
    ],
    awards: [],
    year: '2026',
  },
];

const PROJECTS_ASCII = String.raw`
    ____  ____  ____      _________________________
   / __ \/ __ \/ __ \    / / ____/ ____/_  __/ ___/
  / /_/ / /_/ / / / /_  / / __/ / /     / /  \__ \ 
 / ____/ _, _/ /_/ / /_/ / /___/ /___  / /  ___/ / 
/_/   /_/ |_|\____/\____/_____/\____/ /_/  /____/  
`;

/* ─── Status color helper ────────────────────────────────────── */

function statusColor(status: string) {
  switch (status) {
    case 'DEPLOYED': return '#a1faff';
    case 'ACTIVE': return '#00fc40';
    case 'LIVE': return '#00fc40';
    case 'BETA': return '#febc2e';
    case 'ARCHIVED': return '#777575';
    default: return '#777575';
  }
}

const linkIcon = (icon: string) => {
  switch (icon) {
    case 'github': return <Github size={14} />;
    case 'live': return <Globe size={14} />;
    default: return <ExternalLink size={14} />;
  }
};

/* ─── Project Card ───────────────────────────────────────────── */

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group bg-[#050505] border border-[#1f1f1f] hover:border-[#a1faff]/40 relative overflow-hidden transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Decorative dots (Mac style hint) */}
      <div className="absolute top-2 left-2 flex gap-1 z-[10] opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]/60" />
      </div>

      <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity z-[2]">
        <span className="text-[7.5px] font-mono tracking-widest uppercase" style={{ color: statusColor(project.status) }}>
          ● {project.status}
        </span>
      </div>

      {/* Thumbnail / Media Area - VIDEO ASPECT (Shorter) */}
      <div className="relative w-full aspect-video bg-[#000] overflow-hidden border-b border-[#1f1f1f]">
        
        {/* Award Ribbon (Floating Banner) */}
        {project.awards && project.awards.length > 0 && (
          <div className="absolute top-5 left-[-48px] bg-gradient-to-r from-[#febc2e] via-[#f1c40f] to-[#febc2e] text-black font-mono font-black text-[8px] py-1 w-[180px] text-center -rotate-45 z-[15] shadow-[0_5px_15px_rgba(0,0,0,0.5)] border-y-2 border-black/10 select-none flex items-center justify-center uppercase tracking-[0.3em] pointer-events-none">
            PRIZE WINNER
          </div>
        )}

        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 15px, #fff 15px, #fff 16px),
                                repeating-linear-gradient(90deg, transparent, transparent 15px, #fff 15px, #fff 16px)`,
            }} />
            <div className="flex flex-col items-center gap-1.5 z-10 scale-[0.8] group-hover:scale-[0.85] transition-transform">
              <div className="w-8 h-8 border border-[#1f1f1f] rounded flex items-center justify-center bg-[#0a0a0a]">
                <Play size={14} className="text-[#333] group-hover:text-[#a1faff]/40 transition-colors" />
              </div>
              <span className="font-mono text-[7px] text-[#222] group-hover:text-[#333] tracking-widest uppercase">AWAITING_MEDIA</span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#a1faff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />
      </div>

      <div className="p-3 flex flex-col gap-1 z-10 bg-[#050505] group-hover:bg-[#080808] transition-colors">
        <h3 className="font-mono text-[12px] font-bold text-white group-hover:text-[#a1faff] transition-colors truncate">
          {project.title}
        </h3>
        <p className="font-mono text-[10px] text-[#555] leading-snug group-hover:text-[#888] transition-colors line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
          {project.tags.map(tag => (
            <span key={tag} className="text-[7.5px] font-mono px-1.5 py-0.5 border border-[#1f1f1f] text-[#444] uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Project Modal (Unified Single View) ────────────────── */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleClose]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 transition-all duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`w-full max-w-2xl max-h-[85vh] flex flex-col bg-[#121212] rounded-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 border border-white/10 ${isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ animation: isClosing ? '' : 'modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* MacOS Title Bar */}
        <div className="flex items-center h-10 px-4 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border-b border-black/20 relative shrink-0">
          <div className="flex gap-2 mr-4">
            <button onClick={handleClose} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 shadow-sm transition-all" />
            <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 shadow-sm transition-all" />
            <button className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 shadow-sm transition-all" />
          </div>
          <div className="flex-1 flex justify-center mr-16">
            <span className="font-mono text-[10px] text-[#777] font-bold tracking-[0.15em] uppercase">
              {project.title}
            </span>
          </div>
        </div>

        {/* Unified Scrollable Content */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-[#0a0a0a]">

          {/* Media Gallery */}
          {project.media.length > 0 && (
            <div className="relative">
              <div className="relative w-full bg-black overflow-hidden group">
                <img
                  src={project.media[mediaIndex].src}
                  className="w-full h-auto max-h-[320px] object-contain mx-auto"
                  alt=""
                />
                {project.media.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); setMediaIndex(i => (i - 1 + project.media.length) % project.media.length); }} className="p-1.5 rounded-full bg-black/70 border border-white/10 text-white backdrop-blur-sm hover:bg-black/90 transition-colors">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setMediaIndex(i => (i + 1) % project.media.length); }} className="p-1.5 rounded-full bg-black/70 border border-white/10 text-white backdrop-blur-sm hover:bg-black/90 transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
                {/* Counter */}
                <div className="absolute bottom-2 right-3 font-mono text-[8px] text-white/60 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {mediaIndex + 1} / {project.media.length}
                </div>
              </div>
              {/* Thumbnail strip */}
              {project.media.length > 1 && (
                <div className="flex gap-1 p-2 bg-[#080808] border-b border-[#1a1a1a] overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {project.media.map((m, i) => (
                    <button key={i} onClick={() => setMediaIndex(i)} className={`w-12 h-9 shrink-0 rounded overflow-hidden transition-all ${i === mediaIndex ? 'ring-1 ring-[#a1faff] opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                      <img src={m.src} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              )}
              {/* Caption */}
              {project.media[mediaIndex]?.caption && (
                <div className="px-6 py-2 bg-[#080808] border-b border-[#1a1a1a]">
                  <p className="font-mono text-[9px] text-[#555] italic">{project.media[mediaIndex].caption}</p>
                </div>
              )}
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 flex flex-col gap-5">

            {/* Title + Status */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-mono text-[22px] font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <span
                  className="font-mono text-[8px] tracking-[0.15em] px-2 py-0.5 rounded border uppercase"
                  style={{ color: statusColor(project.status), borderColor: statusColor(project.status) + '40', backgroundColor: statusColor(project.status) + '08' }}
                >
                  ● {project.status}
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#555] mt-1 tracking-widest uppercase">{project.subtitle}</p>
            </div>

            {/* Awards */}
            {project.awards && project.awards.length > 0 && (
              <div className="flex flex-col gap-2">
                {project.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-[#febc2e]/5 border border-[#febc2e]/20 rounded">
                    <span className="font-mono text-[11px] text-[#febc2e] font-medium">{award}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="h-px bg-white/5" />

            {/* Description */}
            <div className="font-mono text-[12px] text-[#999] leading-relaxed whitespace-pre-wrap">
              {project.longDescription || project.description}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#444] font-bold tracking-widest uppercase">Built With</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] px-2.5 py-1 border border-[#1f1f1f] text-[#666] bg-[#0d0d0d] rounded uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {project.links.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] text-[#444] font-bold tracking-widest uppercase">Links</span>
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-[#1f1f1f] rounded hover:border-[#a1faff]/30 hover:bg-[#151515] transition-all group"
                    >
                      <span className="text-[#555] group-hover:text-[#a1faff] transition-colors">
                        {linkIcon(link.icon)}
                      </span>
                      <span className="font-mono text-[10px] text-[#777] group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                      <ExternalLink size={10} className="text-[#333] group-hover:text-[#666] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="h-6 bg-[#1a1a1a] border-t border-black/20 flex items-center justify-between px-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#00fc40]" />
            <span className="font-mono text-[8px] text-[#555] tracking-widest">{project.year}</span>
          </div>
          <span className="font-mono text-[8px] text-[#333] tracking-widest">{project.tags.join(' · ')}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */

export default function Projects() {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lastLogin, setLastLogin] = useState('');
  
  const [history, setHistory] = useState<{ cmd?: string; out: React.ReactNode | string; isSystem?: boolean }[]>([
    {
      cmd: 'sys_connect', out: (
        <div className="text-[#a1faff] font-mono mt-0.5 ml-4 mb-2">
          Session restored. Type 'help' for available commands.
        </div>
      )
    }
  ]);

  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const topPaneRef = useRef<HTMLDivElement>(null);

  const [topHeight, setTopHeight] = useState(500);
  const [minTopHeight, setMinTopHeight] = useState(500);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setLastLogin(new Date().toString().split(' GMT')[0]);
    const timer = setTimeout(() => {
      if (topPaneRef.current) {
        const h = topPaneRef.current.scrollHeight;
        setTopHeight(Math.max(500, h));
        setMinTopHeight(Math.max(500, h));
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdText = input.trim();
    if (!cmdText) return;

    const args = cmdText.toLowerCase().split(' ').filter(Boolean);
    const command = args[0];

    let output: React.ReactNode | string = '';

    switch (command) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1">
            <div className="text-[#a1faff] mb-1 italic">Projects Shell v1.0.4</div>
            <div>• <span className="text-white">ls</span> - List project executables</div>
            <div>• <span className="text-white">run [name]</span> - Launch graphical interface</div>
            <div>• <span className="text-white">clear</span> - Purge log buffer</div>
            <div>• <span className="text-white">back</span> - Exit to root</div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 max-w-sm">
            {PROJECTS_DATA.map(p => (
              <div key={p.id} className="text-[#a1faff]">{p.sysName.toLowerCase()}.exe</div>
            ))}
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'back':
      case 'cd ..':
        setHistory(prev => [...prev, { out: "Navigating to ROOT...", isSystem: true }]);
        setTimeout(() => navigate('/'), 400);
        return;
      case 'run':
        const target = args[1]?.replace('.exe', '');
        const p = PROJECTS_DATA.find(proj => proj.sysName.toLowerCase() === target);
        if (p) {
          setSelectedProject(p);
          output = `Execution triggered for ${p.sysName}.SYS. Initializing GUI modal...`;
        } else {
          output = `bash: run: ${args[1] || 'undefined'}: executable not found`;
        }
        break;
      default:
        output = `bash: ${command}: command not found`;
    }

    setHistory([...history, { cmd: cmdText, out: output }]);
    setInput('');
  };

  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDrag = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newHeight = Math.max(250, Math.min(e.clientY - 40, window.innerHeight - 150));
      setTopHeight(newHeight);
    }
  }, [isDragging]);

  const stopDragging = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, onDrag, stopDragging]);

  return (
    <>
      {/* ── MOBILE LAYOUT (hidden on xl+) ──────────────────────────── */}
      <div className="xl:hidden flex flex-col h-full bg-[#0a0a0a]">
        {/* Header — BACK anchored left so it can never be pushed off-screen */}
        <div className="flex items-center gap-3 px-3 py-2.5 bg-[#181818] border-b border-[#1f1f1f] shrink-0">
          <button
            onClick={() => navigate('/')}
            className="font-mono text-[10px] font-bold text-white border border-[#444] bg-[#222] hover:bg-[#333] hover:border-[#a1faff]/50 hover:text-[#a1faff] px-3 py-1.5 transition-all uppercase tracking-widest shrink-0"
          >
            ← BACK
          </button>
          <span className="font-mono text-[9px] text-[#777575] tracking-widest font-bold uppercase flex-1 min-w-0 truncate text-center">PROJECTS</span>
          <div className="flex gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
          </div>
        </div>

        {/* Scrollable project cards */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="font-mono text-[9px] text-[#777575] mb-4 leading-relaxed">
            <span>[SYSTEM]: Project Modules Active &nbsp;·&nbsp; </span>
            <span className="text-white">{lastLogin}</span>
          </div>
          <div className="grid grid-cols-1 gap-4 pb-4">
            {PROJECTS_DATA.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => {
                  setSelectedProject(p);
                  setHistory(prev => [...prev, { cmd: `run ${p.sysName.toLowerCase()}`, out: `Initializing graphical display for ${p.sysName}...` }]);
                }}
              />
            ))}
          </div>
        </div>

        {/* Terminal input */}
        <form onSubmit={handleCommand} className="px-4 py-3 border-t border-[#1f1f1f] font-mono text-[12px] flex items-center gap-2 shrink-0 bg-[#0a0a0a]">
          <span className="text-white font-bold shrink-0 text-[10px] whitespace-nowrap">admin@shourya:~/projects$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-white grow min-w-0 font-mono tracking-wider caret-white"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>

      {/* ── DESKTOP LAYOUT (hidden below xl) ──────────────────────── */}
      <div
        className={`hidden xl:grid h-full grid-cols-1 transition-all duration-300 ease-in-out bg-[#0a0a0a]
          ${isOpen ? 'xl:grid-cols-[1fr_260px]' : 'xl:grid-cols-[1fr_0px]'}
        `}
        onClick={(e) => {
          if (!selectedProject && !(e.target as HTMLElement).closest('input, textarea, button, a')) {
            inputRef.current?.focus();
          }
        }}
      >
      <div className="flex flex-col h-full w-full overflow-hidden border-r border-[#1f1f1f]">

        {/* Terminal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#1f1f1f] shrink-0 z-30">
          <div className="flex gap-1.5 flex-1">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="font-mono text-[9px] md:text-[11px] text-[#777575] tracking-widest text-center flex-1 font-bold uppercase">
            TERMINAL — PROJECTS_INDEX
          </div>
          <div className="flex-1 flex justify-end items-center gap-2 font-mono text-[9px] text-[#777575] tracking-widest pl-2">
            <span className="w-2 h-2 rounded-full bg-[#00fc40]" />
            <span className="hidden sm:inline">ONLINE</span>
          </div>
        </div>

        {/* Split Pane */}
        <div className={`flex-1 flex flex-col overflow-hidden relative bg-[#0a0a0a] ${isDragging ? 'select-none pointer-events-none' : ''}`}>
          
          {/* Top Content Area */}
          <div
            ref={topPaneRef}
            style={{ height: `${topHeight}px` }}
            className="w-full shrink-0 overflow-hidden bg-[#0a0a0a]"
          >
            <div className="px-4 md:px-8 pt-3 pb-8 h-full overflow-y-auto overflow-x-hidden select-none transition-all custom-scrollbar relative">
              
              {/* Back Button positioned to the RIGHT of ASCII as per user request */}
              <div 
                onClick={() => {
                  setHistory(prev => [...prev, { out: "Navigating to ROOT...", isSystem: true }]);
                  setTimeout(() => navigate('/'), 400);
                }}
                className="absolute top-6 right-10 z-50 flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' } as any} className="opacity-80 group-hover:opacity-100 transition-opacity">
                    <path d="M10 32L34 8V22H54V42H34V56L10 32Z" fill="white" />
                    <rect x="36" y="24" width="12" height="16" fill="rgba(0,0,0,0.2)" />
                  </svg>
                  <div className="absolute inset-0 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-mono text-[10px] md:text-[12px] text-[#777575] text-center group-hover:bg-white group-hover:text-black px-2 py-0.5 transition-all uppercase tracking-widest leading-none">
                  BACK.EXE
                </span>
              </div>

              <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#777575] flex flex-row items-center justify-between gap-1 mb-2 pr-28">
                <div className="flex sm:gap-4 flex-col sm:flex-row">
                  <span>[SYSTEM]: Project Modules Active</span>
                  <span className="text-white">Login: {lastLogin}</span>
                </div>
                <span className="text-[#a1a1a1] hidden md:block text-[10px]">Type 'help' for commands.</span>
              </div>

              <div className="ascii-title-filled font-mono text-[8.5px] sm:text-[10.5px] lg:text-[13px] leading-tight mb-8 select-none">
                <pre>{PROJECTS_ASCII}</pre>
              </div>

              {/* Grid with Grid-Cols 2 for 2 per row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl pb-8">
                {PROJECTS_DATA.map((p) => (
                  <ProjectCard 
                    key={p.id} 
                    project={p} 
                    onClick={() => {
                      setSelectedProject(p);
                      setHistory(prev => [...prev, { cmd: `run ${p.sysName.toLowerCase()}`, out: `Initializing graphical display for ${p.sysName}...` }]);
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Handler */}
          <div
            onMouseDown={startDragging}
            className="w-full h-1.5 bg-[#1f1f1f] cursor-row-resize hover:bg-[#333] transition-colors shrink-0 z-50 flex items-center justify-center pointer-events-auto"
          >
            <div className="w-12 h-[1px] bg-[#444] rounded-full" />
          </div>

          {/* Short Terminal at Bottom */}
          <div className="flex-1 overflow-y-auto bg-[#0a0a0a] scrollbar-hide">
            <div className="px-4 md:px-8 py-4 font-mono text-[12px] md:text-[14px] flex flex-col gap-1.5 w-full">
              {history.map((h, i) => (
                <div key={i} className="w-full animate-[fadeIn_0.2s_ease-out]">
                  <div className="flex items-center gap-2">
                    <span className="text-white shrink-0 font-bold">admin@shourya:~/projects$</span>
                    <span className="text-gray-300 relative top-0.5">{h.cmd}</span>
                  </div>
                  {h.out && (
                    <div className={`${h.isSystem ? 'text-[#a1faff]' : 'text-[#888888]'} mt-0.5 ml-0 sm:ml-4 w-full whitespace-pre-wrap`}>
                      {h.out}
                    </div>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} className="shrink-0 h-4" />
            </div>
          </div>

          {/* Interaction */}
          <form onSubmit={handleCommand} className="px-4 md:px-8 py-4 md:py-5 border-t border-[#1f1f1f] font-mono text-[12px] md:text-[14px] flex items-center gap-2 shrink-0 relative bg-[#0a0a0a] z-30">
            <span className="text-white font-bold whitespace-nowrap">admin@shourya:~/projects$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none outline-none text-white grow relative top-0.5 min-w-0 font-mono tracking-wider caret-white"
              autoFocus={!selectedProject}
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        </div>
      </div>
      <RightSidebar />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f1f1f; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #333; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => {
          setSelectedProject(null);
          setTimeout(() => inputRef.current?.focus(), 50);
        }} />
      )}

      {/* Mobile contact overlay (outside desktop grid so it renders on mobile) */}
      <RightSidebar asMobileOverlay />
    </>
  );
}
