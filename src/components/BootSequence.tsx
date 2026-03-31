import React, { useEffect, useState } from 'react';

function TypingText({ text, delay = 10, onComplete }: { text: string, delay?: number, onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);
  
  return <span>{displayed}</span>;
}

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [linesVisible, setLinesVisible] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [titleText, setTitleText] = useState('');
  const FULL_TITLE = "SHOURYA_SHETH";

  useEffect(() => {
    // Title typing effect
    let i = 0;
    const titleInterval = setInterval(() => {
      i++;
      setTitleText(FULL_TITLE.substring(0, i));
      if (i >= FULL_TITLE.length) clearInterval(titleInterval);
    }, 70);

    const sequence = [0, 400, 800, 1200, 1600, 2000, 2400];
    const timeouts = sequence.map((delay, index) => 
      setTimeout(() => setLinesVisible(index + 1), delay)
    );

    // Hide screen after completion
    const hideTimeout = setTimeout(() => {
      setHidden(true);
      setTimeout(onComplete, 600); // Wait for fade out
    }, 3800);

    return () => {
      clearInterval(titleInterval);
      timeouts.forEach(clearTimeout);
      clearTimeout(hideTimeout);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div className={`fixed inset-0 bg-surface-lowest z-[9999] flex items-center justify-center transition-opacity duration-600 ${hidden ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-[90%] max-w-[600px]">
        <div className="font-display text-5xl font-bold text-primary mb-8 tracking-tighter text-glow-primary min-h-[48px]">
          {titleText}<span className="animate-pulse">_</span>
        </div>
        
        <div className="font-mono text-sm text-on-surface-variant flex flex-col gap-2">
          {linesVisible > 0 && <p>[ <span className="text-secondary font-bold">OK</span> ] <TypingText text="Initializing core architecture modules..." delay={10} /></p>}
          {linesVisible > 1 && <p>[ <span className="text-secondary font-bold">OK</span> ] <TypingText text="Loading neural interface v2.0..." delay={10} /></p>}
          {linesVisible > 2 && <p>[ <span className="text-secondary font-bold">OK</span> ] <TypingText text="Establishing connection to global_data_mesh..." delay={10} /></p>}
          {linesVisible > 3 && <p>[ <span className="text-secondary font-bold">OK</span> ] <TypingText text="Authenticating user credentials..." delay={10} /></p>}
          {linesVisible > 4 && <p className="mt-2">{`>>`} IDENTITY_AUTH: <span className="text-secondary font-bold"><TypingText text="VERIFIED" delay={30} /></span></p>}
          {linesVisible > 5 && <p>{`>>`} Welcome, <span className="text-primary text-glow-primary"><TypingText text="USER" delay={50} /></span></p>}
          {linesVisible > 6 && <p>{`>>`} <TypingText text="Loading environment" delay={15} /><span className="animate-pulse text-primary">_</span></p>}
        </div>
      </div>
    </div>
  );
}
