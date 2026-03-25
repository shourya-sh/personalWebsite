import React from 'react';
import { NavLink } from 'react-router-dom';
import { FolderOpen, Code2, GraduationCap, TerminalSquare, Gamepad2, LogOut, UserSquare2 } from 'lucide-react';

export default function Sidebar() {
  return (
    <nav className="fixed left-0 top-0 w-[240px] h-screen bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col justify-between py-6 z-50">
      
      <div>
        {/* User Profile */}
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00fc40]/10 rounded-md flex items-center justify-center text-[#00fc40] border border-[#00fc40]/20">
            <UserSquare2 size={20} />
          </div>
          <div>
            <div className="font-display text-[13px] font-bold text-[#00fc40] uppercase tracking-wider">SYS_ADMIN</div>
            <div className="font-mono text-[10px] text-outline">v2.0.4-stable</div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col">
          <SidebarLink to="/" icon={<FolderOpen size={18} />} label="ROOT" exact={true} />
          <SidebarLink to="/projects" icon={<Code2 size={18} />} label="PROJECTS" />
          <SidebarLink to="/education" icon={<GraduationCap size={18} />} label="EDUCATION" />
          <SidebarLink to="/experience" icon={<TerminalSquare size={18} />} label="EXPERIENCE" />
          <SidebarLink to="/games" icon={<Gamepad2 size={18} />} label="GAMES" />
        </div>
      </div>

      {/* Logout */}
      <div className="px-4">
        <button className="flex items-center gap-3 px-6 py-3 w-full text-left font-display text-[12px] font-bold tracking-widest text-[#ff5f57] hover:bg-[#ff5f57]/5 transition-colors rounded-md group">
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          LOGOUT
        </button>
      </div>

    </nav>
  );
}

function SidebarLink({ to, icon, label, exact }: { to: string, icon: React.ReactNode, label: string, exact?: boolean }) {
  return (
    <NavLink 
      to={to}
      end={exact}
      className={({ isActive }) => `
        relative flex items-center gap-4 px-6 py-3.5 transition-all w-full
        ${isActive ? 'bg-[#00fc40]/5 text-[#00fc40]' : 'text-[#777575] hover:text-[#00fc40] hover:bg-[#00fc40]/5'}
      `}
    >
      {({ isActive }) => (
        <>
          {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00fc40] box-glow-secondary" />}
          <div className="shrink-0">{icon}</div>
          <span className="font-display text-[12px] font-bold tracking-widest uppercase">{label}</span>
        </>
      )}
    </NavLink>
  );
}
