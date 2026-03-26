import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Props {
  difficulty: number;
  onExit: () => void;
}

export default function DinoGame({ difficulty, onExit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const resetRef = useRef(false);

  const BASE_SPEED = difficulty === 1 ? 4 : difficulty === 2 ? 5.5 : 8;

  const restartLogic = useCallback(() => {
    resetRef.current = true;
    setGameOver(false);
    setScore(0);
    scoreRef.current = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;

    let animId: number;
    let dino = { x: 50, y: 150, w: 20, h: 40, dy: 0, jumpF: -11, g: 0.6, grounded: false };
    let obstacles: any[] = [];
    let frame = 0;
    let gameSpeed = BASE_SPEED;

    const draw = () => {
      if (resetRef.current) {
        dino = { x: 50, y: 150, w: 20, h: 40, dy: 0, jumpF: -11, g: 0.6, grounded: false };
        obstacles = []; frame = 0; gameSpeed = BASE_SPEED; resetRef.current = false;
      }

      if (gameOver) return;
      animId = requestAnimationFrame(draw);
      frame++;

      ctx.fillStyle = '#101010';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floor
      ctx.strokeStyle = '#262626'; ctx.beginPath(); ctx.moveTo(0, 240); ctx.lineTo(canvas.width, 240); ctx.stroke();
      
      // Dynamic distant horizon lines
      ctx.strokeStyle = '#1f1f1f'; ctx.beginPath(); ctx.moveTo(0, 240 + 10); ctx.lineTo(canvas.width, 240 + 10); ctx.stroke();

      // Gravity Physics
      dino.dy += dino.g;
      dino.y += dino.dy;
      if (dino.y + dino.h >= 240) { dino.y = 240 - dino.h; dino.dy = 0; dino.grounded = true; }

      // Obstacle Generation
      if (frame % Math.max(50, Math.floor(120 - gameSpeed*6)) === 0) {
        obstacles.push({ x: canvas.width, y: 200, w: 20, h: 40, passed: false });
      }
      
      for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= gameSpeed;

        ctx.fillStyle = '#ff5f57'; 
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

        // Core Collision Geometry
        if (dino.x < obs.x + obs.w && dino.x + dino.w > obs.x && dino.y < obs.y + obs.h && dino.y + dino.h > obs.y) {
          setGameOver(true); cancelAnimationFrame(animId); return;
        }

        if (obs.x + obs.w < dino.x && !obs.passed) { 
          obs.passed = true; scoreRef.current += 10 * difficulty; setScore(scoreRef.current); 
          gameSpeed += 0.05; // Progressive difficulty
        }
        if (obs.x + obs.w < 0) obstacles.splice(i, 1);
      }

      ctx.fillStyle = '#ac89ff'; ctx.shadowBlur = 15; ctx.shadowColor = '#ac89ff';
      ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
      ctx.shadowBlur = 0;
    };

    const keydown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp') { 
        e.preventDefault(); 
        if (dino.grounded) { dino.dy = dino.jumpF; dino.grounded = false; } 
      }
      if (e.key.toLowerCase() === 'x' || e.key === 'Escape') {
        e.preventDefault();
        onExit(); return;
      }
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        restartLogic(); return;
      }
    };

    window.addEventListener('keydown', keydown);
    if (!gameOver) animId = requestAnimationFrame(draw);

    return () => { window.removeEventListener('keydown', keydown); cancelAnimationFrame(animId); };
  }, [gameOver, BASE_SPEED, difficulty, onExit, restartLogic]);

  return (
    <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
    <div className="font-display text-2xl font-bold tracking-widest text-[#ac89ff] mb-2 uppercase">DINO.BIN</div>
      <div className="flex justify-between w-[500px] font-mono text-[11px] text-[#ac89ff] mb-4">
        <span>METRICS: {score}</span>
        <span>DIFF: LVL {difficulty}</span>
      </div>
      <div className="relative rounded-lg overflow-hidden border border-[#262626] shadow-[0_0_20px_rgba(172,137,255,0.15)] bg-black">
        <canvas ref={canvasRef} width={500} height={300} className="block" />
        {gameOver && (
           <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-10">
             <span className="font-display text-2xl font-bold text-[#ff5f57] mb-2 tracking-widest">SYSTEM_HALT</span>
             <span className="font-mono text-[9px] text-[#777575] mb-6 tracking-widest uppercase">Fatal block exception</span>
             <button onClick={restartLogic} className="px-6 py-2 border border-[#ac89ff] text-[#ac89ff] font-mono text-[10px] rounded hover:bg-[#ac89ff] hover:text-black transition-all uppercase tracking-widest z-20">REBOOT SEQUENCE</button>
           </div>
        )}
      </div>
      <div className="font-mono text-[9px] text-[#777575] mt-6 tracking-widest uppercase text-center leading-loose">
        {'[SPACE] EVADE '}<br/>
        {'[R] RESTART | [ESC/X] SIGKILL'}
      </div>
    </div>
  );
}
