import RightSidebar from '@/components/RightSidebar';
import { useSidebar } from '@/context/SidebarContext';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TerminalSquare, Link2, X, Github, Linkedin, Instagram, Mail, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SnakeGame from '@/components/games/SnakeGame';
import PongGame from '@/components/games/PongGame';
import DinoGame from '@/components/games/DinoGame';

type GameState = 'IDLE' | 'AWAITING_DIFFICULTY' | 'PLAYING';

function GameIcon({ label, imageKey, onClick }: { label: string, imageKey: string, onClick: () => void }) {
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
            className={`w-full h-full object-contain mix-blend-screen grayscale-[0.3] brightness-110 ${imageKey === 'dino' ? 'invert' : ''}`}
            style={{ imageRendering: 'pixelated' } as any}
          />
        )}
      </div>
      <span className="font-mono text-[10px] md:text-[12px] text-gray-400 text-center group-hover:bg-white group-hover:text-black px-1.5 py-0.5 whitespace-nowrap">
        {label === 'BACK' ? 'BACK.EXE' : `${label}.EXE`}
      </span>
    </div>
  );
}

const MINIGAMES_ASCII = String.raw`
    __  ________   _______________    __  ______________
   /  |/  /  _/ | / /  _/ ____/   |  /  |/  / ____/ ___/
  / /|_/ // //  |/ // // / __/ /| | / /|_/ / __/  \__ \ 
 / /  / // // /|  // // /_/ / ___ |/ /  / / /___ ___/ / 
/_/  /_/___/_/ |_/___/\____/_/  |_/_/  /_/_____//____/  
`;

