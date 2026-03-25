import React, { useEffect, useState } from 'react';

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [linesVisible, setLinesVisible] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const sequence = [0, 400, 800, 1200, 1600, 2000, 2400];
    const timeouts = sequence.map((delay, index) => 
      setTimeout(() => setLinesVisible(index + 1), delay)
    );

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + 2, 100));
    }, 50);

    // Hide screen after completion
    const hideTimeout = setTimeout(() => {
      setHidden(true);
      setTimeout(onComplete, 600); // Wait for fade out
    }, 3500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(hideTimeout);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div className={`fixed inset-0 bg-surface-lowest z-[9999] flex items-center justify-center transition-opacity duration-600 ${hidden ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-[90%] max-w-[600px]">
        <div className="font-display text-5xl font-bold text-primary mb-8 tracking-tighter text-glow-primary">
          S_S
        </div>
        
        <div className="font-mono text-sm text-on-surface-variant flex flex-col gap-2">
          {linesVisible > 0 && <p>[ <span className="text-secondary font-bold">OK</span> ] Initializing core architecture modules...</p>}
          {linesVisible > 1 && <p>[ <span className="text-secondary font-bold">OK</span> ] Loading neural interface v2.0...</p>}
          {linesVisible > 2 && <p>[ <span className="text-secondary font-bold">OK</span> ] Establishing connection to global_data_mesh...</p>}
          {linesVisible > 3 && <p>[ <span className="text-secondary font-bold">OK</span> ] Authenticating user credentials...</p>}
          {linesVisible > 4 && <p className="mt-2">{`>>`} IDENTITY_AUTH: <span className="text-secondary font-bold">VERIFIED</span></p>}
          {linesVisible > 5 && <p>{`>>`} Welcome, <span className="text-primary text-glow-primary">SHOURYA_SHETH</span></p>}
          {linesVisible > 6 && <p>{`>>`} Loading environment<span className="animate-pulse text-primary">_</span></p>}
        </div>

        <div className="mt-8 h-[3px] bg-surface-high rounded-sm overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-dim to-primary-container box-glow-primary transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
