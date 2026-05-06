import fs from 'fs';

// 1. Final Focus Fix for Games.tsx
let games = fs.readFileSync('src/pages/Games.tsx', 'utf8');
const gamesOld = "onClick={() => { if (gameState !== 'PLAYING') inputRef.current?.focus() }}";
const gamesNew = "onClick={(e) => { if (gameState !== 'PLAYING' && !(e.target as HTMLElement).closest('input, textarea, button, a')) inputRef.current?.focus() }}";
if (games.includes(gamesOld)) {
    games = games.replace(gamesOld, gamesNew);
    fs.writeFileSync('src/pages/Games.tsx', games);
    console.log('Fixed focus in Games.tsx');
}

// 2. Overhaul Projects.tsx
// Using double quotes for the outer string to avoid backtick nesting hell
const projectsContent = `import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TerminalSquare, Link2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '@/components/RightSidebar';

interface Project {
  status: string;
  name: string;
  desc: string;
  tags: string[];
  isActive?: boolean;
}

const PROJECTS_DATA: Project[] = [
  { status: "DEPLOYED", name: "CYBER_CORE_OS", desc: "Next-generation kernel interface designed for high-frequency algorithmic trade monitoring and visual data synthesis.", tags: ['PYTHON', 'REACT', 'D3.JS'] },
  { status: "ACTIVE", name: "NEURAL_DREAMER", desc: "Advanced latent space explorer utilizing multi-modal AI models for real-time generative architectural visualization.", tags: ['TENSORFLOW', 'WEBGL', 'NODE'] },
  { status: "LIVE", name: "VOID_ANALYTICS", desc: "Decentralized data pipeline visualization for monitoring cross-chain transactions across major protocol layers.", tags: ['RUST', 'GRAPHQL', 'AWS'], isActive: true },
  { status: "DEPLOYED", name: "SYNX_PROTOCOL", desc: "Ultra-low latency communication protocol for autonomous swarm robotics operating in high-interference environments.", tags: ['C++', 'MQTT', 'IOT'] },
  { status: "BETA", name: "OMNI_VAULT", desc: "Zero-knowledge proof based asset management platform for secure institutional digital asset custody and clearance.", tags: ['SOLIDITY', 'ZK-SNARK', 'NEXT.JS'] },
];

const PROJECTS_ASCII = String.raw\`
   ____  ____  ____       __ __________ ______ __________
  / __ \\/ __ \\/ __ \\     / // ____/ ____/ ____/ ____/ ___/
 / /_/ / /_/ / / / / __  / // __/ / /   / / __/ __/  \\__ \\ 
/ ____/ _, _/ /_/ / / /_/ // /___/ /___/ /_/ / /___ ___/ / 
/_/   /_/ |_|\\____/  \\____/_____/\\____/\\____/_____//____/  
\`;

function ProjectEntry({ p, onClick }: { p: Project, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group bg-[#050505] border border-[#1f1f1f] hover:border-[#a1faff]/50 p-4 relative overflow-hidden transition-all duration-300 cursor-pointer hover:bg-[#0a0a0a]"
    >
      <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
        <span className={\`text-[8px] font-mono tracking-widest \${p.isActive ? 'text-[#00fc40]' : 'text-[#777575]'}\`}>
          ● {p.status}
        </span>
      </div>
      <h3 className="font-mono text-[14px] font-bold text-white mb-2 group-hover:text-[#a1faff] transition-colors flex items-center gap-2">
        {p.name}.SYS
      </h3>
      <p className="font-mono text-[11px] text-[#777575] leading-relaxed mb-4 group-hover:text-[#cccccc] transition-colors line-clamp-2">
        {p.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map(tag => (
          <span key={tag} className="text-[8px] font-mono px-2 py-0.5 border border-[#1f1f1f] text-[#555] group-hover:border-[#333] transition-colors uppercase">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const navigate = useNavigate();
  const [lastLogin, setLastLogin] = useState('');
  const [history, setHistory] = useState<{ cmd?: string; out: React.ReactNode | string; isSystem?: boolean }[]>([
    { cmd: 'sys_init', out: 'Clustering project modules... OK', isSystem: true },
    { cmd: 'ls downloads/prototypes', out: (
      <div className="flex flex-col gap-1 mt-1 mb-2">
        <div className="text-[#a1a1a1] mb-1 font-bold italic">Source Forge v4.2.0 - Kinetic OS Module</div>
        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-2 gap-y-1.5 font-mono text-[11px]">
          <span className="text-[#00fc40]">cyber_core.run</span>
          <span className="text-[#a1faff]">neural_dreamer.run</span>
          <span className="text-[#ac89ff]">void_viz.run</span>
          <span className="text-[#febc2e]">synx_proto.run</span>
        </div>
      </div>
    ), isSystem: false }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const topPaneRef = useRef<HTMLDivElement>(null);

  const [topHeight, setTopHeight] = useState(480);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setLastLogin(new Date().toString().split(' GMT')[0]);
    const timer = setTimeout(() => {
      if (topPaneRef.current) setTopHeight(topPaneRef.current.scrollHeight);
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

    const command = cmdText.toLowerCase().split(' ')[0];
    let output: React.ReactNode | string = '';

    switch (command) {
      case 'help':
        output = "Available: ls, run [proj], clear, pwd, back";
        break;
      case 'ls':
        output = "cyber_core, neural_dreamer, void_viz, synx_proto, omni_vault";
        break;
      case 'pwd':
        output = "/usr/shourya/projects";
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'back':
      case 'cd ..':
        setHistory(prev => [...prev, { out: "Navigating to ROOT...", isSystem: true }]);
        setTimeout(() => navigate('/'), 400);
        break;
      default:
        output = "bash: project_exec: \${command}: entry point not found";
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
      const newHeight = Math.max(150, Math.min(window.innerHeight - 300, e.clientY - 44));
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
    <div 
      className="min-h-full h-full grid grid-cols-1 xl:grid-cols-[1fr_300px] bg-[#0a0a0a]" 
      onClick={(e) => { if (!(e.target as HTMLElement).closest('input, textarea, button, a')) inputRef.current?.focus(); }}
    >
      <div className="flex flex-col h-full w-full overflow-hidden border-r border-[#1f1f1f]">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#1f1f1f] shrink-0 z-30">
          <div className="flex gap-1.5 flex-1">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="font-mono text-[9px] md:text-[11px] text-[#777575] tracking-widest text-center flex-1 font-bold">
            TERMINAL — PROJECTS_FORGE
          </div>
          <div className="flex-1 flex justify-end items-center gap-2 font-mono text-[9px] text-[#777575] tracking-widest pl-2">
            <span className="w-2 h-2 rounded-full bg-[#00fc40]" />
            <span className="hidden sm:inline">ONLINE</span>
          </div>
        </div>

        <div className={\`flex-1 flex flex-col overflow-hidden relative bg-[#0a0a0a] \${isDragging ? 'select-none pointer-events-none' : ''}\`}>
          {/* Top Pane */}
          <div
            ref={topPaneRef}
            style={{ height: \`\${topHeight}px\` }}
            className="w-full shrink-0 overflow-hidden bg-[#0a0a0a]"
          >
            <div className="px-4 md:px-8 pt-3 pb-8 h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
              <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#777575] flex items-center justify-between mb-4">
                <span>[SYSTEM]: Project Index v22.1</span>
                <span>{lastLogin}</span>
              </div>

              <div className="text-gray-300 font-mono text-[8px] sm:text-[10px] lg:text-[12px] leading-tight mb-8 select-none">
                <pre>{PROJECTS_ASCII}</pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl">
                {PROJECTS_DATA.map((p, idx) => (
                  <ProjectEntry key={idx} p={p} onClick={() => setInput(\`run \${p.name.toLowerCase()}\`)} />
                ))}
              </div>
            </div>
          </div>

          {/* Resizer */}
          <div
            onMouseDown={startDragging}
            className="w-full h-1.5 bg-[#1f1f1f] cursor-row-resize hover:bg-[#333] transition-colors shrink-0 z-50 flex items-center justify-center pointer-events-auto"
          >
            <div className="w-12 h-[1px] bg-[#444] rounded-full" />
          </div>

          {/* Bottom Terminal */}
          <div className="flex-1 overflow-y-auto bg-[#0a0a0a] scrollbar-hide">
            <div className="px-4 md:px-8 py-4 font-mono text-[12px] md:text-[14px] flex flex-col gap-1.5 w-full">
              {history.map((h, i) => (
                <div key={i} className="w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-white shrink-0 font-bold">admin@shourya:~/projects$</span>
                    <span className="text-gray-300 relative top-0.5">{h.cmd}</span>
                  </div>
                  {h.out && (
                    <div className={\`\${h.isSystem ? 'text-[#a1faff]' : 'text-[#888888]'} mt-0.5 ml-0 sm:ml-4 w-full whitespace-pre-wrap\`}>
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
            <span className="text-white font-bold">admin@shourya:~/projects$</span>
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
    </div>
  );
}
\`;

fs.writeFileSync('src/pages/Projects.tsx', projectsContent);
console.log('Overhauled Projects.tsx with terminal layout and sidebar');
