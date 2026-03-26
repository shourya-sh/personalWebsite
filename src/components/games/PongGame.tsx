import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Props {
  difficulty: number;
  onExit: () => void;
}

export default function PongGame({ difficulty, onExit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const resetRef = useRef(false);

  const AI_SPEED = difficulty === 1 ? 0.04 : difficulty === 2 ? 0.08 : 0.16;
  const BALL_SPEED = difficulty === 1 ? 4 : difficulty === 2 ? 5 : 7;

  const restartLogic = useCallback(() => {
    resetRef.current = true;
    setScore({ p1: 0, p2: 0 });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;

    let animId: number;
    let ball = { x: 250, y: 150, dx: BALL_SPEED, dy: BALL_SPEED, r: 6 };
    let p1 = { y: 120, w: 10, h: 70 };
    let p2 = { y: 120, w: 10, h: 70 };
    let upPressed = false;
    let downPressed = false;

    const draw = () => {
      if (resetRef.current) {
        ball = { x: 250, y: 150, dx: BALL_SPEED, dy: BALL_SPEED, r: 6 };
        p1.y = 120; p2.y = 120;
        resetRef.current = false;
      }

      animId = requestAnimationFrame(draw);

      ctx.fillStyle = '#101010';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#262626';
      ctx.beginPath(); ctx.setLineDash([5, 15]);
      ctx.moveTo(canvas.width/2, 0); ctx.lineTo(canvas.width/2, canvas.height);
      ctx.stroke(); ctx.setLineDash([]);

      // Move player paddle
      if (upPressed && p1.y > 0) p1.y -= 7;
      if (downPressed && p1.y < canvas.height - p1.h) p1.y += 7;

      // AI paddle
      let destY = ball.y - p2.h/2;
      p2.y += (destY - p2.y) * AI_SPEED;
      if (p2.y < 0) p2.y = 0;
      if (p2.y > canvas.height - p2.h) p2.y = canvas.height - p2.h;

      // Ball physics
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Collision Y bounds
      if (ball.y <= ball.r || ball.y >= canvas.height - ball.r) ball.dy *= -1;

      // Left paddle hit
      if (ball.dx < 0 && ball.x - ball.r <= 20 + p1.w && ball.y >= p1.y && ball.y <= p1.y + p1.h) {
        ball.dx *= -1.05; ball.dy += (Math.random() - 0.5) * 4; ball.x = 20 + p1.w + ball.r;
      }
      // Right paddle hit
      if (ball.dx > 0 && ball.x + ball.r >= canvas.width - 30 && ball.y >= p2.y && ball.y <= p2.y + p2.h) {
        ball.dx *= -1.05; ball.x = canvas.width - 30 - ball.r;
      }

      // Out of bounds / Score
      if (ball.x < 0) { setScore(s => ({ ...s, p2: s.p2 + 1 })); resetBall(); }
      if (ball.x > canvas.width) { setScore(s => ({ ...s, p1: s.p1 + 1 })); resetBall(); }

      function resetBall() {
        ball = { x: 250, y: 150, dx: (ball.dx > 0 ? -BALL_SPEED : BALL_SPEED), dy: (Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED), r: 6 };
      }

      ctx.fillStyle = '#a1faff';
      ctx.shadowBlur = 15; ctx.shadowColor = '#a1faff';
      ctx.fillRect(20, p1.y, p1.w, p1.h);
      
      ctx.fillStyle = '#ff5f57';
      ctx.shadowColor = '#ff5f57';
      ctx.fillRect(canvas.width - 30, p2.y, p2.w, p2.h);

      ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
      ctx.fillStyle = '#ffffff'; ctx.shadowColor = '#ffffff'; ctx.fill(); ctx.closePath();
      ctx.shadowBlur = 0;
    };

    const keydown = (e: KeyboardEvent) => {
      if (['ArrowUp','ArrowDown'].includes(e.key)) e.preventDefault();
      
      if (e.key.toLowerCase() === 'x' || e.key === 'Escape') {
        e.preventDefault();
        onExit(); return;
      }
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        restartLogic(); return;
      }

      if (e.key === 'ArrowUp') upPressed = true;
      if (e.key === 'ArrowDown') downPressed = true;
    };
    const keyup = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') upPressed = false;
      if (e.key === 'ArrowDown') downPressed = false;
    };

    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
      cancelAnimationFrame(animId);
    };
  }, [difficulty, AI_SPEED, BALL_SPEED, onExit, restartLogic]);

  return (
    <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
      <div className="font-display text-2xl font-bold tracking-widest text-[#a1faff] mb-2 uppercase">PONG.SH</div>
      <div className="flex justify-between items-center w-[500px] mb-4 px-8">
        <span className="font-display text-2xl font-bold text-[#a1faff]">{score.p1}</span>
        <span className="font-mono text-[10px] text-[#777575]">DIFF: LVL {difficulty}</span>
        <span className="font-display text-2xl font-bold text-[#ff5f57]">{score.p2}</span>
      </div>
      <div className="rounded-lg overflow-hidden border border-[#262626] shadow-[0_0_20px_rgba(161,250,255,0.1)] bg-black">
        <canvas ref={canvasRef} width={500} height={300} className="block" />
      </div>
      <div className="font-mono text-[9px] text-[#777575] mt-6 tracking-widest uppercase text-center leading-loose">
        {'[UP/DOWN] INTERCEPT '}<br/>
        {'[R] RESTART | [ESC/X] SIGKILL'}
      </div>
    </div>
  );
}
