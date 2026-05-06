import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Code, Printer } from 'lucide-react';
import RightSidebar from '@/components/RightSidebar';
import { useSidebar } from '@/context/SidebarContext';

const RESUME_ASCII = String.raw`
    ____  ___________ __  ____  _________
   / __ \/ ____/ ___// / / /  |/  / ____/
  / /_/ / __/  \__ \/ / / / /|_/ / __/   
 / _, _/ /___ ___/ / /_/ / /  / / /___   
/_/ |_/_____//____/\____/_/  /_/_____/   
`;

const B = ({ children }: { children: React.ReactNode }) => <span className="font-bold">{children}</span>;
const LINE = '==========================================================================================';
const DASH = '------------------------------------------------------------------------------------------';

const JL = ({ left, right }: { left: React.ReactNode, right: React.ReactNode }) => (
  <div className="flex justify-between w-full">
    <span>{left}</span>
    <span className="text-right ml-4 shrink-0">{right}</span>
  </div>
);

function ResumeContent() {
  return (
    <div className="font-mono text-black/90 tracking-tight leading-[1.5] text-[9px] sm:text-[10px] md:text-[11.5px] lg:text-[13px]">
      {/* Centered Header */}
      <div className="flex flex-col items-center text-center mb-6 pb-4 border-b border-black/5">
        <h1 className="text-xl sm:text-2xl md:text-2xl font-bold uppercase tracking-tight mb-2">SHOURYA SHETH</h1>
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11.5px] md:text-[13px] opacity-70">
          <span>647-507-6807</span>
          <span className="text-black/20">•</span>
          <a href="mailto:shourya.sh7@gmail.com" className="hover:underline">shourya.sh7@gmail.com</a>
          <span className="text-black/20">•</span>
          <a href="https://linkedin.com/in/shourya-sheth" target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/shourya-sheth</a>
          <span className="text-black/20">•</span>
          <a href="https://github.com/shourya-sh" target="_blank" rel="noreferrer" className="hover:underline">github.com/shourya-sh</a>
        </div>
      </div>

      <div className="space-y-4">
        {/* EDUCATION */}
        <div>
          <div className="opacity-50 mb-1">{LINE}</div>
          <B>EDUCATION</B>
          <div className="opacity-50 mt-1 mb-2">{LINE}</div>
          <div className="space-y-1">
            <JL left="University of Waterloo — BCS Computer Science (Honours), 4.0 GPA" right="Sept 2025 – Present" />
            <JL left="Wilfrid Laurier University — BBA Business Administration (Honours), 11/12 GPA" right="Sept 2025 – Present" />
            <JL left="The Woodlands Secondary School — OSSD, 98.5 Average" right="Sept 2021 – June 2025" />
          </div>
        </div>

        {/* EXPERIENCE */}
        <div>
          <div className="opacity-50 mb-1">{LINE}</div>
          <B>EXPERIENCE</B>
          <div className="opacity-50 mt-1 mb-2">{LINE}</div>
          <div className="space-y-4">
            <div>
              <JL left={<B>Incoming Technology Risk Management Consultant — EY Assurance, Toronto</B>} right="May 2026 – Present" />
              <div className="mt-1 space-y-0.5">
                <div>- Support assessments of AI governance, risk, and control frameworks focusing on Responsible AI</div>
                <div>- Evaluate AI-enabled systems and related controls for Technology Risk and Assurance engagements</div>
                <div>- Contribute to risk reporting and development of AI risk assessment tools for client deliverables</div>
              </div>
            </div>
            <div>
              <JL left={<B>Mathematics Instructor — Mathnasium Inc., Mississauga</B>} right="March 2024 – Dec 2025" />
              <div className="mt-1 space-y-0.5">
                <div>- Facilitated learning for Gr. 1-12 students in foundational math and homework support</div>
                <div>- Taught functions, trigonometry, calculus, algebraic/geometric vectors and beyond</div>
                <div>- Delivered sessions both in person and online to maximize reach</div>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTS */}
        <div>
          <div className="opacity-50 mb-1">{LINE}</div>
          <B>PROJECTS</B>
          <div className="opacity-50 mt-1 mb-2">{LINE}</div>
          <div className="space-y-4">
            <div>
              <JL left={<><B>Communico</B> | React Native, JS, Gemini, OpenRouter, Elevenlabs, face-api.js</>} right="January 2026" />
              <div className="mt-1 space-y-0.5">
                <div>- Built a React Native AAC app for minimal/nonverbal speakers with picture-tile sentence building,</div>
                <div>  live transcription, drawing sentiment analysis, TTS, emotion detection, and AI suggestions</div>
                <div>- Won Best Accessibility Hack at DeltaHacks 12</div>
              </div>
            </div>
            <div>
              <JL left={<><B>Derivative Hedging via RL</B> | Python, MatPlotLib, TensorFlow</>} right="Nov 2026 – Present" />
              <div className="mt-1 space-y-0.5">
                <div>- Designed state spaces with GBM price movements, Greeks, and portfolio exposure for RL agents</div>
                <div>- Evaluated agent vs baseline hedging using cumulative P&L, risk metrics, and Matplotlib dashboards</div>
              </div>
            </div>
            <div>
              <JL left={<><B>Autonomous Magnetic Antifouling Bot</B> | Arduino, C++, Fusion 360</>} right="Jan 2023 – Aug 2025" />
              <div className="mt-1 space-y-0.5">
                <div>- Created autonomous magnetic robot prototype for biofouling removal on industrial vessels</div>
                <div>- Won 2nd internationally at World Robotics Olympiad (Panama); $1000 grant from Ontario's LG</div>
              </div>
            </div>
          </div>
        </div>

        {/* TECHNICAL SKILLS */}
        <div>
          <div className="opacity-50 mb-1">{LINE}</div>
          <B>TECHNICAL SKILLS</B>
          <div className="opacity-50 mt-1 mb-2">{LINE}</div>
          <div className="space-y-1">
            <div><B>Languages:</B> Java, Python, C/C++, SQL, JS/TS, HTML/CSS, Racket</div>
            <div><B>Frameworks:</B> React, React Native, Node.js, Flask, FastAPI</div>
            <div><B>Dev Tools:</B> Git, GitHub, VS Code, Jupyter, Cursor</div>
            <div><B>Libraries:</B> pandas, NumPy, Matplotlib, TensorFlow</div>
            <div><B>Productivity:</B> MS365, Google Drive, Notion, Slack</div>
          </div>
        </div>

        <div className="pt-4 border-t border-black/5">
          <div className="opacity-40">{DASH}</div>
          <div className="flex justify-between items-center mt-1">
            <span className="opacity-60">[EOF] shourya_resume_v2.0.txt</span>
            <span className="opacity-60 text-right">Rendered: 2026.04.22</span>
          </div>
          <div className="opacity-40">{DASH}</div>
        </div>
      </div>
    </div>
  );
}

