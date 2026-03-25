import React from 'react';
import { TerminalSquare, Code2, GraduationCap, Github, Linkedin, Instagram, Mail, Send, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full h-full grid grid-cols-1 xl:grid-cols-[1fr_300px]">
      
      {/* Left Main Content */}
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <div className="shrink-0 mb-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <span className="text-[#00fc40]">{`>`}</span>
            INIT_HUB
          </h1>
          <p className="text-[#777575] text-[13px] max-w-2xl leading-relaxed">
            Welcome to the primary architectural node. Select a directory to execute or monitor system throughput in real-time.
          </p>
        </div>

        {/* Terminal Area */}
        <div className="flex-1 bg-[#101010] rounded-xl border border-[#1f1f1f] flex flex-col overflow-hidden shadow-2xl relative min-h-[400px]">
          {/* Terminal Top Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-[#1f1f1f] shrink-0">
            <div className="flex gap-1.5 flex-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-mono text-[10px] text-[#777575] tracking-widest text-center flex-1">
              TERMINAL — BASH — 80X24
            </div>
            <div className="flex-1 flex justify-end items-center gap-2 font-mono text-[9px] text-[#777575] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00fc40]" />
              ONLINE <span className="ml-2">CPU: 42%</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 flex-1 flex flex-col overflow-y-auto">
            <div className="font-mono text-[12px] leading-relaxed text-white mb-8 shrink-0">
              <p className="text-[#a1a1a1]">[SYSTEM]: Kinetic OS v2.0.4 (stable-build)</p>
              <p className="text-[#00fc40]">Last login: Wed Oct 25 14:22:11 on ttys001</p>
              <p className="text-[#00fc40]">Type 'help' for available commands.</p>
            </div>

            {/* Grid of 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 shrink-0">
              <HubCard 
                icon={<Code2 size={20} />} 
                tag="EXECUTABLE"
                tagColor="bg-[#262626] text-white"
                title="PROJECTS.EXE"
                desc="Explore recent builds and open-source contributions."
                cmd="launch --dir /projects"
                cmdColor="text-[#a1faff]"
                iconColor="text-[#a1faff]"
                onClick={() => navigate('/projects')}
              />
              <HubCard 
                icon={<GraduationCap size={20} />} 
                tag="ARCHIVE"
                tagColor="bg-[#00fc40]/10 text-[#00fc40] border border-[#00fc40]/20"
                title="EDUCATION.SH"
                desc="View academic credentials and certifications path."
                cmd="cat /archives/edu.txt"
                cmdColor="text-[#00fc40]"
                iconColor="text-[#00fc40]"
                onClick={() => navigate('/education')}
              />
              <HubCard 
                icon={<TerminalSquare size={20} />} 
                tag="LOGS"
                tagColor="bg-[#ac89ff]/10 text-[#ac89ff] border border-[#ac89ff]/20"
                title="EXPERIENCE.LOG"
                desc="Timeline of professional roles and system architecting."
                cmd="tail -f /logs/xp.log"
                cmdColor="text-[#ac89ff]"
                iconColor="text-[#ac89ff]"
                onClick={() => navigate('/experience')}
              />
            </div>

            <div className="mt-auto font-mono text-[12px] text-[#00fc40] flex items-center gap-2 pt-4">
              <span>admin@kinetic:~$</span>
              <span className="text-[#a1a1a1]">initializing deep scan...</span>
              <span className="w-2.5 h-[14px] bg-[#a1faff] animate-pulse ml-1" />
            </div>
          </div>

          {/* Terminal Bottom Bar */}
          <div className="px-5 py-3 bg-[#131313] border-t border-[#1f1f1f] flex justify-between items-center font-mono text-[9px] tracking-widest text-[#777575] shrink-0">
            <div className="flex gap-8">
              <span>PATH: /HOME/ADMIN</span>
              <span className="text-[#00fc40]">PACKETS: 100% SUCCESS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 h-1 bg-[#262626] rounded-full overflow-hidden hidden sm:block">
                <div className="w-[60%] h-full bg-[#a1faff]" />
              </div>
              <span>SYNCING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contact/Comms */}
      <div className="border-l border-[#1f1f1f] bg-[#0a0a0a] flex flex-col border-t border-[#1f1f1f] xl:border-t-0 z-10 overflow-y-auto">
        <div className="p-6 lg:p-8 flex-1">
          <h2 className="font-display text-[11px] font-bold text-[#a1faff] tracking-widest flex items-center gap-3 mb-8">
            <Link2 size={16} /> COMMS_LINK.SYS
          </h2>

          <div className="flex flex-col gap-4">
            <ContactCard 
              icon={<Github size={18} />}
              iconBg="bg-[#ffffff]/10 text-white"
              title="GITHUB.COM"
              detail="@shourya-sheth"
              status="CONNECTED"
              action="VIEW"
              actionColor="text-white"
            />
            <ContactCard 
              icon={<Linkedin size={18} />}
              iconBg="bg-[#a1faff]/10 text-[#a1faff]"
              title="LINKEDIN"
              detail="/in/shourya-sheth"
              status="CONNECTED"
              action="VIEW"
              actionColor="text-[#a1faff]"
            />
            <ContactCard 
              icon={<Instagram size={18} />}
              iconBg="bg-[#ac89ff]/10 text-[#ac89ff]"
              title="INSTAGRAM"
              detail="@shouryasheth_"
              status="ENCRYPTED"
              action="VIEW"
              actionColor="text-[#ac89ff]"
            />
            <ContactCard 
              icon={<Mail size={18} />}
              iconBg="bg-[#febc2e]/10 text-[#febc2e]"
              title="SECURE_EMAIL"
              detail="shourya@...com"
              status="READY"
              action="COMPOSE"
              actionColor="text-[#febc2e]"
            />
            
            <button onClick={() => navigate('/contact')} className="mt-2 w-full bg-[#131313] border border-[#1f1f1f] rounded-xl p-4 flex items-center justify-between hover:border-[#494847] hover:bg-[#151515] transition-all group shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#ff5f57]/10 flex items-center justify-center">
                  <Send size={14} className="text-[#ff5f57]" />
                </div>
                <span className="font-display text-[11px] font-bold text-white tracking-widest uppercase">TRANSMIT_MSG</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Sys Log */}
        <div className="p-6 lg:p-8 border-t border-[#1f1f1f] font-mono text-[9px] text-[#494847] leading-loose">
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
    <div onClick={onClick} className="bg-[#131313] border border-[#1f1f1f] rounded-xl p-5 flex flex-col hover:border-[#494847] transition-all hover:-translate-y-1 group cursor-pointer shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className={iconColor}>{icon}</div>
        <span className={`font-mono text-[8px] px-2 py-1 rounded-[3px] uppercase tracking-wider ${tagColor}`}>
          {tag}
        </span>
      </div>
      <h3 className="font-display text-[14px] font-bold text-white mb-2 tracking-wide">{title}</h3>
      <p className="font-mono text-[10px] text-[#777575] leading-relaxed mb-5 flex-1 line-clamp-3">
        {desc}
      </p>
      <div className={`font-mono text-[9px] flex items-center gap-2 ${cmdColor} bg-[#101010] p-2.5 rounded-lg border border-[#1f1f1f] truncate`}>
        <TerminalSquare size={12} className="shrink-0" /> <span className="truncate">{cmd}</span>
      </div>
    </div>
  );
}

function ContactCard({ icon, iconBg, title, detail, status, action, actionColor }: any) {
  return (
    <div className="bg-[#131313] rounded-xl border border-[#1f1f1f] p-4 flex flex-col gap-4 hover:border-[#494847] transition-all hover:bg-[#151515] cursor-pointer group shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-[12px] font-bold text-white uppercase tracking-wider truncate">{title}</h3>
          <p className="font-mono text-[9px] text-[#777575] mt-1 truncate">{detail}</p>
        </div>
      </div>
      <div className="flex items-center justify-between font-mono text-[9px] tracking-widest pt-3 border-t border-[#1f1f1f]">
        <span className="text-[#494847]">status: {status}</span>
        <span className={`${actionColor} font-bold`}>{action}</span>
      </div>
    </div>
  );
}
