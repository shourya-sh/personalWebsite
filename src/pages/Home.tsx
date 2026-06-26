import React, { useState, useEffect, useRef, useCallback } from 'react';
import RightSidebar from '@/components/RightSidebar';
import { useSidebar } from '@/context/SidebarContext';
import { useNavigate } from 'react-router-dom';
import { useTopPaneHeight } from '@/hooks/useTopPaneHeight';
import {
  Github, Linkedin, Instagram, Mail, Link2, Send,
  CheckCircle, AlertTriangle, ShieldAlert, X,
} from 'lucide-react';

/* ─── Shared sub-components ──────────────────────────────────── */

function RetroFile({
  label, ext, imageKey, navigate, compact,
}: {
  label: string; ext: string; imageKey: string;
  navigate: (path: string) => void; compact?: boolean;
}) {
  return (
    <div
      onClick={() => navigate('/' + navigatePath(imageKey))}
      className={`flex flex-col items-center gap-2 cursor-pointer group border border-transparent hover:border-[#ffffff10] border-dashed rounded-lg transition-all ${compact ? 'p-2' : 'p-3'}`}
    >
      <div className={`relative group-hover:-translate-y-1 transition-transform ${compact ? 'w-12 h-12' : 'w-16 h-16 md:w-24 md:h-24'}`}>
        <img
          src={`/retro_icons/${imageKey}.png?v=${Date.now()}`}
          alt={label}
          className="w-full h-full object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <span className={`font-mono text-gray-400 text-center group-hover:bg-white group-hover:text-black px-1.5 py-0.5 ${compact ? 'text-[9px]' : 'text-[10px] md:text-[12px]'}`}>
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
      <div className="ascii-title-filled font-mono text-[8.5px] sm:text-[10.5px] lg:text-[13px] leading-tight whitespace-pre hidden sm:block">
        {`   _____ __                                _          ______                    _             __
  / ___// /_  ____  __  _________  ______ ( )_____   /_  __/__  _________ ___  (_)___  ____ _/ /
  \\__ \\/ __ \\/ __ \\/ / / / ___/ / / / __ \`/// ___/    / / / _ \\/ ___/ __ \`__ \\/ / __ \\/ __ \`/ / 
 ___/ / / / / /_/ / /_/ / /  / /_/ / /_/ / (__  )    / / /  __/ /  / / / / / / / / / / /_/ / /  
/____/_/ /_/\\____/\\__,_/_/   \\__, /\\__,_/ /____/    /_/  \\___/_/  /_/ /_/ /_/_/_/ /_/\\__,_/_/   
                            /____/                                                              `}
      </div>
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

/* ─── Mobile contact card ──────────────────────────────────────── */
function MobileContactCard({
  icon, color, title, detail, href,
}: {
  icon: React.ReactNode; color: string; title: string; detail: string; href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 border border-[#1f1f1f] bg-[#050505] hover:bg-[#0d0d0d] hover:border-[#2a2a2a] group transition-all"
    >
      <div className={`w-9 h-9 shrink-0 flex items-center justify-center border border-[#1f1f1f] bg-[#0a0a0a] group-hover:bg-[#111] transition-all ${color}`}>
        <div className="scale-[1.1] opacity-70 group-hover:opacity-100 group-hover:scale-[1.25] transition-all group-hover:drop-shadow-[0_0_6px_currentColor]">
          {icon}
        </div>
      </div>
      <div className="min-w-0">
        <p className={`font-mono text-[11px] font-bold text-white uppercase tracking-widest group-hover:${color.replace('text-', '')} transition-colors truncate`}>
          {title}
        </p>
        <p className="font-mono text-[9px] text-[#555] truncate group-hover:text-[#aaa] transition-colors">{detail}</p>
      </div>
    </a>
  );
}

/* ─── Mobile direct-message form ──────────────────────────────── */
function MobileMessageForm() {
  const [formData, setFormData] = useState({ from: '', subject: '', body: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing = [];
    if (!formData.from.trim()) missing.push('NAME');
    if (!formData.subject.trim()) missing.push('SUBJECT');
    if (!formData.body.trim()) missing.push('MESSAGE');
    if (missing.length) { setErrMsg(`EMPTY: ${missing.join(', ')}`); setStatus('error'); return; }
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/shourya.sh7@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.from,
          _subject: `[Portfolio] ${formData.subject}`,
          message: formData.body,
          _template: 'table',
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ from: '', subject: '', body: '' });
        setTimeout(() => setStatus('idle'), 3500);
      } else {
        setStatus('error'); setErrMsg('TRANSMISSION_FAILED');
      }
    } catch {
      setStatus('error'); setErrMsg('NETWORK_ERROR');
    }
  };

  return (
    <div className="border border-[#1f1f1f] bg-[#050505] p-3 flex flex-col gap-2 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />
      <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-2 relative z-10">
        <span className="font-mono text-[10px] text-[#777575] uppercase tracking-widest flex items-center gap-1.5">
          <Send size={10} className="text-[#a1faff]" /> DIRECT_MSG
        </span>
        {status === 'sending' && <span className="font-mono text-[8px] text-[#febc2e] animate-pulse">TRANSMITTING...</span>}
        {status === 'success' && (
          <span className="font-mono text-[8px] text-[#00fc40] flex items-center gap-1">
            <CheckCircle size={9} /> DELIVERED
          </span>
        )}
        {status === 'error' && (
          <span className="font-mono text-[8px] text-[#ff5f57] flex items-center gap-1">
            <AlertTriangle size={9} /> {errMsg}
          </span>
        )}
      </div>
      <form onSubmit={handleSend} className="flex flex-col gap-2 relative z-10">
        <input
          type="text" placeholder="FROM / NAME" disabled={status === 'sending'}
          value={formData.from}
          onChange={e => { setFormData(p => ({ ...p, from: e.target.value })); setStatus('idle'); }}
          className="bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#a1faff]/50 outline-none text-white font-mono text-[11px] p-2 placeholder:text-[#333] transition-colors"
          spellCheck={false}
        />
        <input
          type="text" placeholder="SUBJECT" disabled={status === 'sending'}
          value={formData.subject}
          onChange={e => { setFormData(p => ({ ...p, subject: e.target.value })); setStatus('idle'); }}
          className="bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#a1faff]/50 outline-none text-white font-mono text-[11px] p-2 placeholder:text-[#333] transition-colors"
          spellCheck={false}
        />
        <textarea
          placeholder="TRANSMISSION BODY..." disabled={status === 'sending'}
          value={formData.body}
          onChange={e => { setFormData(p => ({ ...p, body: e.target.value })); setStatus('idle'); }}
          className="bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#a1faff]/50 outline-none text-white font-mono text-[11px] p-2 placeholder:text-[#333] min-h-[80px] resize-none transition-colors"
          spellCheck={false}
        />
        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          className="bg-[#0a0a0a] hover:bg-[#a1faff]/10 border border-[#a1faff]/30 hover:border-[#a1faff]/60 text-[#a1faff] font-mono text-[11px] font-bold tracking-widest uppercase py-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          [ TRANSMIT ]
        </button>
      </form>
    </div>
  );
}

