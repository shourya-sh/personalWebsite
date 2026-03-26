import React, { useState, useEffect, useRef } from 'react';
import { TerminalSquare, Code2, GraduationCap, Github, Linkedin, Instagram, Mail, Send, Link2, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<{ cmd: string; out: React.ReactNode | string }[]>([]);
  const [input, setInput] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLastLogin(new Date().toString().split(' GMT')[0]);
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
          <div className="flex flex-col gap-1 mt-1 mb-2">
            <div><span className="text-[#a1faff]">ls</span>       - List directory</div>
            <div><span className="text-[#a1faff]">cd [dir]</span> - Change directory</div>
            <div><span className="text-[#a1faff]">clear</span>    - Clear terminal</div>
            <div><span className="text-[#a1faff]">whoami</span>   - Print user id</div>
            <div><span className="text-[#a1faff]">date</span>     - Print system date</div>
            <div><span className="text-[#a1faff]">matrix</span>   - Initiate protocol</div>
          </div>
        );
        break;
      case 'ls':
        output = 'projects/  education/  experience/  games/  contact/';
        break;
      case 'cd':
        if (!args[0]) {
          output = '';
        } else if (['projects', 'education', 'experience', 'games', 'contact'].includes(args[0].replace(/\//g, ''))) {
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
        return;
      case 'whoami':
        output = 'admin';
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
    <div className="min-h-full h-full grid grid-cols-1 xl:grid-cols-[1fr_260px]" onClick={() => inputRef.current?.focus()}>
      
      {/* Left Main Content */}
      <div className="p-4 md:p-6 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="shrink-0 mb-4">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white mb-1 flex items-center gap-3">
            <span className="text-[#00fc40]">{`>`}</span>
            SHOURYA_SHETH
          </h1>
          <p className="text-[#777575] text-[12px] max-w-2xl leading-relaxed">
            Welcome to my primary architectural node. Select a directory to execute or view the latest builds.
          </p>
        </div>

        {/* Terminal Area */}
        <div className="flex-1 bg-[#101010] rounded-xl border border-[#1f1f1f] flex flex-col overflow-hidden shadow-2xl relative min-h-0">
          {/* Terminal Top Bar */}
          <div className="flex items-center justify-between px-4 py-1.5 bg-[#181818] border-b border-[#1f1f1f] shrink-0">
            <div className="flex gap-1.5 flex-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-mono text-[9px] text-[#777575] tracking-widest text-center flex-1">
              TERMINAL — BASH — 80X24
            </div>
            <div className="flex-1 flex justify-end items-center gap-2 font-mono text-[9px] text-[#777575] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00fc40]" />
              ONLINE <span className="ml-2 hidden sm:inline">CPU: 42%</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* FIXED OVERLAY HEADER WITH CARDS */}
            <div className="shrink-0 p-4 md:p-5 border-b border-[#1f1f1f]/60 bg-[#101010]/95 backdrop-blur-md z-20 shadow-sm shadow-black/40">
              <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-white mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex sm:gap-4 flex-col sm:flex-row">
                  <span className="text-[#a1a1a1]">[SYSTEM]: Kinetic OS v2.0.4 (stable-build)</span>
                  <span className="text-[#00fc40]">Login: {lastLogin || 'initiating...'} on ttys001</span>
                </div>
                <span className="text-[#00fc40] hidden md:block">Type 'help' for commands.</span>
              </div>

              {/* Grid of 4 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-3">
                <HubCard 
                  icon={<Code2 size={16} />} 
                  tag="EXEC"
                  tagColor="bg-[#262626] text-white"
                  title="PROJECTS.EXE"
                  desc="Explore recent software builds."
                  cmd="launch /projects"
                  cmdColor="text-[#a1faff]"
                  iconColor="text-[#a1faff]"
                  onClick={() => navigate('/projects')}
                />
                <HubCard 
                  icon={<GraduationCap size={16} />} 
                  tag="ARCHIVE"
                  tagColor="bg-[#00fc40]/10 text-[#00fc40] border border-[#00fc40]/20"
                  title="EDUCATION.SH"
                  desc="View academic credentials."
                  cmd="cat /edu.txt"
                  cmdColor="text-[#00fc40]"
                  iconColor="text-[#00fc40]"
                  onClick={() => navigate('/education')}
                />
                <HubCard 
                  icon={<TerminalSquare size={16} />} 
                  tag="LOGS"
                  tagColor="bg-[#ac89ff]/10 text-[#ac89ff] border border-[#ac89ff]/20"
                  title="EXPERIENCE.LOG"
                  desc="Timeline of professional roles."
                  cmd="tail -f /xp.log"
                  cmdColor="text-[#ac89ff]"
                  iconColor="text-[#ac89ff]"
                  onClick={() => navigate('/experience')}
                />
                <HubCard 
                  icon={<Gamepad2 size={16} />} 
                  tag="MODULE"
                  tagColor="bg-[#ff5f57]/10 text-[#ff5f57] border border-[#ff5f57]/20"
                  title="MINIGAMES.SYS"
                  desc="Interactive physics simulations."
                  cmd="./games.sh"
                  cmdColor="text-[#ff5f57]"
                  iconColor="text-[#ff5f57]"
                  onClick={() => navigate('/games')}
                />
              </div>
            </div>

            {/* Terminal History */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-5 font-mono text-[11px] flex flex-col gap-1.5 min-h-[60px] bg-[#0a0a0a] relative z-10">
              {history.map((h, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00fc40]">admin@kinetic:~$</span>
                    <span className="text-white relative top-0.5">{h.cmd}</span>
                  </div>
                  {h.out && <div className="text-[#a1a1a1] mt-0.5 ml-4">{h.out}</div>}
                </div>
              ))}
              <div ref={terminalEndRef} className="shrink-0 h-2" />
            </div>

            {/* Terminal Interaction */}
            <form onSubmit={handleCommand} className="mt-1 pt-2 border-t border-[#1f1f1f]/60 font-mono text-[11px] flex items-center gap-2 shrink-0 relative bg-[#101010]">
              <span className="text-[#00fc40]">admin@kinetic:~$</span>
              <input 
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none text-white grow relative top-0.5"
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
              <span className="w-2 h-3 bg-[#a1faff] animate-pulse shrink-0" />
            </form>
          </div>

          {/* Terminal Bottom Bar */}
          <div className="px-4 py-2 bg-[#131313] border-t border-[#1f1f1f] flex justify-between items-center font-mono text-[8px] tracking-widest text-[#777575] shrink-0">
            <div className="flex gap-6">
              <span>PATH: /HOME/ADMIN</span>
              <span className="text-[#00fc40]">PACKETS: 100% SUCCESS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-1 bg-[#262626] rounded-full overflow-hidden hidden sm:block">
                <div className="w-[60%] h-full bg-[#a1faff]" />
              </div>
              <span>SYNCING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contact/Comms */}
      <div className="border-l border-[#1f1f1f] bg-[#0a0a0a] flex flex-col border-t border-[#1f1f1f] xl:border-t-0 z-10 overflow-hidden">
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
            
            <button onClick={() => navigate('/contact')} className="flex-1 mt-1 w-full bg-[#131313] border border-[#1f1f1f] rounded-lg p-4 flex flex-col items-center justify-center hover:border-[#494847] hover:bg-[#151515] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
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

function HubCard({ icon, tag, tagColor, title, desc, cmd, cmdColor, iconColor, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-[#131313] border border-[#1f1f1f] rounded-lg p-4 flex flex-col hover:border-[#494847] transition-all hover:-translate-y-1 group cursor-pointer shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className={`${iconColor}`}>{icon}</div>
        <span className={`font-mono text-[7px] px-1.5 py-0.5 rounded-[3px] uppercase tracking-wider ${tagColor}`}>
          {tag}
        </span>
      </div>
      <h3 className="font-display text-[12px] font-bold text-white mb-1 tracking-wide">{title}</h3>
      <p className="font-mono text-[9px] text-[#777575] leading-snug flex-1 mb-3 line-clamp-2">
        {desc}
      </p>
      <div className={`font-mono text-[8px] flex items-center gap-1.5 ${cmdColor} bg-[#101010] p-1.5 rounded border border-[#1f1f1f] truncate`}>
        <TerminalSquare size={10} className="shrink-0" /> <span className="truncate relative top-[1px]">{cmd}</span>
      </div>
    </div>
  );
}

function ContactCard({ icon, iconBg, title, detail, status, action, actionColor, href }: any) {
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
