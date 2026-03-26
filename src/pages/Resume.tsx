import React, { useState, useEffect } from 'react';
import { FileText, Code, Download, Copy, CheckCircle2 } from 'lucide-react';

export default function Resume() {
  const [view, setView] = useState<'PDF' | 'TEX'>('PDF');
  const [texContent, setTexContent] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/resume.tex')
      .then(res => res.text())
      .then(text => setTexContent(text))
      .catch(() => setTexContent('% ERROR FETCHING SOURCE_CODE...'));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(texContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([texContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shourya_sheth_resume.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 h-full flex flex-col overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      <div className="shrink-0 mb-4">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white mb-1 flex items-center gap-3">
          <span className="text-[#a1faff] text-glow-primary">{`>`}</span>
          RESUME_VIEWER.SH
        </h1>
        <p className="text-[#777575] text-[12px] max-w-2xl leading-relaxed">
          Access compiled documentation or inspect raw LaTeX structural code.
        </p>
      </div>

      <div className="flex-1 bg-[#101010] rounded-xl border border-[#1f1f1f] flex flex-col overflow-hidden shadow-2xl relative min-h-0">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-[#181818] border-b border-[#1f1f1f] shrink-0 gap-3 sm:gap-0">
          <div className="flex bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg overflow-hidden shrink-0 shadow-sm shadow-black/50">
            <button 
              onClick={() => setView('PDF')}
              className={`flex items-center gap-2 px-4 py-2 font-display text-[10px] font-bold tracking-widest uppercase transition-all ${view === 'PDF' ? 'bg-[#00fc40]/10 text-[#00fc40]' : 'text-[#777575] hover:text-white hover:bg-white/5'}`}
            >
              <FileText size={14} /> PDF_RENDER
            </button>
            <div className="w-px bg-[#1f1f1f]" />
            <button 
              onClick={() => setView('TEX')}
              className={`flex items-center gap-2 px-4 py-2 font-display text-[10px] font-bold tracking-widest uppercase transition-all ${view === 'TEX' ? 'bg-[#a1faff]/10 text-[#a1faff]' : 'text-[#777575] hover:text-white hover:bg-white/5'}`}
            >
              <Code size={14} /> TEX_SOURCE
            </button>
          </div>

          <div className="flex items-center gap-4">
            {view === 'TEX' && (
              <>
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-[#777575] hover:text-white font-mono text-[9px] transition-colors uppercase tracking-wider">
                  {copied ? <CheckCircle2 size={12} className="text-[#00fc40]" /> : <Copy size={12} />} {copied ? 'COPIED' : 'COPY'}
                </button>
                <div className="w-px h-4 bg-[#1f1f1f]" />
                <button onClick={handleDownload} className="flex items-center gap-1.5 text-[#777575] hover:text-[#a1faff] font-mono text-[9px] transition-colors uppercase tracking-wider">
                  <Download size={12} /> DOWNLOAD.TEX
                </button>
              </>
            )}
            {view === 'PDF' && (
               <a href="/Resume.pdf" download className="flex items-center gap-1.5 text-[#777575] hover:text-[#00fc40] font-mono text-[9px] transition-colors uppercase tracking-wider">
                <Download size={12} /> DOWNLOAD.PDF
              </a>
            )}
          </div>
        </div>

        {/* Viewer Body */}
        <div className="flex-1 overflow-hidden bg-[#050505] relative">
          {view === 'PDF' ? (
            <iframe 
              src="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0" 
              className="w-full h-full border-none bg-white rounded-b-xl"
              title="Resume PDF"
            />
          ) : (
            <div className="w-full h-full overflow-y-auto p-6 md:p-8 font-mono text-[11px] md:text-[12px] leading-loose text-[#a1faff] whitespace-pre scrollbar-hide selection:bg-[#a1faff] selection:text-black">
              {texContent}
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-5 py-2.5 bg-[#131313] border-t border-[#1f1f1f] flex justify-between items-center font-mono text-[8px] tracking-widest text-[#777575] shrink-0">
          <div className="flex gap-8">
            <span>MODE: {view === 'PDF' ? 'READ_ONLY' : 'INSPECT'}</span>
            <span className={view === 'PDF' ? 'text-[#00fc40]' : 'text-[#a1faff]'}>FILE: {view === 'PDF' ? 'Resume.pdf' : 'resume.tex'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>BYTES: {view === 'TEX' ? texContent.length : '116053'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
