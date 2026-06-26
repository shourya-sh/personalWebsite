import React, { useState, useEffect, useRef, useCallback } from 'react';
import RightSidebar from '@/components/RightSidebar';
import { useSidebar } from '@/context/SidebarContext';
import { Github, Linkedin, Instagram, Mail, GraduationCap, Award, BookOpen, Send, Link2, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SCROLLBAR_STYLE = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #111;
    border-radius: 10px;
    border: 1px solid #1a1a1a;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #1a1a1a;
  }
`;

function TypingText({ text, delay = 20, onComplete }: { text: string, delay?: number, onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay, onComplete]);

  return <span>{displayed}</span>;
}

function EduEntry({ label, subtitle, period, description, themeColor, institutionIcon: Icon, onClick, isMini, showBadge }: any) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#131313]/60 border border-[#1f1f1f] rounded-lg p-5 sm:p-7 hover:border-[#a1faff]/40 transition-all group overflow-hidden relative cursor-pointer ${isMini ? 'flex-1 min-w-0' : 'w-full'}`}
    >
      {showBadge && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-[#a1faff]/10 border-b border-l border-[#a1faff]/30 rounded-bl text-[#a1faff] text-[8px] sm:text-[10px] font-mono tracking-widest uppercase z-10 flex items-center gap-1.5 backdrop-blur-md">
          <div className="w-1 h-1 rounded-full bg-[#a1faff] animate-pulse" />
          DOUBLE DEGREE SYNC
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded border border-[#1f1f1f] overflow-hidden relative bg-black group-hover:scale-105 transition-transform duration-500 shadow-inner flex items-center justify-center`}>
          <div className={`absolute inset-0 opacity-0 bg-gradient-to-br ${themeColor}`} />
          {typeof Icon === 'string' ? (
            <img src={Icon} className="w-full h-full object-contain p-1 z-10 opacity-80 group-hover:opacity-100 transition-opacity" alt={label} />
          ) : (
            <Icon className="absolute inset-0 m-auto text-[#a1faff]/40 group-hover:text-[#a1faff] transition-colors" size={32} />
          )}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[length:100%_2px,3px_100%]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
            <h3 className="text-[#a1faff] font-bold text-[12px] sm:text-[14px] tracking-[0.3em] uppercase sm:min-h-[3.5rem] flex items-start">{label}</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#1a1a1a] rounded border border-[#2a2a2a] group-hover:border-[#a1faff]/20 transition-all">
              <Calendar size={12} className="text-[#a1faff]/60" />
              <span className="text-[10px] text-[#777575] font-mono whitespace-nowrap uppercase tracking-tighter">{period}</span>
            </div>
          </div>
          <p className="text-white text-[15px] sm:text-[19px] font-medium mb-4 tracking-wide leading-tight">{subtitle}</p>
          <div className="flex gap-3 items-start bg-black/30 p-3 sm:p-4 rounded border border-[#1f1f1f]/60 group-hover:bg-black/40 transition-all">
            <div className="mt-1.5 w-2 h-2 rounded-full bg-[#a1faff]/60 shrink-0 shadow-[0_0_10px_#a1faff]" />
            <p className="text-[#cccccc] text-[12px] sm:text-[14px] leading-relaxed italic opacity-90">{description}</p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#1f1f1f] group-hover:border-[#a1faff]/30 transition-all rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#1f1f1f] group-hover:border-[#a1faff]/30 transition-all rounded-bl-lg" />
    </div>
  );
}


const EDUCATION_ASCII = String.raw`
    __________  __  ___________  ______________  _   __
   / ____/ __ \/ / / / ____/   |/_  __/  _/ __ \/ | / /
  / __/ / / / / / / / /   / /| | / /  / // / / /  |/ / 
 / /___/ /_/ / /_/ / /___/ ___ |/ / _/ // /_/ / /|  /  
/_____/_____/\____/\____/_/  |_/_/ /___/\____/_/ |_/   
`;

export default function Education() {
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

    // Auto-measure content height on exactly paint
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

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopDragging);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, handleMouseMove, stopDragging]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdText = input.trim();
    const args = cmdText.toLowerCase().split(' ').filter(Boolean);
    const command = args[0];
    const target = args[1];

    let output: React.ReactNode | string = '';
    let isSpecCommand = false;

    switch (command) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1">
            <div className="text-[#a1faff] mb-1">Available System Commands:</div>
            <div>• <span className="text-white">ls</span> - List educational archives</div>
            <div>• <span className="text-white">cat [school]</span> - Read school details (waterloo, laurier, woodlands)</div>
            <div>• <span className="text-white">clear</span> - Clear terminal history</div>
            <div>• <span className="text-white">back</span> - Navigate to Home</div>
            <div className="text-[#a1faff] mt-1">Hint: Try 'cat waterloo' for degree info.</div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 max-w-sm">
            <div className="text-white">waterloo.edu</div>
            <div className="text-[#777575]">Laurier.edu</div>
            <div className="text-white">Woodlands.edu</div>
            <div className="text-[#777575]">Back.exe</div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'cd':
        if (target === '..' || target === '../') {
          setHistory(prev => [...prev, { out: "Navigating to ROOT...", isSystem: true }]);
          setTimeout(() => navigate('/'), 400);
        }
        return;
      case 'cd..':
      case 'cd../':
      case '..':
      case 'back':
        setHistory(prev => [...prev, { out: "Navigating to ROOT...", isSystem: true }]);
        setTimeout(() => navigate('/'), 400);
        return;
      case 'cat':
        isSpecCommand = true;
        if (target === 'waterloo' || target === 'waterloo.edu') {
          output = (
            <div className="flex flex-col gap-2">
              <div className="text-white font-bold text-sm underline">UNIVERSITY OF WATERLOO</div>
              <div className="grid grid-cols-[80px_1fr] gap-x-4 text-[13px]">
                <div className="text-[#a1faff]">DEGREE:</div>
                <div className="text-white">Computer Science (Honours)</div>
                <div className="text-[#a1faff]">PERIOD:</div>
                <div className="text-white">Sept 2025 — April 2030</div>
                <div className="text-[#a1faff]">FOCUS:</div>
                <div className="text-[#cccccc]">Focused on software development, algorithms, and systems design, with strong emphasis on real-world applications through hands-on projects and problem solving.</div>
              </div>
            </div>
          );
        } else if (target === 'laurier' || target === 'laurier.edu') {
          output = (
            <div className="flex flex-col gap-2">
              <div className="text-white font-bold text-sm underline">WILFRID LAURIER UNIVERSITY</div>
              <div className="grid grid-cols-[80px_1fr] gap-x-4 text-[13px]">
                <div className="text-[#a1faff]">DEGREE:</div>
                <div className="text-white">Business Administration (Honours)</div>
                <div className="text-[#a1faff]">PERIOD:</div>
                <div className="text-white">Sept 2025 — April 2030</div>
                <div className="text-[#a1faff]">FOCUS:</div>
                <div className="text-[#cccccc]">Covers core business fundamentals including finance, strategy, and operations, with a focus on decision-making, leadership, and real-world business applications.</div>
              </div>
            </div>
          );
        } else if (target === 'woodlands' || target === 'woodlands.edu') {
          output = (
            <div className="flex flex-col gap-2">
              <div className="text-white font-bold text-sm underline">THE WOODLANDS SECONDARY SCHOOL</div>
              <div className="grid grid-cols-[80px_1fr] gap-x-4 text-[13px]">
                <div className="text-[#a1faff]">DIPLOMA:</div>
                <div className="text-white">Secondary Education Diploma</div>
                <div className="text-[#a1faff]">PERIOD:</div>
                <div className="text-white">Sept 2021 — June 2025</div>
                <div className="text-[#a1faff]">FOCUS:</div>
                <div className="text-[#cccccc]">A selective program for high-achieving students emphasizing advanced academics, critical thinking, and enriched coursework across subjects.</div>
              </div>
            </div>
          );
        } else {
          output = target ? `cat: ${target}: No such file or archive` : 'cat: missing operand';
        }
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for options.`;
    }

    setHistory(prev => [...prev, { cmd: cmdText, out: output, isSystem: isSpecCommand }]);
    setInput('');
  };

  return (
    <>
      <style>{SCROLLBAR_STYLE}</style>

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
          <span className="font-mono text-[9px] text-[#777575] tracking-widest font-bold uppercase flex-1 min-w-0 truncate text-center">EDUCATION</span>
          <div className="flex gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
          </div>
        </div>

        {/* Scrollable education cards */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="font-mono text-[9px] text-[#777575] mb-4 leading-relaxed">
            <span>[SYSTEM]: Education Archives &nbsp;·&nbsp; </span>
            <span className="text-white">{lastLogin || 'initiating...'}</span>
          </div>
          <div className="flex flex-col gap-6 w-full pb-4">
            <div className="flex flex-col gap-4 w-full">
              <EduEntry
                label="University of Waterloo"
                subtitle="Computer Science (BCS)"
                period="SEP 2025 — 2030"
                description="Focused on software development, algorithms, and systems design, with strong emphasis on real-world applications through hands-on projects and problem solving."
                themeColor="from-black to-black"
                institutionIcon="/waterloo.png"
                isMini={false}
                showBadge={true}
                onClick={() => handleCommand({ target: { value: 'cat waterloo' }, preventDefault: () => {} } as any)}
              />
              <EduEntry
                label="Lazaridis School of Business (Laurier)"
                subtitle="Business Administration (BBA)"
                period="SEP 2025 — 2030"
                description="Covers core business fundamentals including finance, strategy, and operations, with a focus on decision-making, leadership, and real-world business applications."
                themeColor="from-black to-black"
                institutionIcon="/laz.png"
                isMini={false}
                showBadge={true}
                onClick={() => handleCommand({ target: { value: 'cat laurier' }, preventDefault: () => {} } as any)}
              />
              <EduEntry
                label="The Woodlands Secondary"
                subtitle="Diploma (OSSD) with Distinction"
                period="2021 — 2025"
                description="A selective program for high-achieving students emphasizing advanced academics, critical thinking, and enriched coursework across subjects."
                themeColor="from-black to-black"
                institutionIcon="/woods.png"
                isMini={false}
                onClick={() => handleCommand({ target: { value: 'cat woodlands' }, preventDefault: () => {} } as any)}
              />
            </div>
          </div>
        </div>

        {/* Terminal input */}
        <form onSubmit={handleCommand} className="px-4 py-3 border-t border-[#1f1f1f] font-mono text-[12px] flex items-center gap-2 shrink-0 bg-[#0a0a0a]">
          <span className="text-white font-bold shrink-0 text-[10px] whitespace-nowrap">admin@shourya:~/education$</span>
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
            TERMINAL — EDUCATION SH
          </div>
          <div className="flex-1 flex justify-end items-center gap-2 font-mono text-[9px] text-[#777575] tracking-widest pl-2">
            <span className="w-2 h-2 rounded-full bg-[#00fc40]" />
            <span className="hidden sm:inline">ONLINE</span>
          </div>
        </div>

        {/* Terminal Body Split Pane Container */}
        <div className={`flex-1 min-h-0 relative flex flex-col ${isDragging ? 'select-none pointer-events-none' : ''}`}>

          {/* Top Desktop Pane */}
          <div
            ref={topPaneRef}
            style={{ height: `${topHeight}px` }}
            className="w-full shrink-0 overflow-hidden bg-[#0a0a0a]"
          >
            <div className="px-4 md:px-8 pt-3 pb-3 h-full overflow-y-auto overflow-x-hidden select-none transition-all custom-scrollbar relative">
              {/* Back Button - Absolute Positioned to avoid layout shift */}
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
                  <span>[SYSTEM]: Education Archives</span>
                  <span className="text-white">Login: {lastLogin || 'initiating...'}</span>
                </div>
                <span className="text-[#a1a1a1] hidden md:block text-[10px]">Type 'help' for commands.</span>
              </div>

              <div className="ascii-title-filled font-mono text-[8.5px] sm:text-[10.5px] lg:text-[13px] leading-tight mb-4 select-none sm:block">
                <pre>{EDUCATION_ASCII}</pre>
              </div>
              {/* Education Timeline Body 4.0 */}
              <div className="flex flex-col gap-6 mt-4 w-full max-w-6xl pb-12">
                {/* Row 1: Double Degree (Side-by-Side) */}
                <div className="flex flex-col sm:flex-row gap-6 w-full">
                  <EduEntry
                    label="University of Waterloo"
                    subtitle="Computer Science (BCS)"
                    period="SEP 2025 — 2030"
                    description="Focused on software development, algorithms, and systems design, with strong emphasis on real-world applications through hands-on projects and problem solving."
                    themeColor="from-black to-black"
                    institutionIcon="/waterloo.png"
                    isMini={true}
                    showBadge={true}
                    onClick={() => handleCommand({ target: { value: 'cat waterloo' }, preventDefault: () => { } } as any)}
                  />
                  <EduEntry
                    label="Lazaridis School of Business and Economics (Laurier)"
                    subtitle="Business Administration (BBA)"
                    period="SEP 2025 — 2030"
                    description="Covers core business fundamentals including finance, strategy, and operations, with a focus on decision-making, leadership, and real-world business applications."
                    themeColor="from-black to-black"
                    institutionIcon="/laz.png"
                    isMini={true}
                    showBadge={true}
                    onClick={() => handleCommand({ target: { value: 'cat laurier' }, preventDefault: () => { } } as any)}
                  />
                </div>

                {/* Row 2: Secondary School (Centered) */}
                <div className="flex justify-center w-full mt-2">
                  <div className="w-full sm:w-[calc(50%-12px)]">
                    <EduEntry
                      label="The Woodlands Secondary"
                      subtitle="Diploma (OSSD) with Distinction"
                      period="2021 — 2025"
                      description="A selective program for high-achieving students emphasizing advanced academics, critical thinking, and enriched coursework across subjects."
                      themeColor="from-black to-black"
                      institutionIcon="/woods.png"
                      isMini={false}
                      onClick={() => handleCommand({ target: { value: 'cat woodlands' }, preventDefault: () => { } } as any)}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Draggable Resizer Handle */}
          <div
            onMouseDown={startDragging}
            className="absolute left-0 right-0 h-1.5 bg-[#1a1a1a] hover:bg-[#252525] cursor-row-resize transition-colors flex items-center justify-center group z-30"
            style={{ top: `${topHeight}px` }}
          >
            <div className="w-8 h-1 bg-[#2a2a2a] rounded-full group-hover:bg-[#3a3a3a] transition-colors" />
          </div>

          {/* Terminal Display */}
          <div className="flex-1 min-h-0 bg-[#0a0a0a] flex flex-col pt-1.5 shadow-[inset_0_20px_40px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 font-mono text-[12px] md:text-[14px] flex flex-col gap-1.5 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {history.map((h, i) => (
                <div key={i} className="w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-white shrink-0 font-bold">admin@shourya:~/education$</span>
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

            {/* Terminal Input */}
            <form onSubmit={handleCommand} className="px-4 md:px-8 py-4 md:py-5 border-t border-[#1f1f1f] font-mono text-[12px] md:text-[14px] flex items-center gap-2 shrink-0 relative bg-[#0a0a0a] z-30">
              <span className="text-white font-bold whitespace-nowrap">admin@shourya:~/education$</span>
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
      </div>

      <RightSidebar />

      </div>

      {/* Mobile contact overlay (outside desktop grid so it renders on mobile) */}
      <RightSidebar asMobileOverlay />
    </>
  );
}
