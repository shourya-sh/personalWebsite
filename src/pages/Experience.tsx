import React, { useState, useEffect, useRef, useCallback } from 'react';
import RightSidebar from '@/components/RightSidebar';
import { useSidebar } from '@/context/SidebarContext';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail, Send, Link2, Calendar, Briefcase, TerminalSquare } from 'lucide-react';

const EXPERIENCE_ASCII = String.raw`
    _______  __ ____  __________  ___________   ______________
   / ____/ |/ // __ \/ ____/ __ \/  _/ ____/ | / / ____/ ____/
  / __/  |   // /_/ / __/ / /_/ // // __/ /  |/ / /   / __/   
 / /___ /   |/ ____/ /___/ _, _// // /___/ /|  / /___/ /___   
/_____//_/|_/_/   /_____/_/ |_/___/_____/_/ |_/\____/_____/   
`;

function ExperienceItem({ role, company, period, description, theme, tag, isLast }: { 
  role: string, 
  company: string, 
  period: string, 
  description: string, 
  theme: 'primary' | 'secondary' | 'tertiary' | 'accent',
  tag: string,
  isLast?: boolean
}) {
  const getThemeStyles = () => {
    switch(theme) {
      case 'secondary': return {
        node: 'bg-[#00fc40] shadow-[0_0_10px_rgba(0,252,64,0.5)]',
        line: 'from-[#00fc40]/50 to-transparent',
        tagBg: 'bg-[#00fc40]/10 text-[#00fc40] border border-[#00fc40]/20',
        companyText: 'text-[#00fc40]',
        glow: 'shadow-[0_0_20px_rgba(0,252,64,0.1)]'
      };
      case 'tertiary': return {
        node: 'bg-[#ac89ff] shadow-[0_0_10px_rgba(172,137,255,0.5)]',
        line: 'from-[#ac89ff]/50 to-transparent',
        tagBg: 'bg-[#ac89ff]/10 text-[#ac89ff] border border-[#ac89ff]/20',
        companyText: 'text-[#ac89ff]',
        glow: 'shadow-[0_0_20px_rgba(172,137,255,0.1)]'
      };
      case 'accent': return {
        node: 'bg-[#ff5f57] shadow-[0_0_10px_rgba(255,95,87,0.5)]',
        line: 'from-[#ff5f57]/50 to-transparent',
        tagBg: 'bg-[#ff5f57]/10 text-[#ff5f57] border border-[#ff5f57]/20',
        companyText: 'text-[#ff5f57]',
        glow: 'shadow-[0_0_20px_rgba(255,95,87,0.1)]'
      };
      default: return {
        node: 'bg-[#a1faff] shadow-[0_0_10px_rgba(161,250,255,0.5)]',
        line: 'from-[#a1faff]/50 to-transparent',
        tagBg: 'bg-[#a1faff]/10 text-[#a1faff] border border-[#a1faff]/20',
        companyText: 'text-[#a1faff]',
        glow: 'shadow-[0_0_20px_rgba(161,250,255,0.1)]'
      };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={`flex gap-3 xl:gap-6 group transition-all duration-500 ${isLast ? '' : 'mb-4 xl:mb-8'}`}>
      <div className="flex flex-col items-center shrink-0 w-4 xl:w-5">
        <div className={`w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-full mt-3 xl:mt-4 shrink-0 transition-all duration-300 ${styles.node}`} />
        {!isLast && <div className={`w-[2px] grow bg-gradient-to-b mt-2 mb-[-16px] xl:mb-[-32px] ${styles.line}`} />}
      </div>
      
      <div className={`flex-1 bg-[#101010]/80 rounded-xl overflow-hidden border border-[#1f1f1f] group-hover:border-[#1f1f1f]/80 group-hover:bg-[#131313] transition-all duration-300 ${styles.glow} backdrop-blur-sm relative`}>
        <div className="absolute top-0 right-0 w-8 h-8 opacity-10 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        
        {/* MacOS-style Window Decorator (Mini) */}
        <div className="px-3 xl:px-4 py-1.5 xl:py-2 bg-[#181818] border-b border-[#1f1f1f] flex gap-1.5 items-center">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]/40" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]/40" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]/40" />
          <span className="ml-2 font-mono text-[8px] text-[#494847] tracking-[0.2em] font-bold uppercase">{tag}</span>
        </div>

        <div className="p-3 xl:p-5 2xl:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-2 xl:mb-3 gap-1.5">
            <h3 className="font-display text-[15px] xl:text-[16px] font-bold text-white tracking-wide group-hover:text-[#a1faff] transition-colors">{role}</h3>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#1a1a1a] rounded border border-[#2a2a2a] group-hover:border-[#a1faff]/20 transition-all shadow-sm shrink-0">
              <Calendar size={10} className="text-[#a1faff]/60" />
              <span className="text-[9px] xl:text-[10px] text-[#777575] font-mono whitespace-nowrap uppercase tracking-tighter">{period}</span>
            </div>
          </div>
          
          <p className={`font-mono text-[10px] xl:text-[11px] mb-2.5 xl:mb-4 font-bold border-l-2 pl-2.5 xl:pl-3 ${styles.companyText} border-current opacity-80 uppercase tracking-widest`}>
            {company}
          </p>
          
          <p className="font-mono text-[11px] xl:text-[11.5px] text-[#a1a1a1] leading-relaxed max-w-4xl italic opacity-90 border-t border-[#1f1f1f]/50 pt-2.5 xl:pt-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
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
  const [lastLogin, setLastLogin] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const topPaneRef = useRef<HTMLDivElement>(null);

  const [topHeight, setTopHeight] = useState(500);
  const [minTopHeight, setMinTopHeight] = useState(500);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setLastLogin(new Date().toString().split(' GMT')[0]);
    
    // Auto-measure content height on load
    const timer = setTimeout(() => {
      if (topPaneRef.current) {
        const h = topPaneRef.current.scrollHeight;
        setTopHeight(h);
        setMinTopHeight(h);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDrag = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newHeight = Math.max(minTopHeight, Math.min(e.clientY - 40, window.innerHeight - 200));
      setTopHeight(newHeight);
    }
  }, [isDragging, minTopHeight]);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

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

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdText = input.trim();
    const args = cmdText.toLowerCase().split(' ').filter(Boolean);
    const command = args[0];

    let output: React.ReactNode | string = '';

    switch (command) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1">
            <div className="text-[#a1faff] mb-1 italic">Experience Shell v1.0.2</div>
            <div>• <span className="text-white">ls</span> - List historical records</div>
            <div>• <span className="text-white">clear</span> - Purge log buffer</div>
            <div>• <span className="text-white">back</span> - Exit to root</div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 max-w-sm">
            <div className="text-[#00fc40]">ey_intern.log</div>
            <div className="text-[#a1faff]">mathnasium.log</div>
            <div className="text-[#ac89ff]">zebra_robotics.log</div>
            <div className="text-[#ff5f57]">msba_umpire.log</div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'back':
        setHistory(prev => [...prev, { out: "Navigating to ROOT...", isSystem: true }]);
        setTimeout(() => navigate('/'), 400);
        return;
      default:
        output = `bash: ${command}: command execution failure`;
    }

    setHistory([...history, { cmd: cmdText, out: output }]);
    setInput('');
  };

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
          <span className="font-mono text-[9px] text-[#777575] tracking-widest font-bold uppercase flex-1 min-w-0 truncate text-center">EXPERIENCE LOG</span>
          <div className="flex gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="font-mono text-[9px] text-[#777575] mb-4 leading-relaxed">
            <span>[SYSTEM]: Experience Modules Active &nbsp;·&nbsp; </span>
            <span className="text-white">{lastLogin || 'initiating...'}</span>
          </div>
          <div className="flex flex-col gap-0 w-full pb-4">
            <ExperienceItem
              theme="secondary" tag="RISK_CONSULTANT"
              role="AI Risk Consultant" company="@ EY"
              period="May 2026 - Present"
              description="Assist in evaluating AI enabled systems and related controls as part of Technology Risk and Assurance engagements. Focused on technology risk management and security governance."
            />
            <ExperienceItem
              theme="primary" tag="MATH_INSTRUCTOR"
              role="Mathematics Instructor" company="@ Mathnasium"
              period="Mar 2024 - Dec 2025"
              description="Worked with students of all ages to strengthen math skills, help with schoolwork, and build confidence through one-on-one support."
            />
            <ExperienceItem
              theme="tertiary" tag="ROBOTICS_LEAD"
              role="Robotics Instructor" company="@ Zebra Robotics"
              period="Mar 2023 - Mar 2024"
              description="Taught students how to build and program LEGO robots through hands-on lessons and projects. Developed curriculum for STEM enrichment and competitive robotics teams."
            />
            <ExperienceItem
              theme="accent" tag="UMPIRE_OFFICIAL"
              role="Baseball Umpire" company="@ MSBA"
              period="2022 - Present"
              description="Officiated competitive baseball games, making quick decisions and keeping games running smoothly in a fast-paced environment."
              isLast
            />
          </div>
        </div>

        {/* Terminal input */}
        <form onSubmit={handleCommand} className="px-4 py-3 border-t border-[#1f1f1f] font-mono text-[12px] flex items-center gap-2 shrink-0 bg-[#0a0a0a]">
          <span className="text-white font-bold shrink-0 text-[10px] whitespace-nowrap">admin@shourya:~/experience$</span>
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
        onClick={(e) => { if (!(e.target as HTMLElement).closest('input, textarea, button, a')) inputRef.current?.focus(); }}
      >
      {/* Main Content - Terminal Full Screen */}
      <div className="flex flex-col h-full w-full overflow-hidden border-r border-[#1f1f1f]">

        {/* Terminal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#1f1f1f] shrink-0 z-30">
          <div className="flex gap-1.5 flex-1">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="font-mono text-[9px] md:text-[11px] text-[#777575] tracking-widest text-center flex-1 font-bold uppercase">
            TERMINAL — EXPERIENCE LOG
          </div>
          <div className="flex-1 flex justify-end items-center gap-2 font-mono text-[9px] text-[#777575] tracking-widest pl-2">
            <span className="w-2 h-2 rounded-full bg-[#00fc40]" />
            <span className="hidden sm:inline">ONLINE</span>
          </div>
        </div>

        {/* Terminal Body Split Pane Container */}
        <div className={`flex-1 flex flex-col overflow-hidden relative bg-[#0a0a0a] ${isDragging ? 'select-none' : ''}`}>
          
          {/* Top Desktop Pane */}
          <div
            ref={topPaneRef}
            style={{ height: `${topHeight}px` }}
            className="w-full shrink-0 overflow-hidden bg-[#0a0a0a]"
          >
            <div className="px-4 md:px-8 pt-3 pb-3 h-full overflow-y-auto overflow-x-hidden select-none transition-all custom-scrollbar relative">
              {/* Back Button - Absolute Positioned */}
              <div 
                onClick={() => {
                  setHistory(prev => [...prev, { out: "Navigating to ROOT...", isSystem: true }]);
                  setTimeout(() => navigate('/'), 400);
                }}
                className="absolute top-6 right-10 z-50 flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }} className="opacity-80 group-hover:opacity-100 transition-opacity">
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
                  <span>[SYSTEM]: Experience Modules Active</span>
                  <span className="text-white">Login: {lastLogin || 'initiating...'}</span>
                </div>
                <span className="text-[#a1a1a1] hidden md:block text-[10px]">Type 'help' for commands.</span>
              </div>

              <div className="ascii-title-filled font-mono text-[8.5px] sm:text-[10.5px] lg:text-[13px] leading-tight mb-4 select-none sm:block">
                <pre>{EXPERIENCE_ASCII}</pre>
              </div>

              {/* Experience Timeline */}
              <div className="flex flex-col gap-0 mt-4 w-full max-w-6xl pb-12">
                <ExperienceItem 
                  theme="secondary"
                  tag="RISK_CONSULTANT"
                  role="AI Risk Consultant"
                  company="@ EY"
                  period="May 2026 - Present"
                  description="Assist in evaluating AI enabled systems and related controls as part of Technology Risk and Assurance engagements. Focused on technology risk management and security governance."
                />
                <ExperienceItem 
                  theme="primary"
                  tag="MATH_INSTRUCTOR"
                  role="Mathematics Instructor"
                  company="@ Mathnasium"
                  period="Mar 2024 - Dec 2025"
                  description="Worked with students of all ages to strengthen math skills, help with schoolwork, and build confidence through one-on-one support. Developed tailored learning plans and assessment strategies."
                />
                <ExperienceItem 
                  theme="tertiary"
                  tag="ROBOTICS_LEAD"
                  role="Robotics Instructor"
                  company="@ Zebra Robotics"
                  period="Mar 2023 - Mar 2024"
                  description="Taught students how to build and program LEGO robots through hands-on lessons and projects. Developed curriculum for STEM enrichment and competitive robotics teams."
                />
                <ExperienceItem 
                  theme="accent"
                  tag="UMPIRE_OFFICIAL"
                  role="Baseball Umpire"
                  company="@ MSBA"
                  period="2022 - Present"
                  description="Officiated competitive baseball games, making quick decisions and keeping games running smoothly in a fast-paced environment. Managed player and coach interactions with high integrity."
                  isLast
                />
              </div>
            </div>
          </div>

          {/* Draggable Resizer Handle */}
          <div
            onMouseDown={startDragging}
            className="w-full h-1.5 bg-[#1f1f1f] cursor-row-resize hover:bg-[#333] transition-colors shrink-0 z-50 flex items-center justify-center opacity-80 pointer-events-auto"
          >
            <div className="w-12 h-[1px] bg-[#555] rounded-full" />
          </div>

          {/* Bottom Pane - Terminal History */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col w-full bg-[#0a0a0a] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="px-4 md:px-8 py-4 font-mono text-[12px] md:text-[14px] flex flex-col gap-1.5 w-full">
              {history.map((h, i) => (
                <div key={i} className="w-full animate-[fadeIn_0.2s_ease-out]">
                  <div className="flex items-center gap-2">
                    <span className="text-white shrink-0 font-bold">admin@shourya:~/experience$</span>
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

          {/* Terminal Interaction */}
          <form onSubmit={handleCommand} className="px-4 md:px-8 py-4 md:py-5 border-t border-[#1f1f1f] font-mono text-[12px] md:text-[14px] flex items-center gap-2 shrink-0 relative bg-[#0a0a0a] z-30">
            <span className="text-white font-bold whitespace-nowrap">admin@shourya:~/experience$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none outline-none text-white grow relative top-0.5 min-w-0 font-mono tracking-wider caret-white"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        </div>
      </div>

      <RightSidebar />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f1f1f; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #333; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
      </div>

      {/* Mobile contact overlay (outside desktop grid so it renders on mobile) */}
      <RightSidebar asMobileOverlay />
    </>
  );
}