function ContactCard({ icon, iconBg, title, detail, href }: any) {
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

function MinigamesInfo({ onLaunch }: { onLaunch: (game: string) => void }) {
  return (
    <div className="flex flex-col gap-1 md:gap-2 mt-0 mb-1 w-full">
      <div className="ascii-title-filled font-mono text-[8.5px] sm:text-[10.5px] lg:text-[13px] leading-tight whitespace-pre hidden sm:block">
        {MINIGAMES_ASCII}
      </div>

      {/* Game Grid Area */}
      <div className="flex flex-wrap gap-4 md:gap-8 max-w-4xl px-2 mt-1">

        <GameIcon label="SNAKE" imageKey="snake" onClick={() => onLaunch('SNAKE')} />
        <GameIcon label="PONG" imageKey="pong" onClick={() => onLaunch('PONG')} />
        <GameIcon label="DINO" imageKey="dino" onClick={() => onLaunch('DINO')} />
      </div>
    </div>
  );
}

export default function Games() {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<number>(2);

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
  const [paddingTop, setPaddingTop] = useState(300);
  const [lastLogin, setLastLogin] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const topPaneRef = useRef<HTMLDivElement>(null);

  const [topHeight, setTopHeight] = useState(350);
  const [minTopHeight, setMinTopHeight] = useState(350);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleGlobalClear = () => {
      setHistory([]);
    };
    window.addEventListener('clear-terminal', handleGlobalClear);
    return () => window.removeEventListener('clear-terminal', handleGlobalClear);
  }, []);

  useEffect(() => {
    setLastLogin(new Date().toString().split(' GMT')[0]);
  }, []);

  useEffect(() => {
    if (gameState !== 'PLAYING') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, gameState]);

  useEffect(() => {
    if (gameState !== 'PLAYING') {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [gameState]);

  const startDragging = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const minH = minTopHeight;
      const newHeight = Math.max(minH, Math.min(e.clientY - 40, window.innerHeight - 200));
      setTopHeight(newHeight);
      setPaddingTop(newHeight);
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

  const triggerGameLaunch = (gameId: string, fromCommand: boolean = false) => {
    if (gameId === 'BACK') {
      setHistory(prev => [...prev, { out: "Navigating to ROOT...", isSystem: true }]);
      setTimeout(() => navigate('/'), 300);
      return "";
    }
    setActiveGame(gameId.toUpperCase());
    setGameState('AWAITING_DIFFICULTY');
    const out = `Loading ${gameId.toUpperCase()}...\nSelect difficulty for ${gameId.toUpperCase()}:\n  [1] Easy\n  [2] Medium\n  [3] Hard\n(esc or type 'x' to abort)`;
    if (!fromCommand) {
      setHistory(prev => [...prev, { out, isSystem: true }]);
    }
    return out;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || gameState === 'PLAYING') return;

    const cmdStr = input.trim();
    const command = cmdStr.split(' ')[0].toLowerCase();
    const args = cmdStr.split(' ').slice(1);

    if (gameState === 'AWAITING_DIFFICULTY') {
      const diffStr = cmdStr;
      let diff = 0;
      if (['1', 'easy'].includes(diffStr.toLowerCase())) diff = 1;
      else if (['2', 'medium'].includes(diffStr.toLowerCase())) diff = 2;
      else if (['3', 'hard'].includes(diffStr.toLowerCase())) diff = 3;

      if (diff > 0) {
        setDifficulty(diff);
        setGameState('PLAYING');
        setHistory(prev => [...prev, { out: `Difficulty set to ${diff}. Launching ${activeGame}...`, isSystem: true }]);
      } else if (['exit', 'quit', 'kill', 'x'].includes(diffStr.toLowerCase())) {
        setActiveGame(null);
        setGameState('IDLE');
        setHistory(prev => [...prev, { out: `Execution aborted.`, isSystem: true }]);
      } else {
        setHistory(prev => [...prev, { out: `Invalid selection. Enter 1 (Easy), 2 (Medium), or 3 (Hard).`, isSystem: true }]);
      }
      setInput('');
      return;
    }

    let output: React.ReactNode | string = '';

    switch (command) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 mt-1 mb-2 font-mono">
            <div className="text-[#a1a1a1] mb-2 font-bold italic">Games Shell v1.0.4 - Kinetic OS Subsystem</div>
            <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-2 gap-y-1.5">
              <span className="text-white">ls</span>            <span className="text-[#a1a1a1]">List available game executables</span>
              <span className="text-white">run [exe]</span>     <span className="text-[#a1a1a1]">Execute specified game binary</span>
              <span className="text-white">cd ..</span>          <span className="text-[#a1a1a1]">Exit to root terminal shell</span>
              <span className="text-white">pwd</span>           <span className="text-[#a1a1a1]">Print current working directory</span>
              <span className="text-white">date</span>          <span className="text-[#a1a1a1]">Display system date/time</span>
              <span className="text-white">whoami</span>        <span className="text-[#a1a1a1]">Display current user profile</span>
              <span className="text-white">clear</span>         <span className="text-[#a1a1a1]">Purge terminal history buffer</span>
            </div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="flex flex-col font-mono leading-relaxed mt-1 mb-2">
            <div className="text-white font-bold mb-2">total 420.exe</div>
            <div className="grid grid-cols-[90px_45px_60px_1fr] sm:grid-cols-[100px_50px_60px_1fr] gap-4 w-full">
              <span className="text-[#a1a1a1]">-rwxr-xr-x</span> <span className="text-[#777575]">1</span> <span className="text-[#a1faff]">admin</span> <span className="text-[#a1faff] hover:underline cursor-pointer" onClick={() => triggerGameLaunch('snake')}>snake.exe*</span>
              <span className="text-[#a1a1a1]">-rwxr-xr-x</span> <span className="text-[#777575]">1</span> <span className="text-[#a1faff]">admin</span> <span className="text-[#a1faff] hover:underline cursor-pointer" onClick={() => triggerGameLaunch('pong')}>pong.exe*</span>
              <span className="text-[#a1a1a1]">-rwxr-xr-x</span> <span className="text-[#777575]">1</span> <span className="text-[#a1faff]">admin</span> <span className="text-[#a1faff] hover:underline cursor-pointer" onClick={() => triggerGameLaunch('dino')}>dino.exe*</span>
            </div>
          </div>
        );
        break;
      case 'cd':
        const target = args[0]?.toLowerCase();
        if (target === '..' || target === '../') {
          output = "Navigating to ROOT...";
          setTimeout(() => navigate('/'), 400);
        } else if (['snake', 'snake.exe'].includes(target)) {
          output = triggerGameLaunch('snake', true);
        } else if (['pong', 'pong.exe'].includes(target)) {
          output = triggerGameLaunch('pong', true);
        } else if (['dino', 'dino.exe'].includes(target)) {
          output = triggerGameLaunch('dino', true);
        } else if (target === 'games') {
          output = "Already in ~games directory.";
        } else {
          output = `cd: ${args[0]}: No such directory or executable.`;
        }
        break;
      case 'pwd':
        output = "/home/admin/games";
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'whoami':
        output = "shourya.sheth - kinetic OS standard user";
        break;
      case 'matrix':
        output = "Wake up, Neo...";
        break;
      case 'run':
        const gameInput = args[0]?.toLowerCase();
        if (['snake', 'snake.exe'].includes(gameInput)) output = triggerGameLaunch('snake', true);
        else if (['pong', 'pong.exe'].includes(gameInput)) output = triggerGameLaunch('pong', true);
        else if (['dino', 'dino.exe'].includes(gameInput)) output = triggerGameLaunch('dino', true);
        else output = `run: ${args[0]}: game not found. Type 'ls' for available binaries.`;
        break;
      case 'snake':
      case 'snake.exe':
        output = triggerGameLaunch('snake', true);
        break;
      case 'pong':
      case 'pong.exe':
        output = triggerGameLaunch('pong', true);
        break;
      case 'dino':
      case 'dino.exe':
        output = triggerGameLaunch('dino', true);
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        window.dispatchEvent(new CustomEvent('clear-terminal'));
        return;
      default:
        output = `bash: ${command}: command not found`;
    }

    setHistory(prev => [...prev, { cmd: cmdStr, out: output, isSystem: !!output && output.toString().startsWith('Loading') }]);
    setInput('');
  };

  const quitGame = () => {
    setGameState('IDLE');
    setActiveGame(null);
    setHistory(prev => [...prev, { out: `[SYSTEM] Process terminated with SIGKILL.`, isSystem: true }]);
  };

  return (
    <div 
      className={`min-h-full h-full grid grid-cols-1 transition-all duration-300 ease-in-out bg-[#0a0a0a]
        ${isOpen ? 'xl:grid-cols-[1fr_260px]' : 'xl:grid-cols-[1fr_0px]'}
      `} 
      onClick={(e) => { if (gameState !== 'PLAYING' && !(e.target as HTMLElement).closest('input, textarea, button, a')) inputRef.current?.focus() }}
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
          <div className="font-mono text-[9px] md:text-[11px] text-[#777575] tracking-widest text-center flex-1 font-bold">
            TERMINAL — MINI GAMES
          </div>
          <div className="flex-1 flex justify-end items-center gap-2 font-mono text-[9px] text-[#777575] tracking-widest pl-2">
            <span className="w-2 h-2 rounded-full bg-[#00fc40]" />
            <span className="hidden sm:inline">ONLINE</span>
          </div>
        </div>

        {/* Terminal Body Split Pane Container */}
        <div className={`flex-1 min-h-0 relative flex flex-col ${isDragging ? 'select-none pointer-events-none' : ''}`}>

          {/* Top Desktop Pane (Scrollable within itself if needed) */}
          <div
            ref={topPaneRef}
            style={{ height: gameState === 'PLAYING' ? '0px' : `${topHeight}px` }}
            className={`w-full shrink-0 overflow-hidden bg-[#0a0a0a] transition-[height] duration-300 ease-in-out ${gameState === 'PLAYING' ? 'border-none' : ''}`}
          >
            {gameState !== 'PLAYING' && (
              <div
                ref={topPaneRef}
                className="px-4 md:px-8 pt-3 pb-3 h-full overflow-y-auto overflow-x-hidden scrollbar-hide select-none transition-all border-b border-[#1f1f1f]/50">

                {/* Back Button - Absolute Positioned to avoid layout shift */}
                <div
                  onClick={() => {
                    setHistory(prev => [...prev, { out: 'Navigating to ROOT...', isSystem: true }]);
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
                <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#777575] flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 pr-28">
                  <div className="flex sm:gap-4 flex-col sm:flex-row">
                    <span>[SYSTEM]: Game Modules Active</span>
                    <span className="text-white">Login: {lastLogin || 'initiating...'}</span>
                  </div>
                  <span className="text-[#a1a1a1] hidden md:block">Type 'help' for commands.</span>
                </div>
                <MinigamesInfo onLaunch={(game) => triggerGameLaunch(game)} />
              </div>
            )}
          </div>

          {/* Draggable Resizer Handle */}
          {gameState !== 'PLAYING' && (
            <div
              onMouseDown={startDragging}
              className="w-full h-1.5 bg-[#1f1f1f] cursor-row-resize hover:bg-[#333] transition-colors shrink-0 z-50 flex items-center justify-center opacity-80 pointer-events-auto"
            >
              <div className="w-12 h-[1px] bg-[#555] rounded-full" />
            </div>
          )}

          {/* Bottom Pane - Terminal History / Game Area */}
          <div className="flex-1 overflow-hidden relative bg-[#0a0a0a] flex flex-col">
            {gameState === 'PLAYING' ? (
              <div className="flex-1 flex flex-col h-full bg-[#050505] relative animate-[fadeIn_0.3s_ease-out]">
                <div className="absolute top-4 right-4 z-50">
                  <button onClick={quitGame} className="flex items-center gap-1 font-mono text-[10px] text-[#ff5f57] hover:text-white transition-colors uppercase tracking-widest bg-black/50 px-2 py-1 rounded border border-[#ff5f57]/30">
                    <X size={14} /> SIGKILL
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center p-4">
                  {activeGame === 'SNAKE' && <SnakeGame difficulty={difficulty} onExit={quitGame} />}
                  {activeGame === 'PONG' && <PongGame difficulty={difficulty} onExit={quitGame} />}
                  {activeGame === 'DINO' && <DinoGame difficulty={difficulty} onExit={quitGame} />}
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 font-mono text-[12px] md:text-[14px] flex flex-col gap-1.5 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {history.map((h, i) => (
                    <div key={i} className="w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-white shrink-0 font-bold">admin@shourya:~/games$</span>
                        <span className="text-gray-300 relative top-0.5">{h.cmd}</span>
                      </div>
                      {h.out && (
                        <div className={`${h.isSystem ? 'text-[#a1faff]' : 'text-[#a1faff]'} mt-0.5 ml-0 sm:ml-4 w-full whitespace-pre-wrap`}>
                          {h.out}
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={terminalEndRef} className="shrink-0 h-4" />
                </div>

                {/* Terminal Interaction */}
                <form onSubmit={handleCommand} className="px-4 md:px-8 py-4 md:py-5 border-t border-[#1f1f1f] font-mono text-[12px] md:text-[14px] flex items-center gap-2 shrink-0 relative bg-[#0a0a0a] z-30">
                  <span className="text-white font-bold whitespace-nowrap">
                    {gameState === 'AWAITING_DIFFICULTY' ? `${activeGame?.toLowerCase()}/difficulty_select> ` : 'admin@shourya:~/games$'}
                  </span>
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
              </>
            )}
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}
