import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail, Send, Link2 } from 'lucide-react';

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
  }, [text, delay]);

  return <span>{displayed}</span>;
}

function RetroFile({ label, ext, imageKey, navigate }: { label: string, ext: string, imageKey: string, navigate: (path: string) => void }) {
  return (
    <div
      onClick={() => navigate('/' + navigatePath(imageKey))}
      className="flex flex-col items-center gap-3 cursor-pointer group p-3 border border-transparent hover:border-[#ffffff10] border-dashed rounded-lg transition-all"
    >
      <div className="relative w-16 h-16 md:w-24 md:h-24 group-hover:-translate-y-1 transition-transform">
        <img
          src={`/retro_icons/${imageKey}.png?v=${Date.now()}`}
          alt={label}
          className="w-full h-full object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <span className="font-mono text-[10px] md:text-[12px] text-gray-400 text-center group-hover:bg-white group-hover:text-black px-1.5 py-0.5">
        {label}.{ext.toUpperCase()}
      </span>
    </div>
  );
}

function navigatePath(imageKey: string) {
  if (imageKey.includes('exe') || imageKey === 'projects') return 'projects';
  if (imageKey.includes('sh') || imageKey === 'education') return 'education';
  if (imageKey.includes('log') || imageKey === 'experience') return 'experience';
  if (imageKey.includes('txt') || imageKey === 'resume') return 'resume';
  if (imageKey.includes('sys') || imageKey === 'games') return 'games';
  return 'projects';
}

