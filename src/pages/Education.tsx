import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Instagram, Mail, GraduationCap, Award, BookOpen, Send, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

function EduIcon({ label, ext, imageKey, onClick }: { label: string, ext: string, imageKey: string, onClick: () => void }) {
  const isBack = imageKey === 'back';

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-3 cursor-pointer group p-3 border border-transparent hover:border-[#ffffff10] border-dashed rounded-lg transition-all"
    >
      <div className="relative w-16 h-16 md:w-24 md:h-24 group-hover:-translate-y-1 transition-transform flex items-center justify-center">
        {isBack ? (
          <div className="w-full h-full p-2 flex items-center justify-center grayscale-[0.3] group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100">
            <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
              <path d="M10 32L34 8V20H54V44H34V56L10 32Z" fill="#ffffff" stroke="white" strokeWidth="2" />
              <rect x="36" y="22" width="16" height="20" fill="rgba(0,0,0,0.15)" />
            </svg>
          </div>
        ) : (
          <img
            src={`/retro_icons/${imageKey}.png?v=${Date.now()}`}
            alt={label}
            className="w-full h-full object-contain mix-blend-screen grayscale-[0.3] brightness-110"
            style={{ imageRendering: 'pixelated' } as any}
          />
        )}
      </div>
      <span className="font-mono text-[10px] md:text-[12px] text-gray-400 text-center group-hover:bg-white group-hover:text-black px-1.5 py-0.5 whitespace-nowrap">
        {isBack ? 'BACK.EXE' : `${label}.${ext}`}
      </span>
    </div>
  );
}

