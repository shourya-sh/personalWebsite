import React from 'react';

export default function Games() {
  return (
    <section className="px-12 py-16 max-w-[1200px] mx-auto w-full flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center">
      <div className="w-24 h-24 rounded-2xl bg-[#a1faff]/10 flex items-center justify-center text-[#a1faff] mb-8 animate-pulse shadow-[0_0_30px_rgba(161,250,255,0.1)]">
        <span className="text-4xl">🎮</span>
      </div>
      <h1 className="font-display text-4xl font-bold text-white tracking-widest uppercase mb-4">
        MINIGAMES<span className="text-[#a1faff]">.SYS</span>
      </h1>
      <p className="font-mono text-[13px] text-[#777575] max-w-md mx-auto leading-relaxed">
        System modules are currently offline for maintenance. Highscores and local storage states have been preserved in /vault/saves.
      </p>
    </section>
  );
}
