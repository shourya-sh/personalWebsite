import fs from 'fs';

const backButton = `
              {/* Back Button - Absolute Positioned to avoid layout shift */}
              <div
                onClick={() => {
                  setHistory(prev => [...prev, { out: 'Navigating to ROOT...', isSystem: true }]);
                  setTimeout(() => navigate('/'), 400);
                }}
                className="absolute top-6 right-10 z-50 flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }} className="opacity-80 group-hover:opacity-100 transition-opacity">
                    <path d="M10 32L34 8V22H54V42H34V56L10 32Z" fill="white" />
                    <rect x="36" y="24" width="12" height="16" fill="rgba(0,0,0,0.2)" />
                  </svg>
                  <div className="absolute inset-0 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-mono text-[10px] md:text-[12px] text-[#777575] text-center group-hover:bg-white group-hover:text-black px-2 py-0.5 transition-all uppercase tracking-widest leading-none">
                  BACK.EXE
                </span>
              </div>`;

// 1. Fix Games.tsx
let games = fs.readFileSync('src/pages/Games.tsx', 'utf8');
// Remove the broken insertion
games = games.replace(/<\/div>\s*>\s*<div/g, '</div>\n                <div');
// Ensure back button is there only once
if (!games.includes('BACK.EXE')) {
    games = games.replace('className="px-4 md:px-8 pt-3 pb-3 h-full overflow-y-auto overflow-x-hidden scrollbar-hide select-none transition-all border-b border-[#1f1f1f]/50">', 
                          'className="px-4 md:px-8 pt-3 pb-3 h-full overflow-y-auto overflow-x-hidden scrollbar-hide select-none transition-all border-b border-[#1f1f1f]/50 relative">\n' + backButton);
}
// Ensure padding for header
games = games.replace('justify-between gap-1 mb-2">', 'justify-between gap-1 mb-2 pr-28">');
fs.writeFileSync('src/pages/Games.tsx', games);

// 2. Fix Projects.tsx
let projects = fs.readFileSync('src/pages/Projects.tsx', 'utf8');
if (!projects.includes('BACK.EXE')) {
    projects = projects.replace('className="px-4 md:px-8 pt-3 pb-8 h-full overflow-y-auto overflow-x-hidden scrollbar-hide">',
                               'className="px-4 md:px-8 pt-3 pb-8 h-full overflow-y-auto overflow-x-hidden scrollbar-hide relative">\n' + backButton);
}
projects = projects.replace('justify-between mb-4">', 'justify-between mb-4 pr-28">');
fs.writeFileSync('src/pages/Projects.tsx', projects);

console.log('Fixed back buttons on Games and Projects pages.');