/* ─── Page component ──────────────────────────────────────────── */
export default function Home() {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const [history, setHistory] = useState<{ cmd?: string; out: React.ReactNode | string; isSystem?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const topPaneRef = useRef<HTMLDivElement>(null);

  const [topHeight, setTopHeight] = useState(350);
  const [minTopHeight, setMinTopHeight] = useState(350);
  const [isDragging, setIsDragging] = useState(false);

  useTopPaneHeight(topPaneRef, setTopHeight, setMinTopHeight);

  const startDragging = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newHeight = Math.max(minTopHeight, Math.min(e.clientY - 40, window.innerHeight - 200));
      setTopHeight(newHeight);
    }
  }, [isDragging, minTopHeight]);

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

  useEffect(() => {
    const handleGlobalClear = () => setHistory([]);
    window.addEventListener('clear-terminal', handleGlobalClear);
    return () => window.removeEventListener('clear-terminal', handleGlobalClear);
  }, []);

  useEffect(() => {
    setLastLogin(new Date().toString().split(' GMT')[0]);
    setHistory([
      { cmd: 'sys_connect', out: <span className="text-[#a1faff]">Session restored. Type 'help' for available commands.</span> },
    ]);
  }, []);

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
              <span className="text-[#a1a1a1]">drwxr-xr-x</span><span className="text-[#777575]">2</span><span className="text-[#a1faff]">admin</span><span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/projects')}>projects/</span>
              <span className="text-[#a1a1a1]">drwxr-xr-x</span><span className="text-[#777575]">2</span><span className="text-[#a1faff]">admin</span><span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/education')}>education/</span>
              <span className="text-[#a1a1a1]">drwxr-xr-x</span><span className="text-[#777575]">2</span><span className="text-[#a1faff]">admin</span><span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/experience')}>experience/</span>
              <span className="text-[#a1a1a1]">drwxr-xr-x</span><span className="text-[#777575]">2</span><span className="text-[#a1faff]">admin</span><span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/resume')}>resume/</span>
              <span className="text-[#a1a1a1]">drwxr-xr-x</span><span className="text-[#777575]">2</span><span className="text-[#a1faff]">admin</span><span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/games')}>games/</span>
            </div>
          </div>
        );
        break;
      case 'cd':
        if (!args[0]) { output = ''; }
        else if (['projects', 'education', 'experience', 'resume', 'games'].includes(args[0].replace(/\//g, ''))) {
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
        output = 'shourya.sheth - kinetic OS standard user';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'sudo':
        output = 'admin is not in sudoers file.';
        break;
      case 'matrix':
        output = 'Follow the white rabbit... 🐇';
        break;
      case 'echo':
        output = args.join(' ');
        break;
      default:
        output = `bash: ${command}: command not found`;
    }

    setHistory(prev => [...prev, { cmd: input, out: output }]);
    setInput('');
  };

  const desktopContextPanelInner = (
    <>
      <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#777575] flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
        <div className="flex sm:gap-4 flex-col sm:flex-row">
          <span>[SYSTEM]: Shourya OS v2.0.4</span>
          <span className="text-white">Login: {lastLogin || 'initiating...'}</span>
        </div>
        <span className="text-[#a1a1a1] hidden md:block">Type 'help' for commands.</span>
      </div>
      <SystemInfo navigate={navigate} />
    </>
  );

  return (
    <>
      {/* ── MOBILE LAYOUT (hidden on xl+) ─────────────────────── */}
      <div
        className="xl:hidden flex flex-col bg-[#0a0a0a] h-full overflow-y-auto"
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest('input, textarea, button, a'))
            mobileInputRef.current?.focus();
        }}
      >
        {/* Compact Terminal Window */}
        <div className="border-b border-[#1f1f1f]">
          {/* macOS title bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#181818] border-b border-[#1f1f1f]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[9px] text-[#777575] tracking-widest font-bold">TERMINAL — SHOURYA OS</span>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#777575]">
              <span className="w-2 h-2 rounded-full bg-[#00fc40]" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* System info + apps */}
          <div className="px-4 pt-3 pb-1">
            <div className="font-mono text-[9.5px] text-[#777575] mb-3 leading-relaxed">
              <span>[SYSTEM]: Shourya OS v2.0.4 &nbsp;·&nbsp; </span>
              <span className="text-white">{lastLogin || 'initiating...'}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {[
                { label: 'PROJECTS', ext: 'exe', imageKey: 'projects' },
                { label: 'EDUCATION', ext: 'sh', imageKey: 'education' },
                { label: 'EXPERIENCE', ext: 'log', imageKey: 'experience' },
                { label: 'RESUME', ext: 'txt', imageKey: 'resume' },
                { label: 'MINIGAMES', ext: 'sys', imageKey: 'games' },
              ].map(f => (
                <RetroFile key={f.imageKey} {...f} navigate={navigate} compact />
              ))}
            </div>
          </div>

          {/* Mini terminal history */}
          <div className="border-t border-[#1f1f1f] px-4 py-2 font-mono text-[11px] max-h-[72px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {history.slice(-4).map((h, i) => (
              <div key={i} className="leading-relaxed">
                {h.cmd && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-bold shrink-0">admin@shourya:~$</span>
                    <span className="text-gray-300">{h.cmd}</span>
                  </div>
                )}
                {h.out && (
                  <div className="text-[#a1faff] ml-0 whitespace-pre-wrap">{h.out}</div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} className="h-1" />
          </div>

          {/* Input */}
          <form
            onSubmit={handleCommand}
            className="px-4 py-3 border-t border-[#1f1f1f] font-mono text-[12px] flex items-center gap-2 bg-[#0a0a0a]"
          >
            <span className="text-white font-bold shrink-0">admin@shourya:~$</span>
            <input
              ref={mobileInputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="bg-transparent border-none outline-none text-white grow min-w-0 font-mono tracking-wider caret-white"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>

        {/* ── FEATURED CONTACT SECTION ───────────────────────── */}
        <div className="flex flex-col px-4 pt-6 pb-10 bg-[#050505]">
          {/* Section heading with glow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#a1faff] shadow-[0_0_12px_#a1faff] animate-pulse shrink-0" />
            <h2 className="font-mono text-[15px] font-bold text-[#a1faff] uppercase tracking-widest drop-shadow-[0_0_10px_rgba(161,250,255,0.5)]">
              CONNECT W/ ME!
            </h2>
            <Link2 size={14} className="text-[#a1faff] opacity-60 shrink-0" />
          </div>

          {/* 2-column contact cards */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <MobileContactCard
              icon={<Github size={18} />} color="text-white"
              title="GITHUB" detail="shourya-sh"
              href="https://github.com/shourya-sh"
            />
            <MobileContactCard
              icon={<Linkedin size={18} />} color="text-[#a1faff]"
              title="LINKEDIN" detail="/in/shourya-sheth"
              href="https://www.linkedin.com/in/shourya-sheth-98a09b300/"
            />
            <MobileContactCard
              icon={<Instagram size={18} />} color="text-[#ac89ff]"
              title="INSTAGRAM" detail="@shourya.s21"
              href="https://www.instagram.com/shourya.s21/"
            />
            <MobileContactCard
              icon={<Mail size={18} />} color="text-[#febc2e]"
              title="EMAIL" detail="shourya.sh7@gmail.com"
              href="mailto:shourya.sh7@gmail.com"
            />
          </div>

          {/* Direct message form */}
          <MobileMessageForm />

          {/* Footer sys log */}
          <div className="mt-5 border-t border-[#1f1f1f] pt-4 font-mono text-[8px] text-[#494847] leading-relaxed">
            <p>{`> COMMS: Interfaces bound.`}</p>
            <p className="animate-pulse">{`> SYS_LOG: Standby_`}</p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (hidden below xl) ──────────────────── */}
      <div
        className={`hidden xl:grid h-full transition-all duration-300 ease-in-out bg-[#0a0a0a] ${isOpen ? 'xl:grid-cols-[1fr_260px]' : 'xl:grid-cols-[1fr_0px]'}`}
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest('input, textarea, button, a'))
            inputRef.current?.focus();
        }}
      >
        {/* Terminal Column */}
        <div className="flex flex-col h-full w-full overflow-hidden border-r border-[#1f1f1f]">
          {/* Terminal Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#1f1f1f] shrink-0 z-30">
            <div className="flex gap-1.5 flex-1">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-mono text-[11px] text-[#777575] tracking-widest text-center flex-1 font-bold">
              TERMINAL — SHOURYA OS
            </div>
            <div className="flex-1 flex justify-end items-center gap-2 font-mono text-[9px] text-[#777575] tracking-widest pl-2">
              <span className="w-2 h-2 rounded-full bg-[#00fc40]" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Body: split pane */}
          <div className={`flex-1 flex flex-col overflow-hidden relative bg-[#0a0a0a] min-h-0 ${isDragging ? 'select-none pointer-events-none' : ''}`}>
            {/* Desktop split-pane top section */}
            <div
              ref={topPaneRef}
              style={{ height: `${topHeight}px` }}
              className="w-full shrink-0 overflow-hidden bg-[#0a0a0a]"
            >
              <div className="px-4 md:px-8 pt-3 pb-3 h-full overflow-y-auto overflow-x-hidden scrollbar-hide select-none transition-all">
                {desktopContextPanelInner}
              </div>
            </div>

            <div
              onMouseDown={startDragging}
              className="w-full h-1.5 bg-[#1f1f1f] cursor-row-resize hover:bg-[#333] transition-colors shrink-0 z-50 flex items-center justify-center opacity-80 pointer-events-auto"
            >
              <div className="w-12 h-[1px] bg-[#555] rounded-full" />
            </div>

            {/* Terminal history */}
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

            {/* Input */}
            <form
              onSubmit={handleCommand}
              className="px-4 md:px-8 py-4 md:py-5 border-t border-[#1f1f1f] font-mono text-[12px] md:text-[14px] flex items-center gap-2 shrink-0 relative bg-[#0a0a0a] z-30"
            >
              <span className="text-white font-bold">admin@shourya:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="bg-transparent border-none outline-none text-white grow relative top-0.5 min-w-0 font-mono tracking-wider caret-white"
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
            </form>
          </div>
        </div>

        <RightSidebar />
      </div>
    </>
  );
}
