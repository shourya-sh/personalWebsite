import React, { useState, useEffect, useRef } from 'react';
import { TerminalSquare, X } from 'lucide-react';
import SnakeGame from '@/components/games/SnakeGame';
import PongGame from '@/components/games/PongGame';
import DinoGame from '@/components/games/DinoGame';

type GameState = 'IDLE' | 'AWAITING_DIFFICULTY' | 'PLAYING';

export default function Games() {
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<number>(2);
  
  const [history, setHistory] = useState<{ cmd?: string; out: React.ReactNode | string; isSystem?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory([
      { out: "Kinetic OS Games Module loaded.", isSystem: true },
      { out: "Type 'ls' to view executable files, or click a module above.", isSystem: true }
    ]);
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

  const triggerGameLaunch = (gameId: string) => {
    setActiveGame(gameId);
    setGameState('AWAITING_DIFFICULTY');
    setHistory(prev => [...prev, { out: `Loading ${gameId}...\nSelect difficulty for ${gameId}:\n[1] Easy\n[2] Medium\n[3] Hard\n(Or type 'x' to abort)`, isSystem: true }]);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || gameState === 'PLAYING') return;

    const cmdStr = input.trim();
    const command = cmdStr.split(' ')[0].toLowerCase();

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

    // IDLE State
    let output: React.ReactNode | string = '';

    switch (command) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 mt-1 mb-2 text-[#777575]">
            <div><span className="text-[#a1faff]">ls</span>           - List executables</div>
            <div><span className="text-[#a1faff]">./[file]</span>     - Execute binary</div>
            <div><span className="text-[#a1faff]">clear</span>        - Clear terminal</div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="flex gap-4 text-[#ff5f57] font-bold">
            <span className="text-[#00fc40]">SNAKE.EXE</span>
            <span className="text-[#a1faff]">PONG.SH</span>
            <span className="text-[#ac89ff]">DINO.BIN</span>
          </div>
        );
        break;
      case './snake.exe':
      case 'snake.exe':
      case 'snake':
      case 'run snake.exe':
        triggerGameLaunch('SNAKE.EXE');
        setInput('');
        return;
      case './pong.sh':
      case 'pong.sh':
      case 'pong':
      case 'run pong.sh':
        triggerGameLaunch('PONG.SH');
        setInput('');
        return;
      case './dino.bin':
      case 'dino.bin':
      case 'dino':
      case 'run dino.bin':
        triggerGameLaunch('DINO.BIN');
        setInput('');
        return;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        output = `bash: ${command}: command not found`;
    }

    setHistory(prev => [...prev, { cmd: cmdStr, out: output }]);
    setInput('');
  };

  const quitGame = () => {
    setGameState('IDLE');
    setActiveGame(null);
    setInput('');
    setHistory(prev => [...prev, { out: `[SYSTEM] Process terminated with SIGKILL.`, isSystem: true }]);
  };

  return (
    <div className="p-4 md:p-6 h-full flex flex-col overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      <div className="shrink-0 mb-4">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white mb-1 flex items-center gap-3">
          <span className="text-[#00fc40] text-glow-primary">{`>`}</span>
          GAMES_MODULE.SYS
        </h1>
        <p className="text-[#777575] text-[12px] max-w-2xl leading-relaxed">
          Interactive physics and logic simulations. Execute a binary to begin.
        </p>
      </div>

      <div className="flex-1 bg-[#101010] rounded-xl border border-[#1f1f1f] flex flex-col overflow-hidden shadow-2xl relative min-h-[400px]">
        {/* Terminal Top Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-[#1f1f1f] shrink-0 relative z-30 shadow-sm shadow-black/50">
          <div className="flex gap-1.5 flex-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-80" />
          </div>
          <div className="font-mono text-[10px] text-[#777575] tracking-widest text-center flex-1">
             {gameState === 'PLAYING' ? `[PID: ${Math.floor(Math.random()*9000)+1000}] RUNNING: ${activeGame}` : 'GAME_TERMINAL — 80X24'}
          </div>
          <div className="flex-1 flex justify-end items-center gap-2">
            {gameState === 'PLAYING' && (
              <button onClick={quitGame} className="flex items-center gap-1 font-mono text-[9px] text-[#ff5f57] hover:text-white transition-colors uppercase tracking-widest">
                <X size={12} /> SIGKILL
              </button>
            )}
          </div>
        </div>

        {/* TOP MODULES WITH BACKGROUND BLUR (HIDDEN DURING GAMEPLAY) */}
        {gameState !== 'PLAYING' && (
          <div className="shrink-0 p-4 border-b border-[#1f1f1f]/50 bg-[#101010]/95 backdrop-blur-md z-20 shadow-md transition-all duration-300">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <GameCard 
                  id="SNAKE.EXE" color="text-[#00fc40]" border="border-[#00fc40]/20 hover:border-[#00fc40]/60" bg="bg-[#00fc40]/10"
                  desc="Classic grid progression simulation."
                  onClick={() => triggerGameLaunch('SNAKE.EXE')}
                />
                <GameCard 
                  id="PONG.SH" color="text-[#a1faff]" border="border-[#a1faff]/20 hover:border-[#a1faff]/60" bg="bg-[#a1faff]/10"
                  desc="2D physics intercept simulator."
                  onClick={() => triggerGameLaunch('PONG.SH')}
                />
                <GameCard 
                  id="DINO.BIN" color="text-[#ac89ff]" border="border-[#ac89ff]/20 hover:border-[#ac89ff]/60" bg="bg-[#ac89ff]/10"
                  desc="Infinite horizontal velocity engine."
                  onClick={() => triggerGameLaunch('DINO.BIN')}
                />
             </div>
          </div>
        )}

        {/* Terminal Body */}
        <div className="flex-1 flex flex-col overflow-hidden relative bg-[#0a0a0a] z-10" onClick={() => { if (gameState !== 'PLAYING') inputRef.current?.focus() }}>
          {gameState === 'PLAYING' ? (
            <div className="flex-1 flex items-center justify-center p-4 bg-[#050505]">
              {activeGame === 'SNAKE.EXE' && <SnakeGame difficulty={difficulty} onExit={quitGame} />}
              {activeGame === 'PONG.SH' && <PongGame difficulty={difficulty} onExit={quitGame} />}
              {activeGame === 'DINO.BIN' && <DinoGame difficulty={difficulty} onExit={quitGame} />}
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
               {/* Terminal History */}
              <div className="flex-1 overflow-y-auto scrollbar-hide py-2 font-mono text-[11.5px] flex flex-col gap-2 min-h-[60px] whitespace-pre-wrap">
                {history.map((h, i) => (
                  <div key={i}>
                    {h.cmd && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#00fc40]">guest@games:~$</span>
                        <span className="text-white relative top-0.5">{h.cmd}</span>
                      </div>
                    )}
                    {h.out && <div className={`${h.isSystem ? 'text-[#00fc40]' : 'text-white ml-4'} mt-0.5 whitespace-pre leading-relaxed`}>{h.out}</div>}
                  </div>
                ))}
                <div ref={terminalEndRef} className="shrink-0 h-2" />
              </div>

               {/* Terminal Interaction */}
              <form onSubmit={handleCommand} className="mt-2 pt-3 border-t border-[#1f1f1f]/60 font-mono text-[11.5px] flex items-center gap-2 shrink-0 relative bg-[#0a0a0a]">
                <span className="text-[#00fc40]">
                  {gameState === 'AWAITING_DIFFICULTY' ? 'difficulty_select> ' : 'guest@games:~$'}
                </span>
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
                <span className="w-2 h-3 bg-[#ff5f57] animate-pulse shrink-0" />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GameCard({ id, color, border, bg, desc, onClick }: any) {
  return (
    <div onClick={onClick} className={`rounded-lg border ${border} p-3 flex flex-col transition-all cursor-pointer group shadow-md hover:scale-[1.02] bg-[#131313] shrink-0`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${bg} ${color}`}>
          <TerminalSquare size={16} />
        </div>
        <div>
          <h3 className={`font-display text-[11px] font-bold tracking-wide ${color}`}>{id}</h3>
          <p className="font-mono text-[8.5px] text-[#777575] leading-snug line-clamp-1 mt-0.5">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
