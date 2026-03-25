import React from 'react';

export default function Experience() {
  return (
    <section className="px-12 py-16 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center gap-3 mb-12">
        <span className="text-secondary font-semibold text-2xl">{`>`}</span>
        <h2 className="font-display text-4xl font-bold tracking-tight">
          /usr/bin/<span className="text-primary text-glow-primary">HISTORY</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative mb-20">
        <TimelineItem 
          tag="CORE_ARCHITECT"
          role="INDEPENDENT DEVELOPER"
          company="@ PERSONAL_PROJECTS"
          period="Ongoing"
          desc="Building full-stack applications, experimenting with AI systems, and contributing to open-source development. Passionate about turning ideas into deployed products."
        />
        <TimelineItem 
          tag="BUILDER"
          role="EARLY PROTOTYPING"
          company="@ FOUNDATION_SYSTEMS"
          period="Completed"
          desc="Explored computer science fundamentals and laid the groundwork for advanced algorithmic study through early architectural deployments."
          isLast
        />
      </div>

      {/* Skills Matrix */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
          <span className="text-secondary">{`>`}</span>
          Skillset_Matrix
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillBar name="JavaScript / TypeScript" level="90%" fill={90} theme="primary" />
          <SkillBar name="Python" level="85%" fill={85} theme="primary" />
          <SkillBar name="React / Next.js" level="88%" fill={88} theme="primary" />
          <SkillBar name="Node.js / Backend" level="82%" fill={82} theme="secondary" />
          <SkillBar name="UI / UX Design" level="78%" fill={78} theme="tertiary" />
          <SkillBar name="AI / Machine Learning" level="75%" fill={75} theme="tertiary" />
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ tag, role, company, period, desc, isLast }: { tag: string, role: string, company: string, period: string, desc: string, isLast?: boolean }) {
  return (
    <div className="flex gap-6 mb-8 group">
      <div className="flex flex-col items-center shrink-0 w-5">
        <div className="w-3 h-3 rounded-full bg-primary box-glow-primary mt-4 shrink-0" />
        {!isLast && <div className="w-[2px] grow bg-gradient-to-b from-primary-dim to-transparent mt-2" />}
      </div>
      
      <div className="flex-1 bg-surface-low rounded-xl overflow-hidden border border-outline-variant/15 backdrop-blur-md transition-all hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(0,244,254,0.06)]">
        <div className="px-4 py-3 bg-surface-highest flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="p-6">
          <span className="font-display text-[10px] font-semibold tracking-widest text-surface-lowest bg-primary px-3 py-1 rounded-sm inline-block mb-3">
            {tag}
          </span>
          <h3 className="font-display text-xl font-semibold text-on-surface mb-1">{role}</h3>
          <p className="font-mono text-xs text-secondary mb-2">{company}</p>
          <p className="font-mono text-[11px] text-outline mb-3">{period}</p>
          <p className="text-sm text-on-surface-variant leading-relaxed">
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
