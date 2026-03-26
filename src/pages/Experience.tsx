import React from 'react';

export default function Experience() {
  return (
    <section className="px-12 pt-16 pb-4 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center gap-3 mb-12">
        <span className="text-secondary font-semibold text-2xl">{`>`}</span>
        <h2 className="font-display text-4xl font-bold tracking-tight">
          /usr/bin/<span className="text-primary text-glow-primary">HISTORY</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative animate-[fadeIn_0.5s_ease-out]">
        <TimelineItem 
          theme="secondary"
          tag="RISK_CONSULTANT"
          role="Technology Risk Consultant Intern"
          company="@ EY - Incoming"
          period="May 2026 - Aug 2026"
          desc="Assist in evaluating AI enabled systems and related controls as part of Technology Risk and Assurance engagements."
        />
        <TimelineItem 
          theme="primary"
          tag="MATH_INSTRUCTOR"
          role="Mathematics Instructor"
          company="@ Mathnasium"
          period="Mar 2024 - Dec 2025"
          desc="Worked with students of all ages to strengthen math skills, help with schoolwork, and build confidence through one-on-one support."
        />
        <TimelineItem 
          theme="tertiary"
          tag="ROBOTICS_LEAD"
          role="Robotics Instructor"
          company="@ Zebra Robotics"
          period="Mar 2023 - Mar 2024"
          desc="Taught students how to build and program lego robots through hands-on lessons and projects. Helped them develop problem-solving skills while making STEM fun and engaging."
        />
        <TimelineItem 
          theme="accent"
          tag="UMPIRE_OFFICIAL"
          role="Baseball Umpire"
          company="@ MSBA"
          period="2022 - Present"
          desc="Officiated competitive baseball games, making quick decisions and keeping games running smoothly in a fast-paced environment."
          isLast
        />
      </div>


    </section>
  );
}

function TimelineItem({ tag, role, company, period, desc, isLast, theme }: { tag: string, role: string, company: string, period: string, desc: string, isLast?: boolean, theme: 'primary' | 'secondary' | 'tertiary' | 'accent' }) {
  
  const getThemeStyles = () => {
    switch(theme) {
      case 'secondary': return {
        node: 'bg-[#00fc40] shadow-[0_0_10px_rgba(0,252,64,0.5)]',
        line: 'from-[#00fc40]/50 to-transparent',
        tagBg: 'bg-[#00fc40]/10 text-[#00fc40] border border-[#00fc40]/20',
        hover: 'hover:border-[#00fc40]/30 hover:shadow-[0_8px_30px_rgba(0,252,64,0.1)]',
        companyText: 'text-[#00fc40]'
      };
      case 'tertiary': return {
        node: 'bg-[#ac89ff] shadow-[0_0_10px_rgba(172,137,255,0.5)]',
        line: 'from-[#ac89ff]/50 to-transparent',
        tagBg: 'bg-[#ac89ff]/10 text-[#ac89ff] border border-[#ac89ff]/20',
        hover: 'hover:border-[#ac89ff]/30 hover:shadow-[0_8px_30px_rgba(172,137,255,0.1)]',
        companyText: 'text-[#ac89ff]'
      };
      case 'accent': return {
        node: 'bg-[#ff5f57] shadow-[0_0_10px_rgba(255,95,87,0.5)]',
        line: 'from-[#ff5f57]/50 to-transparent',
        tagBg: 'bg-[#ff5f57]/10 text-[#ff5f57] border border-[#ff5f57]/20',
        hover: 'hover:border-[#ff5f57]/30 hover:shadow-[0_8px_30px_rgba(255,95,87,0.1)]',
        companyText: 'text-[#ff5f57]'
      };
      default: return {
        node: 'bg-[#a1faff] shadow-[0_0_10px_rgba(161,250,255,0.5)]',
        line: 'from-[#a1faff]/50 to-transparent',
        tagBg: 'bg-[#a1faff]/10 text-[#a1faff] border border-[#a1faff]/20',
        hover: 'hover:border-[#a1faff]/30 hover:shadow-[0_8px_30px_rgba(161,250,255,0.1)]',
        companyText: 'text-[#a1faff]'
      };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={`flex gap-6 group ${isLast ? '' : 'mb-8'}`}>
      <div className="flex flex-col items-center shrink-0 w-5">
        <div className={`w-3 h-3 rounded-full mt-4 shrink-0 transition-all duration-300 ${styles.node}`} />
        {!isLast && <div className={`w-[2px] grow bg-gradient-to-b mt-2 mb-[-32px] ${styles.line}`} />}
      </div>
      
      <div className={`flex-1 bg-[#101010] rounded-xl overflow-hidden border border-[#1f1f1f] transition-all duration-300 ${styles.hover}`}>
        {/* MacOS-style Window Decorator */}
        <div className="px-4 py-2.5 bg-[#181818] border-b border-[#1f1f1f] flex gap-1.5 items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[9px] text-[#777575] tracking-widest leading-none relative top-[1px]">JOB_EXECUTION</span>
        </div>
        <div className="p-5 md:p-6 bg-[#0a0a0a]">
          <span className={`font-mono text-[9px] font-bold tracking-wider px-2 py-1 rounded inline-block mb-4 uppercase ${styles.tagBg}`}>
            {tag}
          </span>
          <h3 className="font-display text-[15px] sm:text-lg font-bold text-white mb-2 tracking-wide">{role}</h3>
          <p className={`font-mono text-[11px] mb-3 ${styles.companyText}`}>{company}</p>
          <p className="font-mono text-[11px] text-[#a1a1a1] font-medium mb-4 tracking-wider">{period}</p>
          <p className="font-mono text-[11.5px] text-[#a1a1a1] leading-loose max-w-3xl">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function SkillBar({ name, level, fill, theme }: { name: string, level: string, fill: number, theme: string }) {
  const getGradient = () => {
    switch (theme) {
      case 'secondary': return 'from-secondary-dim to-secondary box-glow-secondary shadow-[0_0_8px_rgba(0,252,64,0.3)]';
      case 'tertiary': return 'from-tertiary-dim to-tertiary shadow-[0_0_8px_rgba(172,137,255,0.3)]';
      default: return 'from-primary-dim to-primary box-glow-primary shadow-[0_0_8px_rgba(0,244,254,0.3)]';
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-display text-sm font-medium text-on-surface">{name}</span>
        <span className="font-mono text-xs text-primary-dim">{level}</span>
      </div>
      <div className="h-1.5 bg-surface-highest rounded-[3px] overflow-hidden flex gap-[3px]">
        <div 
          className={`h-full bg-gradient-to-r rounded-[3px] transition-all duration-1000 ${getGradient()}`}
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}
