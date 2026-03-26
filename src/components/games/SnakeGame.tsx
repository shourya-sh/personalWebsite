import React, { useEffect, useRef, useState, useCallback } from 'react';

const GRID = 20;

interface Props {
  difficulty: number;
  onExit: () => void;
}

export default function SnakeGame({ difficulty, onExit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const scoreRef = useRef(0);
  const resetRef = useRef(false);

  const SPEED = difficulty === 1 ? 120 : difficulty === 2 ? 80 : 50;

  const restartLogic = useCallback(() => {
    resetRef.current = true;
    setGameOver(false);
    setScore(0);
    scoreRef.current = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;

    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 1; let dy = 0;
    let nextDx = 1; let nextDy = 0;
    let animId: number;
    let lastTime = 0;

    const loop = (time: number) => {
      if (resetRef.current) {
        snake = [{x: 10, y: 10}]; dx = 1; dy = 0; nextDx = 1; nextDy = 0; resetRef.current = false;
      }

      animId = requestAnimationFrame(loop);
      if (time - lastTime < SPEED) return;
      lastTime = time;

      dx = nextDx; dy = nextDy;
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};

      if (
        head.x < 0 || 
        head.x >= canvas.width/GRID || 
        head.y < 0 || 
        head.y >= canvas.height/GRID
      ) {
        setGameOver(true);
        cancelAnimationFrame(animId);
        return;
      }

      if (snake.some(s => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        cancelAnimationFrame(animId);
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        scoreRef.current += 10 * difficulty;
        setScore(scoreRef.current);
        food = {
          x: Math.floor(Math.random() * (canvas.width/GRID)),
          y: Math.floor(Math.random() * (canvas.height/GRID))
        };
      } else snake.pop();

      ctx.fillStyle = '#101010';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      for(let i=0; i<canvas.width; i+=GRID) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke(); }
      for(let i=0; i<canvas.height; i+=GRID) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); ctx.stroke(); }

      ctx.fillStyle = '#ff5f57';
      ctx.fillRect(food.x*GRID+1, food.y*GRID+1, GRID-2, GRID-2);

      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? '#00fc40' : '#00fc40a0';
        ctx.fillRect(s.x*GRID+1, s.y*GRID+1, GRID-2, GRID-2);
      });
    };

    const keydown = (e: KeyboardEvent) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) e.preventDefault();
      
      if (e.key.toLowerCase() === 'x' || e.key === 'Escape') {
        e.preventDefault();
        onExit(); return;
      }
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        restartLogic(); return;
      }

      if (!gameOver) {
        if (e.key === 'ArrowUp' && dy === 0) { nextDx = 0; nextDy = -1; }
        if (e.key === 'ArrowDown' && dy === 0) { nextDx = 0; nextDy = 1; }
        if (e.key === 'ArrowLeft' && dx === 0) { nextDx = -1; nextDy = 0; }
        if (e.key === 'ArrowRight' && dx === 0) { nextDx = 1; nextDy = 0; }
      }
    };
    
    window.addEventListener('keydown', keydown);
    if (!gameOver) animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', keydown);
      cancelAnimationFrame(animId);
    };
  }, [gameOver, SPEED, difficulty, onExit, restartLogic]);

  useEffect(() => { if (score > highScore) setHighScore(score); }, [score, highScore]);

  return (
    <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
      <div className="font-display text-2xl font-bold tracking-widest text-[#00fc40] mb-2 uppercase">SNAKE.EXE</div>
      <div className="flex justify-between w-[400px] font-mono text-[11px] text-[#00fc40] mb-4">
        <span>SCORE: {score}</span>
        <span>DIFF: LVL {difficulty}</span>
        <span>HI: {highScore}</span>
      </div>
      <div className="relative rounded-lg overflow-hidden border border-[#262626] shadow-[0_0_20px_rgba(0,252,64,0.15)] bg-black">
        <canvas ref={canvasRef} width={400} height={400} className="block" />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-10">
            <span className="font-display text-2xl font-bold text-[#ff5f57] mb-2 tracking-widest">SYSTEM_FAILURE</span>
            <span className="font-mono text-[9px] text-[#777575] mb-6 tracking-widest uppercase">Collision anomaly</span>
            <button onClick={restartLogic} className="px-6 py-2 border border-[#00fc40] text-[#00fc40] font-mono text-[10px] rounded hover:bg-[#00fc40] hover:text-black transition-all uppercase tracking-widest z-20">
              Reboot sequence
            </button>
          </div>
        )}
      </div>
      <div className="font-mono text-[9px] text-[#777575] mt-6 tracking-widest uppercase text-center leading-loose">
        {'[ARROW KEYS] MOVE '}<br/>
        {'[R] RESTART | [ESC/X] SIGKILL'}
      </div>
    </div>
  );
}
