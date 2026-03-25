import React from 'react';

export default function Education() {
  return (
    <section className="px-12 py-16 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center gap-3 mb-12">
        <span className="text-[#00fc40] font-semibold text-2xl">{`>`}</span>
        <h2 className="font-display text-4xl font-bold tracking-tight text-white uppercase">
          /archives/<span className="text-[#00fc40] drop-shadow-[0_0_8px_rgba(0,252,64,0.4)]">edu.txt</span>
        </h2>
      </div>

      <div className="relative mb-20">
        {/* Parallel University block */}
        <div className="flex gap-6 mb-8 group">
          <div className="flex flex-col items-center shrink-0 w-5">
            <div className="w-3 h-3 rounded-full bg-[#00fc40] shadow-[0_0_8px_rgba(0,252,64,0.6)] mt-4 shrink-0" />
            <div className="w-[2px] grow bg-gradient-to-b from-[#00fc40]/50 to-transparent mt-2" />
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <EduCard 
              tag="DUAL DEGREE"
              title="HONORS COMPUTER SCIENCE"
              school="@ UNIVERSITY OF WATERLOO"
              period="Sept 2025 — April 2030"
              desc="Focusing on advanced algorithms, software architecture, and computer science fundamentals."
            />
            <EduCard 
              tag="DUAL DEGREE"
              title="BUSINESS ADMINISTRATION"
              school="@ WILFRID LAURIER UNIVERSITY"
              period="Sept 2025 — April 2030"
              desc="Dual degree program bridging technology and executive business strategy."
            />
          </div>
        </div>

        {/* High School block */}
        <div className="flex gap-6 mb-8 group">
          <div className="flex flex-col items-center shrink-0 w-5">
            <div className="w-3 h-3 rounded-full bg-[#00fc40] shadow-[0_0_8px_rgba(0,252,64,0.6)] mt-4 shrink-0" />
          </div>
          
          <div className="flex-1">
            <EduCard 
              tag="FOUNDATION"
              title="SECONDARY EDUCATION DIPLOMA"
              school="@ THE WOODLANDS SECONDARY SCHOOL"
              period="Sept 2021 — June 2025"
              desc="Built foundational skills in mathematics and computer sciences, participating in collaborative STEM initiatives."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EduCard({ tag, title, school, period, desc }: any) {
  return (
    <div className="bg-[#131313] rounded-xl overflow-hidden border border-[#1f1f1f] transition-all hover:border-[#00fc40]/30 hover:shadow-[0_8px_30px_rgba(0,252,64,0.06)]">
      <div className="px-4 py-3 bg-[#181818] flex gap-1.5 border-b border-[#1f1f1f]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="p-8">
        <span className="font-display text-[10px] font-bold tracking-widest text-[#00fc40] bg-[#00fc40]/10 border border-[#00fc40]/20 px-3 py-1 rounded-[4px] inline-block mb-4 uppercase">
          {tag}
        </span>
        <h3 className="font-display text-xl font-bold text-white mb-2">{title}</h3>
        <p className="font-mono text-[12px] text-[#00fc40] mb-2">{school}</p>
        <p className="font-mono text-[11px] text-[#494847] mb-4">{period}</p>
        <p className="text-[14px] text-[#777575] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