function SystemInfo({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="flex flex-col gap-1 md:gap-2 mt-0 mb-1 w-full">
      <div className="text-gray-300 font-mono text-[8.5px] sm:text-[10.5px] lg:text-[13px] leading-tight whitespace-pre hidden sm:block">
        {`   _____ __                                _          ______                    _             __
  / ___// /_  ____  __  _________  ______ ( )_____   /_  __/__  _________ ___  (_)___  ____ _/ /
  \\__ \\/ __ \\/ __ \\/ / / / ___/ / / / __ \`/// ___/    / / / _ \\/ ___/ __ \`__ \\/ / __ \\/ __ \`/ / 
 ___/ / / / / /_/ / /_/ / /  / /_/ / /_/ / (__  )    / / /  __/ /  / / / / / / / / / / /_/ / /  
/____/_/ /_/\\____/\\__,_/_/   \\__, /\\__,_/ /____/    /_/  \\___/_/  /_/ /_/ /_/_/_/ /_/\\__,_/_/   
                            /____/                                                              `}
      </div>

      {/* Desktop Grid Area */}
      <div className="flex flex-wrap gap-4 md:gap-8 max-w-4xl px-2 mt-1">
        <RetroFile label="PROJECTS" ext="exe" imageKey="projects" navigate={navigate} />
        <RetroFile label="EDUCATION" ext="sh" imageKey="education" navigate={navigate} />
        <RetroFile label="EXPERIENCE" ext="log" imageKey="experience" navigate={navigate} />
        <RetroFile label="RESUME" ext="txt" imageKey="resume" navigate={navigate} />
        <RetroFile label="MINIGAMES" ext="sys" imageKey="games" navigate={navigate} />
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<{ cmd?: string; out: React.ReactNode | string; isSystem?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const systemInfoRef = useRef<HTMLDivElement>(null);
  const topPaneRef = useRef<HTMLDivElement>(null);

  const [topHeight, setTopHeight] = useState(350); // Initial minimum height
  const [minTopHeight, setMinTopHeight] = useState(350); // Locked static minimum bounds
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Allow DOM to paint exactly then snap top panel strictly to the inner dimensions
    const timer = setTimeout(() => {
      if (topPaneRef.current) {
        const h = topPaneRef.current.scrollHeight;
        setTopHeight(h);
        setMinTopHeight(h);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const startDragging = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    if (isDragging) {
      // Don't allow sweeping the dragline above the original un-expanded layout baseline
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

  const [paddingTop, setPaddingTop] = useState(300);

  useEffect(() => {
    const handleGlobalClear = () => {
      setHistory([]);
    };
    window.addEventListener('clear-terminal', handleGlobalClear);
    return () => window.removeEventListener('clear-terminal', handleGlobalClear);
  }, []);

  useEffect(() => {
    setLastLogin(new Date().toString().split(' GMT')[0]);

    if (sessionStorage.getItem('kinetic_welcome_done')) {
      setHistory([
        { cmd: 'sys_connect', out: <span className="text-[#a1faff]">Session restored. Type 'help' for available commands.</span> }
      ]);
      return;
    }
    sessionStorage.setItem('kinetic_welcome_done', 'true');

    const sequence: { cmd?: string; out: React.ReactNode | string; delay?: number; immediate?: boolean }[] = [
      { out: '[SYSTEM]: Initializing hardware abstractions... [OK]', delay: 8 },
      { out: '[SYSTEM]: CPU: Intel(R) Core(TM) Quantum Processor (8 cores) [OK]', delay: 10 },
      { out: '[SYSTEM]: Memory checks passed. 8192MB allocation successful.', delay: 5 },
      { out: '[SYSTEM]: Mounting virtual file systems -> root... [SUCCESS]', delay: 10 },
      { out: '[SYSTEM]: Starting GUI display manager... [READY]', delay: 5 },
      { cmd: 'sys_connect', out: 'Secure uplink active. Type \'help\' for available commands.', delay: 15 }
    ];

    let step = 0;
    const executeSequence = () => {
      if (step >= sequence.length) return;
      const current = sequence[step];

      if (current.immediate) {
        setHistory(prev => [...prev, { cmd: current.cmd, out: current.out }]);
        step++;
        setTimeout(executeSequence, 200);
      } else {
        setHistory(prev => [...prev, {
          cmd: current.cmd,
          out: <span className={!current.cmd ? "text-[#777575]" : "text-[#a1faff]"}>
            <TypingText text={current.out as string} delay={current.delay} onComplete={() => {
              step++;
              setTimeout(executeSequence, 200);
            }} />
          </span>
        }]);
      }
    };

    setTimeout(executeSequence, 500);
  }, []);

  useEffect(() => {
    if (systemInfoRef.current) {
      setPaddingTop(systemInfoRef.current.offsetHeight + 40);
    }
  }, [history]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdArgs = input.trim().split(' ').filter(Boolean);
    const command = cmdArgs[0].toLowerCase();
    const args = cmdArgs.slice(1);

    let output: React.ReactNode | string = '';

    switch (command) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 mt-1 mb-2 font-mono">
            <div className="text-[#a1a1a1] mb-2 font-bold">Shourya OS bash, version 2.0.4(1)-release</div>
            <div className="text-[#777575] mb-2">These shell commands are defined internally. Type 'help' to see this list.</div>
            <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-2 gap-y-1.5">
              <span className="text-white">ls</span>       <span className="text-[#a1a1a1]">List directory contents</span>
              <span className="text-white">cd [dir]</span> <span className="text-[#a1a1a1]">Change the shell working directory</span>
              <span className="text-white">clear</span>    <span className="text-[#a1a1a1]">Clear the terminal screen buffer</span>
              <span className="text-white">date</span>     <span className="text-[#a1a1a1]">Print the system date and time</span>
              <span className="text-white">whoami</span>   <span className="text-[#a1a1a1]">Print effective system userid</span>
              <span className="text-white">matrix</span>   <span className="text-[#a1a1a1]">Initiate classified protocol execution</span>
            </div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="flex flex-col font-mono leading-relaxed mt-1 mb-2">
            <div className="text-white font-bold mb-2">total 48</div>
            <div className="grid grid-cols-[90px_45px_60px_1fr] sm:grid-cols-[100px_50px_60px_1fr] gap-4 w-full">
              <span className="text-[#a1a1a1]">drwxr-xr-x</span> <span className="text-[#777575]">2</span> <span className="text-[#a1faff]">admin</span> <span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/projects')}>projects/</span>
              <span className="text-[#a1a1a1]">drwxr-xr-x</span> <span className="text-[#777575]">2</span> <span className="text-[#a1faff]">admin</span> <span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/education')}>education/</span>
              <span className="text-[#a1a1a1]">drwxr-xr-x</span> <span className="text-[#777575]">2</span> <span className="text-[#a1faff]">admin</span> <span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/experience')}>experience/</span>
              <span className="text-[#a1a1a1]">drwxr-xr-x</span> <span className="text-[#777575]">2</span> <span className="text-[#a1faff]">admin</span> <span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/resume')}>resume/</span>
              <span className="text-[#a1a1a1]">drwxr-xr-x</span> <span className="text-[#777575]">2</span> <span className="text-[#a1faff]">admin</span> <span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/games')}>games/</span>
              <span className="text-[#a1a1a1]">drwxr-xr-x</span> <span className="text-[#777575]">2</span> <span className="text-[#a1faff]">admin</span> <span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/contact')}>contact/</span>
            </div>
          </div>
        );
        break;
      case 'cd':
        if (!args[0]) {
          output = '';
        } else if (['projects', 'education', 'experience', 'resume', 'games', 'contact'].includes(args[0].replace(/\//g, ''))) {
          setTimeout(() => navigate(`/${args[0].replace(/\//g, '')}`), 400);
          output = `navigating to /${args[0].replace(/\//g, '')}...`;
        } else if (args[0] === '..' || args[0] === '~') {
          output = 'already at ROOT.';
        } else {
          output = `cd: ${args[0]}: No such file or directory`;
        }
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        window.dispatchEvent(new CustomEvent('clear-terminal'));
        return;
      case 'whoami':
        output = "shourya.sheth - kinetic OS standard user";
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'sudo':
        output = "admin is not in sudoers file.";
        break;
      case 'matrix':
        output = "Follow the white rabbit... 🐇";
        break;
      case 'echo':
        output = args.join(' ');
        break;
      default:
        output = `bash: ${command}: command not found`;
    }

    setHistory([...history, { cmd: input, out: output }]);
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
            TERMINAL — SHOURYA OS
          </div>
          <div className="flex-1 flex justify-end items-center gap-2 font-mono text-[9px] text-[#777575] tracking-widest pl-2">
            <span className="w-2 h-2 rounded-full bg-[#00fc40]" />
            <span className="hidden sm:inline">ONLINE</span>
          </div>
        </div>

        {/* Terminal Body Split Pane Container */}
        <div className={`flex-1 flex flex-col overflow-hidden relative bg-[#0a0a0a] ${isDragging ? 'select-none pointer-events-none' : ''}`}>

          {/* Top Desktop Pane (Scrollable within itself if needed) */}
          <div
            ref={topPaneRef}
            style={{ height: `${topHeight}px` }}
            className="w-full shrink-0 overflow-hidden bg-[#0a0a0a]"
          >
            <div className="px-4 md:px-8 pt-3 pb-3 h-full overflow-y-auto overflow-x-hidden scrollbar-hide select-none transition-all">
              <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#777575] flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex sm:gap-4 flex-col sm:flex-row">
                  <span>[SYSTEM]: Shourya OS v2.0.4</span>
                  <span className="text-white">Login: {lastLogin || 'initiating...'}</span>
                </div>
                <span className="text-[#a1a1a1] hidden md:block">Type 'help' for commands.</span>
              </div>
              <SystemInfo navigate={navigate} />
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

          </div>

          {/* Terminal Interaction */}
          <form onSubmit={handleCommand} className="px-4 md:px-8 py-4 md:py-5 border-t border-[#1f1f1f] font-mono text-[12px] md:text-[14px] flex items-center gap-2 shrink-0 relative bg-[#0a0a0a] z-30">
            <span className="text-white font-bold">admin@shourya:~$</span>
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

      {/* Right Sidebar - Contact/Comms */}
      <div className="bg-[#0a0a0a] flex flex-col border-t border-[#1f1f1f] xl:border-t-0 z-10 overflow-hidden">
        <div className="p-4 lg:p-6 flex-1 flex flex-col h-full overflow-hidden">
          <h2 className="font-display text-[10px] font-bold text-[#a1faff] tracking-widest flex items-center gap-2 mb-4 uppercase shrink-0">
            <Link2 size={14} /> COMMS_LINK.SYS
          </h2>

          <div className="flex flex-col gap-3 flex-1 min-h-0">
            <ContactCard
              icon={<Github size={20} />}
              iconBg="bg-[#ffffff]/10 text-white"
              title="GITHUB.COM"
              detail="shourya-sh"
              status="CONNECTED"
              action="VIEW"
              actionColor="text-white"
              href="https://github.com/shourya-sh"
            />
            <ContactCard
              icon={<Linkedin size={20} />}
              iconBg="bg-[#a1faff]/10 text-[#a1faff]"
              title="LINKEDIN"
              detail="/in/shourya-sheth"
              status="CONNECTED"
              action="VIEW"
              actionColor="text-[#a1faff]"
              href="https://www.linkedin.com/in/shourya-sheth-98a09b300/"
            />
            <ContactCard
              icon={<Instagram size={20} />}
              iconBg="bg-[#ac89ff]/10 text-[#ac89ff]"
              title="INSTAGRAM"
              detail="@shourya.s21"
              status="ENCRYPTED"
              action="VIEW"
              actionColor="text-[#ac89ff]"
              href="https://www.instagram.com/shourya.s21/"
            />
            <ContactCard
              icon={<Mail size={20} />}
              iconBg="bg-[#febc2e]/10 text-[#febc2e]"
              title="SECURE_EMAIL"
              detail="shourya.sh7@..."
              status="READY"
              action="COMPOSE"
              actionColor="text-[#febc2e]"
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
