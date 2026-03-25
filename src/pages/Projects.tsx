import React from 'react';
import { Link2, PlusCircle } from 'lucide-react';

export default function Projects() {
  return (
    <section className="px-12 py-16 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col gap-2 mb-10">
        <div className="flex items-center gap-3">
          <span className="text-secondary font-semibold text-2xl">{`>`}</span>
          <h2 className="font-display text-4xl font-bold tracking-tight uppercase">
            PROJECT_<span className="text-primary text-glow-primary">FORGE</span>.SYS
          </h2>
        </div>
        <p className="text-on-surface-variant max-w-[680px] leading-relaxed text-[15px] pt-2">
          A collection of high-performance architectural deployments, experimental interfaces, and automated core modules compiled in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard 
          status="DEPLOYED" 
          name="CYBER_CORE_OS" 
          desc="Next-generation kernel interface designed for high-frequency algorithmic trade monitoring and visual data synthesis."
          tags={['PYTHON', 'REACT', 'D3.JS']} 
        />
        <ProjectCard 
          status="ACTIVE" 
          name="NEURAL_DREAMER" 
          desc="Advanced latent space explorer utilizing multi-modal AI models for real-time generative architectural visualization."
          tags={['TENSORFLOW', 'WEBGL', 'NODE']} 
        />
        <ProjectCard 
          status="LIVE" 
          isActive={true}
          name="VOID_ANALYTICS" 
          desc="Decentralized data pipeline visualization for monitoring cross-chain transactions across major protocol layers."
          tags={['RUST', 'GRAPHQL', 'AWS']} 
        />
        <ProjectCard 
          status="DEPLOYED" 
          name="SYNX_PROTOCOL" 
          desc="Ultra-low latency communication protocol for autonomous swarm robotics operating in high-interference environments."
          tags={['C++', 'MQTT', 'IOT']} 
        />
        <ProjectCard 
          status="BETA" 
          name="OMNI_VAULT" 
          desc="Zero-knowledge proof based asset management platform for secure institutional digital asset custody and clearance."
          tags={['SOLIDITY', 'ZK-SNARK', 'NEXT.JS']} 
        />

        {/* New Project Card */}
        <div className="bg-transparent border border-dashed border-outline-variant/50 rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-primary-dim hover:bg-primary/5 transition-all group min-h-[220px]">
          <PlusCircle size={36} className="text-outline mb-4 group-hover:text-primary-dim transition-colors" />
          <h3 className="font-display text-lg font-semibold text-on-surface mb-2">INITIALIZE_NEW_PROJ</h3>
          <p className="font-mono text-[11px] text-on-surface-variant">Create instance / deploy module to cluster</p>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ status, name, desc, tags, isActive }: { status: string, name: string, desc: string, tags: string[], isActive?: boolean }) {
  return (
    <div className="bg-surface-low rounded-xl flex flex-col border border-outline-variant/15 backdrop-blur-md transition-all hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,244,254,0.08)]">
      <div className="flex items-center justify-between px-4 py-3 bg-surface-highest">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className={`font-mono text-[10px] tracking-wider ${isActive ? 'text-primary text-glow-primary' : 'text-secondary'}`}>
          ● {status}
        </span>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-semibold text-on-surface mb-3">{name}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex-1">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="font-display text-[9px] font-semibold tracking-widest text-tertiary bg-tertiary/10 px-3 py-1 bg-opacity-10 rounded-sm inline-block border border-tertiary/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="px-6 py-3 bg-surface mt-auto border-t border-outline-variant/10">
        <a href="#" className="font-mono text-[11px] font-medium tracking-wider text-primary-dim flex items-center gap-2 hover:text-primary transition-colors">
          <Link2 size={14} /> VIEW_SOURCE
        </a>
      </div>
    </div>
  );
}
