import fs from 'fs';

let c = fs.readFileSync('src/pages/Games.tsx', 'utf8');

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

// Insert the back button and add padding to the header to avoid overlap
const searchStr = 'leading-relaxed text-[#777575] flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">';
const replaceStr = 'leading-relaxed text-[#777575] flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 pr-28">';

if (c.includes(searchStr)) {
    c = c.replace(searchStr, replaceStr);
}

const target = 'scrollbar-hide select-none transition-all border-b border-[#1f1f1f]/50"';
if (c.includes(target)) {
    c = c.replace(target, target + '>\n' + backButton);
    // remove the extra > that might be there if target matched partly
    c = c.replace(target + '>>', target + '>');
}

fs.writeFileSync('src/pages/Games.tsx', c);
console.log('Added back button to Games.tsx');