export default function Resume() {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay for a "loading document" feel
    const timer = setTimeout(() => setIsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className={`h-screen grid grid-cols-1 transition-all duration-300 ease-in-out bg-[#050505] selection:bg-black selection:text-white print:bg-white
        ${isOpen ? 'xl:grid-cols-[1fr_260px]' : 'xl:grid-cols-[1fr_0px]'}
      `}
    >
      <div className="flex flex-col items-center overflow-y-auto overflow-x-hidden relative h-full w-full">
        {/* Top Section: ASCII Header + Back Button + Action Buttons */}
        <div className="w-full max-w-4xl px-4 md:px-8 pt-6 pb-4 z-50 print:hidden animate-[fadeIn_0.6s_ease-out] relative">
          
          {/* Back Button - Pixel Arrow (Top Right) */}
          <div 
            onClick={() => navigate('/')}
            className="absolute top-6 right-8 z-50 flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' } as any} className="opacity-80 group-hover:opacity-100 transition-opacity">
                <path d="M10 32L34 8V22H54V42H34V56L10 32Z" fill="white" />
                <rect x="36" y="24" width="12" height="16" fill="rgba(0,0,0,0.2)" />
              </svg>
              <div className="absolute inset-0 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-mono text-[10px] md:text-[12px] text-[#777575] text-center group-hover:bg-white group-hover:text-black px-2 py-0.5 transition-all uppercase tracking-widest leading-none">
              BACK.EXE
            </span>
          </div>

          {/* ASCII Header */}
          <div className="ascii-title-filled font-mono text-[8.5px] sm:text-[10.5px] lg:text-[13px] leading-tight mb-4 select-none pr-28">
            <pre>{RESUME_ASCII}</pre>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 flex-wrap">
            <a 
              href="/Resume.pdf" 
              download 
              className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-[#1f1f1f] text-[#555] hover:text-[#a1faff] hover:border-[#a1faff]/30 hover:bg-[#151515] transition-all font-mono text-[10px] uppercase tracking-widest group"
            >
              <Download size={12} className="group-hover:text-[#a1faff] transition-colors" /> DOWNLOAD.PDF
            </a>
            <a 
              href="/resume.tex" 
              download 
              className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-[#1f1f1f] text-[#555] hover:text-[#a1faff] hover:border-[#a1faff]/30 hover:bg-[#151515] transition-all font-mono text-[10px] uppercase tracking-widest group"
            >
              <Code size={12} className="group-hover:text-[#a1faff] transition-colors" /> SOURCE.TEX
            </a>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-[#1f1f1f] text-[#555] hover:text-[#a1faff] hover:border-[#a1faff]/30 hover:bg-[#151515] transition-all font-mono text-[10px] uppercase tracking-widest group"
            >
              <Printer size={12} className="group-hover:text-[#a1faff] transition-colors" /> PRINT.EXE
            </button>
          </div>
        </div>

        {/* The "Paper" Document Wrapper */}
        <div className={`w-full max-w-4xl px-4 pb-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Subtle decorative shadow container */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ffffff10] to-[#ffffff05] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Main Paper Content */}
            <div className="relative bg-white text-black p-6 md:p-10 lg:p-14 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] font-mono leading-relaxed overflow-hidden">
              
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply" />
              
              {/* Very subtle CRT/Print Scanline effect for that retro feel */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[length:100%_4px]" />

              {/* Resume Content */}
              <ResumeContent />

              {/* Bottom Margin for realism */}
              <div className="h-6" />
            </div>
          </div>

          {/* Action Footer (Mobile only/convenience) */}
          <div className="mt-12 text-center text-[#333] font-mono text-[10px] tracking-[0.3em] uppercase print:hidden">
            —— End of Document ——
          </div>
        </div>
      </div>

      <div className="print:hidden">
        <RightSidebar />
      </div>

      {/* Global CSS for printing and scrollbars */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .shadow-xl, .shadow-\\[0_35px_60px_-15px_rgba\\(0\\,0\\,0\\,0\\.8\\)\\] { box-shadow: none !important; }
        }
        
        /* Modern Scrollbar for the dark page background */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #222;
        }
      `}} />
    </div>
  );
}
