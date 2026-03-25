import React from 'react';
import { Send, Link as LinkIcon, Share2 } from 'lucide-react';

export default function Contact() {
  return (
    <section className="px-12 py-16 max-w-[1200px] mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        
        {/* Identity Card */}
        <div className="bg-surface-low rounded-xl border border-outline-variant/15 backdrop-blur-md overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-surface-highest">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[11px] text-on-surface-variant tracking-wider">identity.sys</span>
          </div>
          
          <div className="p-8">
            <h1 className="font-display text-4xl font-bold tracking-tight mb-2">
              SHOURYA<span className="text-primary text-glow-primary">_</span>SHETH
            </h1>
            <p className="font-mono text-[13px] text-primary-dim mb-2">System Architect // Builder</p>
            <p className="font-mono text-[11px] text-outline mb-6">ESTABLISHING SECURE<span className="text-primary animate-pulse">CONNECTION_</span></p>
            
            <p className="text-[14px] text-on-surface-variant leading-relaxed mb-8">
              Bridging the gap between high-performance backends and intuitive digital landscapes. Specialized in building resilient systems that thrive in complex environments.
            </p>

            <div className="mb-8">
              <h3 className="font-display text-[11px] font-semibold tracking-widest text-secondary mb-4">{`> SYSTEM_CAPABILITIES`}</h3>
              <div className="flex flex-wrap gap-2">
                <CapTag label="Full-Stack Dev" />
                <CapTag label="System Design" />
                <CapTag label="AI / ML" />
                <CapTag label="Cloud Infra" />
                <CapTag label="UI Engineering" />
                <CapTag label="API Design" />
              </div>
            </div>

            <div>
              <h3 className="font-display text-[11px] font-semibold tracking-widest text-secondary mb-4">{`> EXTERNAL_LINKS`}</h3>
              <div className="flex flex-col gap-3">
                <ExtLink icon={<LinkIcon size={16} className="text-primary-dim" />} name="GITHUB" path="/src/master" />
                <ExtLink icon={<Share2 size={16} className="text-primary-dim" />} name="LINKEDIN" path="/in/shourya-sheth" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-surface-low rounded-xl border border-outline-variant/15 backdrop-blur-md overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-surface-highest">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[11px] text-on-surface-variant tracking-wider">send_message.sh</span>
          </div>

          <div className="p-8">
            <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-3 tracking-tight">
              <span className="text-secondary">{`>`}</span>
              EXECUTE_<span className="text-primary text-glow-primary">MESSAGE</span>
            </h2>

            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-display text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase">SENDER_ID</label>
                <input type="text" className="bg-transparent border-b border-outline-variant/60 py-2 font-mono text-[13px] text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline" placeholder="Enter your designation..." />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-display text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase">COMM_CHANNEL</label>
                <input type="email" className="bg-transparent border-b border-outline-variant/60 py-2 font-mono text-[13px] text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline" placeholder="your_email@network.io" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-display text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase">SUBJECT_LINE</label>
                <input type="text" className="bg-transparent border-b border-outline-variant/60 py-2 font-mono text-[13px] text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline" placeholder="Message classification..." />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="font-display text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase">MESSAGE_BODY</label>
                <textarea className="bg-transparent border border-outline-variant/60 rounded-md p-3 font-mono text-[13px] text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline min-h-[140px] resize-y" placeholder="Compose your transmission..." />
              </div>

              <button type="button" className="mt-4 inline-flex items-center justify-center self-start gap-2 bg-primary text-on-primary font-display font-semibold tracking-wider text-[13px] px-6 py-3 rounded-md hover:-translate-y-[1px] box-glow-primary transition-all">
                <Send size={16} />
                TRANSMIT_MESSAGE
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

function CapTag({ label }: { label: string }) {
  return (
    <span className="font-display text-[10px] font-semibold tracking-widest text-on-surface-variant bg-surface-high px-3 py-1.5 rounded-sm hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20 cursor-default uppercase">
      {label}
    </span>
  );
}

function ExtLink({ icon, name, path }: { icon: React.ReactNode, name: string, path: string }) {
  return (
    <a href="#" className="flex items-center gap-4 p-3 bg-surface rounded-md hover:bg-primary/5 transition-colors group border border-outline-variant/15 hover:border-primary/20">
      <div className="shrink-0">{icon}</div>
      <div>
        <span className="block font-display text-[12px] font-bold text-on-surface tracking-wider group-hover:text-primary transition-colors">{name}</span>
        <span className="block font-mono text-[10px] text-outline mt-0.5">{path}</span>
      </div>
    </a>
  );
}
