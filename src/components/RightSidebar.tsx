import React, { useState } from 'react';
import { Github, Linkedin, Instagram, Mail, Link2, Send, CheckCircle, AlertTriangle, X, ChevronLeft, ShieldAlert } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

function ContactCard({ icon, iconBg, title, detail, href }: any) {
  const iconColor = iconBg?.includes('text-') ? iconBg.split(' ').find((c: string) => c.startsWith('text-')) : 'text-[#777575]';
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="relative block w-full border border-[#1f1f1f] bg-[#050505] hover:bg-[#0a0a0a] group cursor-pointer transition-all">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex gap-0 h-full min-h-[54px] relative z-10">
        <div className={`w-[58px] shrink-0 flex flex-col justify-center items-center border-r border-[#1f1f1f] bg-[#0a0a0a] group-hover:bg-[#111] transition-all ${iconColor}`}>
          <div className="scale-[1.15] opacity-70 group-hover:opacity-100 group-hover:scale-[1.35] transition-all drop-shadow-none group-hover:drop-shadow-[0_0_8px_currentColor]">
            {icon}
          </div>
        </div>
        
        <div className="flex-1 p-2.5 flex flex-col justify-center min-w-0">
          <div className="flex justify-between items-center mb-0.5">
            <h3 className="font-mono text-[11px] sm:text-[12px] font-bold text-white uppercase tracking-widest group-hover:text-[#a1faff] transition-colors truncate pr-2">{title}</h3>
            <span className="text-[7.5px] font-mono text-[#333] group-hover:text-[#a1faff] transition-colors uppercase tracking-widest shrink-0">Up</span>
          </div>
          <p className="font-mono text-[9px] text-[#555] truncate group-hover:text-[#cccccc] transition-colors">{detail}</p>
        </div>
      </div>
    </a>
  );
}