function ContactCard({ icon, iconBg, title, detail, actionColor, href }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#131313] rounded-lg border border-[#1f1f1f] p-4 flex flex-col justify-center gap-3 hover:border-[#494847] transition-all duration-300 hover:bg-[#151515] hover:scale-[1.02] hover:shadow-md cursor-pointer group overflow-hidden">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${iconBg} transition-colors group-hover:bg-opacity-20`}>
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-[13px] font-bold text-white uppercase tracking-wider truncate group-hover:text-white transition-colors">{title}</h3>
          <p className="font-mono text-[9.5px] text-[#777575] mt-0.5 truncate group-hover:text-[#a1a1a1] transition-colors relative top-[1px]">{detail}</p>
        </div>
      </div>
    </a>
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
                <div className="text-[#cccccc]">Advanced algorithms, software architecture, and computer science fundamentals.</div>
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
                <div className="text-[#cccccc]">Double degree program bridging technology and executive business strategy.</div>
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
                <div className="text-[#cccccc]">Built foundational skills in mathematics and computer sciences, participating in collaborative STEM initiatives.</div>
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
    <div className="min-h-full h-full grid grid-cols-1 xl:grid-cols-[1fr_260px] bg-[#0a0a0a]" onClick={() => inputRef.current?.focus()}>

      {/* Main Content - Terminal Full Screen */}
      <div className="flex flex-col h-full w-full overflow-hidden border-r border-[#1f1f1f]">

        {/* Terminal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#1f1f1f] shrink-0 z-30">
          <div className="flex gap-1.5 flex-1">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="font-mono text-[9px] md:text-[11px] text-[#777575] tracking-widest text-center flex-1 font-bold">
            TERMINAL — EDUCATION
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
            <div className="px-4 md:px-8 pt-3 pb-3 h-full overflow-y-auto overflow-x-hidden scrollbar-hide select-none transition-all">
              <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#777575] flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex sm:gap-4 flex-col sm:flex-row">
                  <span>[SYSTEM]: Education Archives</span>
                  <span className="text-white">Login: {lastLogin || 'initiating...'}</span>
                </div>
                <span className="text-[#a1a1a1] hidden md:block">Type 'help' for commands.</span>
              </div>

              <div className="text-gray-300 font-mono text-[8.5px] sm:text-[10.5px] lg:text-[13px] leading-tight mb-6 select-none sm:block">
                <pre>{EDUCATION_ASCII}</pre>
              </div>

              {/* Education Grid */}
              <div className="flex flex-wrap gap-4 md:gap-8 max-w-4xl px-2 mt-1">
                <EduIcon label="BACK" ext="exe" imageKey="back" onClick={() => {
                  setHistory(prev => [...prev, { out: "Navigating to ROOT...", isSystem: true }]);
                  setTimeout(() => navigate('/'), 400);
                }} />
                <EduIcon label="WATERLOO" ext="edu" imageKey="retro_grad_cap" onClick={() => handleCommand({ target: { value: 'cat waterloo' }, preventDefault: () => { } } as any)} />
                <EduIcon label="LAURIER" ext="edu" imageKey="retro_id_badge" onClick={() => handleCommand({ target: { value: 'cat laurier' }, preventDefault: () => { } } as any)} />
                <EduIcon label="WOODLANDS" ext="edu" imageKey="education" onClick={() => handleCommand({ target: { value: 'cat woodlands' }, preventDefault: () => { } } as any)} />
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
                    <span className="text-white shrink-0 font-bold">admin@shourya:~$</span>
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
              <span className="text-white font-bold whitespace-nowrap">admin@shourya:~$</span>
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

      {/* Right Sidebar - Contact/Comms */}
      <div className="bg-[#0a0a0a] flex flex-col border-t border-[#1f1f1f] xl:border-t-0 z-10 overflow-hidden">
        <div className="p-4 lg:p-6 flex-1 flex flex-col h-full overflow-hidden">
          <h2 className="font-display text-[10px] font-bold text-[#a1faff] tracking-widest flex items-center gap-2 mb-4 uppercase shrink-0">
            <Link2 size={14} /> COMMS_LINK.SYS
          </h2>

          <div className="flex flex-col gap-3 flex-1 min-h-0 text-[#777575]">
            <ContactCard
              icon={<Github size={20} />}
              iconBg="bg-[#ffffff]/10 text-white"
              title="GITHUB.COM"
              detail="shourya-sh"
              href="https://github.com/shourya-sh"
            />
            <ContactCard
              icon={<Linkedin size={20} />}
              iconBg="bg-[#a1faff]/10 text-[#a1faff]"
              title="LINKEDIN"
              detail="/in/shourya-sheth"
              href="https://www.linkedin.com/in/shourya-sheth-98a09b300/"
            />
            <ContactCard
              icon={<Instagram size={20} />}
              iconBg="bg-[#ac89ff]/10 text-[#ac89ff]"
              title="INSTAGRAM"
              detail="@shourya.s21"
              href="https://www.instagram.com/shourya.s21/"
            />
            <ContactCard
              icon={<Mail size={20} />}
              iconBg="bg-[#febc2e]/10 text-[#febc2e]"
              title="SECURE_EMAIL"
              detail="shourya.sh7@..."
              href="mailto:shourya.sh7@gmail.com"
            />

            <button onClick={() => navigate('/contact')} className="flex-1 mt-1 w-full bg-[#131313] border border-[#1f1f1f] rounded-lg p-4 flex flex-col items-center justify-center hover:border-[#494847] hover:bg-[#151515] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#ff5f57]/10 flex items-center justify-center">
                  <Send size={18} className="text-[#ff5f57]" />
                </div>
                <span className="font-display text-[12px] font-bold text-white tracking-widest uppercase relative top-[1px]">TRANSMIT_MSG</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Sys Log */}
        <div className="p-4 lg:p-6 border-t border-[#1f1f1f] font-mono text-[8.5px] text-[#494847] leading-loose shrink-0">
          <p>{`> COMMS: Interfaces bound.`}</p>
          <p>{`> COMMS: Uplink established.`}</p>
          <p className="animate-pulse">{`> SYS_LOG: Awaiting input_`}</p>
        </div>
      </div>

    </div>
  );
}