/* ─── Custom Error Modal ─────────────────────────────────────── */
function ErrorModal({ message, onClose }: { message: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="w-full max-w-sm bg-[#0a0a0a] border border-[#ff5f57]/50 shadow-[0_0_30px_rgba(255,95,87,0.2)] overflow-hidden">
        <div className="flex items-center justify-between h-8 px-3 bg-[#1a1a1a] border-b border-[#ff5f57]/30">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-[#ff5f57]" />
            <span className="font-mono text-[10px] text-[#ff5f57] font-bold tracking-widest uppercase">CRITICAL_ERROR</span>
          </div>
          <button onClick={onClose} className="text-[#555] hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ff5f57]/10 flex items-center justify-center border border-[#ff5f57]/20">
            <AlertTriangle size={24} className="text-[#ff5f57]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] text-[#ff5f57] font-bold uppercase tracking-widest">Validation Failed</p>
            <p className="font-mono text-[10px] text-[#777] leading-relaxed uppercase">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-2 bg-[#ff5f57]/10 hover:bg-[#ff5f57]/20 border border-[#ff5f57]/30 text-[#ff5f57] font-mono text-[10px] font-bold tracking-widest uppercase transition-all"
          >
            [ ACKNOWLEDGE ]
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared inner panel content ────────────────────────────── */
function SidebarPanelContent({
  onClose,
  formData,
  setFormData,
  status,
  setStatus,
  onSubmit,
  errorMessage,
}: {
  onClose: () => void;
  formData: { from: string; subject: string; body: string };
  setFormData: (d: any) => void;
  status: 'idle' | 'sending' | 'success' | 'error';
  setStatus: (s: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage: string;
}) {
  return (
    <>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-[70] p-1 text-[#777575] hover:text-[#ff5f57] transition-colors"
      >
        <X size={16} />
      </button>

      <div className="px-3 py-4 lg:px-4 flex-1 flex flex-col h-full overflow-hidden">
        <h2 className="font-mono text-[13px] sm:text-[14px] font-bold text-[#a1faff] tracking-widest flex items-center gap-2 mb-3 uppercase shrink-0">
          <Link2 size={13} /> CONNECT W/ ME!
        </h2>

        <div className="flex flex-col gap-2 flex-1 min-h-0">
          <div className="flex flex-col gap-2 shrink-0">
            <ContactCard
              icon={<Github size={19} />}
              iconBg="bg-[#ffffff]/10 text-white"
              title="GITHUB.COM"
              detail="shourya-sh"
              href="https://github.com/shourya-sh"
            />
            <ContactCard
              icon={<Linkedin size={19} />}
              iconBg="bg-[#a1faff]/10 text-[#a1faff]"
              title="LINKEDIN"
              detail="/in/shourya-sheth"
              href="https://www.linkedin.com/in/shourya-sheth-98a09b300/"
            />
            <ContactCard
              icon={<Instagram size={19} />}
              iconBg="bg-[#ac89ff]/10 text-[#ac89ff]"
              title="INSTAGRAM"
              detail="@shourya.s21"
              href="https://www.instagram.com/shourya.s21/"
            />
            <ContactCard
              icon={<Mail size={19} />}
              iconBg="bg-[#febc2e]/10 text-[#febc2e]"
              title="SECURE_EMAIL"
              detail="shourya.sh7@gmail.com"
              href="mailto:shourya.sh7@gmail.com"
            />
          </div>

          {/* Direct Message Form */}
          <div className="mt-1.5 border border-[#1f1f1f] bg-[#050505] p-2.5 flex flex-col gap-2 relative flex-1 min-h-[160px]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none"></div>
            
            <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-1.5 z-10 relative shrink-0">
              <span className="font-mono text-[9px] text-[#777575] uppercase tracking-widest flex items-center gap-1.5">
                <Send size={10} className="text-[#a1faff]" />
                DIRECT_MSG
              </span>
              {status === 'sending' && <span className="font-mono text-[8px] text-[#febc2e] animate-pulse">TRANSMITTING...</span>}
              {status === 'success' && <span className="font-mono text-[8px] text-[#00fc40] flex items-center gap-1"><CheckCircle size={9}/> DELIVERED</span>}
              {status === 'error' && <span className="font-mono text-[8px] text-[#ff5f57] flex items-center gap-1"><AlertTriangle size={9}/> {errorMessage}</span>}
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-1.5 z-10 relative flex-1">
              <input 
                type="text" 
                placeholder="FROM / NAME"
                disabled={status === 'sending'}
                value={formData.from}
                onChange={e => { setFormData({ ...formData, from: e.target.value }); setStatus('idle'); }}
                className="bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#a1faff]/50 outline-none text-white font-mono text-[10px] p-1.5 placeholder:text-[#333] transition-colors shrink-0"
                spellCheck={false}
              />
              <input 
                type="text" 
                placeholder="SUBJECT"
                disabled={status === 'sending'}
                value={formData.subject}
                onChange={e => { setFormData({ ...formData, subject: e.target.value }); setStatus('idle'); }}
                className="bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#a1faff]/50 outline-none text-white font-mono text-[10px] p-1.5 placeholder:text-[#333] transition-colors shrink-0"
                spellCheck={false}
              />
              <textarea 
                placeholder="TRANSMISSION BODY..."
                disabled={status === 'sending'}
                value={formData.body}
                onChange={e => { setFormData({ ...formData, body: e.target.value }); setStatus('idle'); }}
                className="bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#a1faff]/50 outline-none text-white font-mono text-[10px] p-1.5 placeholder:text-[#333] flex-1 min-h-[60px] resize-none transition-colors"
                spellCheck={false}
              />
              <button 
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="bg-[#111] hover:bg-[#a1faff]/10 border border-[#1f1f1f] hover:border-[#a1faff]/50 text-[#777575] hover:text-[#a1faff] font-mono text-[10px] font-bold tracking-widest uppercase py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                [ SEND ]
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Sys Log */}
      <div className="px-3 py-3 lg:px-4 border-t border-[#1f1f1f] font-mono text-[8px] text-[#494847] leading-relaxed shrink-0">
        <p>{`> COMMS: Interfaces bound.`}</p>
        <p className="animate-pulse">{`> SYS_LOG: Standby_`}</p>
      </div>
    </>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function RightSidebar({ asMobileOverlay = false }: { asMobileOverlay?: boolean }) {
  const { isOpen, toggleSidebar } = useSidebar();
  const stopProp = (e: React.MouseEvent) => e.stopPropagation();
  const [formData, setFormData] = useState({ from: '', subject: '', body: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing = [];
    if (!formData.from.trim()) missing.push('NAME/FROM');
    if (!formData.subject.trim()) missing.push('SUBJECT');
    if (!formData.body.trim()) missing.push('MESSAGE');

    if (missing.length > 0) {
      setErrorMessage(`THE FOLLOWING FIELDS ARE EMPTY: ${missing.join(', ')}`);
      setShowErrorModal(true);
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/shourya.sh7@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.from,
          _subject: `[Portfolio] ${formData.subject}`,
          message: formData.body,
          _template: 'table'
        })
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ from: '', subject: '', body: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setErrorMessage('TRANSMISSION_FAILED');
      }
    } catch {
      setStatus('error');
      setErrorMessage('NETWORK_ERROR');
    }
  };

  const sharedProps = {
    onClose: toggleSidebar,
    formData,
    setFormData,
    status,
    setStatus,
    onSubmit: handleSend,
    errorMessage,
  };

  /* ── Mobile overlay (asMobileOverlay=true) ── */
  if (asMobileOverlay) {
    return (
      <>
        {/* Backdrop — purely visual, pointer-events-none so the page behind remains interactive */}
        {isOpen && (
          <div
            className="xl:hidden fixed inset-0 bg-black/50 backdrop-blur-[1px] z-[59] pointer-events-none"
          />
        )}

        {/* Slide-in panel */}
        <div
          onClick={stopProp}
          className={`xl:hidden fixed inset-y-0 right-0 w-[min(300px,90vw)] flex flex-col bg-[#0a0a0a] border-l border-[#1f1f1f] z-[60] overflow-hidden transition-transform duration-300 ease-in-out relative
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <SidebarPanelContent {...sharedProps} />
        </div>

        {/* Floating re-open tab (mobile only, shown when closed) */}
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            className="xl:hidden fixed right-0 top-1/2 -translate-y-1/2 z-[100] bg-[#181818] border-l border-y border-[#1f1f1f] p-2 hover:bg-[#1f1f1f] text-[#a1faff] transition-all animate-[fadeIn_0.3s_ease-out] group"
          >
            <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        )}

        {showErrorModal && (
          <ErrorModal message={errorMessage} onClose={() => setShowErrorModal(false)} />
        )}
      </>
    );
  }

  /* ── Desktop column (default) ── */
  return (
    <>
      {/* Desktop re-open tab (shown when closed on xl+) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="hidden xl:flex fixed right-0 top-1/2 -translate-y-1/2 z-[100] bg-[#181818] border-l border-y border-[#1f1f1f] p-2 hover:bg-[#1f1f1f] text-[#a1faff] transition-all animate-[fadeIn_0.3s_ease-out] group"
        >
          <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Desktop column panel */}
      <div
        onClick={stopProp}
        className={`hidden xl:flex flex-col bg-[#0a0a0a] border-l border-[#1f1f1f] z-[60] overflow-hidden h-full transition-all duration-300 ease-in-out relative
          ${isOpen ? 'translate-x-0' : 'translate-x-full absolute right-0 w-0'}
        `}
      >
        <SidebarPanelContent {...sharedProps} />
      </div>

      {showErrorModal && (
        <ErrorModal message={errorMessage} onClose={() => setShowErrorModal(false)} />
      )}
    </>
  );
}
