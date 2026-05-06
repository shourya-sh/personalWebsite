import fs from 'fs';

// 1. Fix RightSidebar to stop propagation
let sidebar = fs.readFileSync('src/components/RightSidebar.tsx', 'utf8');
if (!sidebar.includes('onClick={(e) => e.stopPropagation()}')) {
    sidebar = sidebar.replace(
        'export default function RightSidebar() {',
        'export default function RightSidebar() {\n  const stopProp = (e: React.MouseEvent) => e.stopPropagation();'
    );
    sidebar = sidebar.replace(
        '<div className="bg-[#0a0a0a]',
        '<div onClick={stopProp} className="bg-[#0a0a0a]'
    );
}
fs.writeFileSync('src/components/RightSidebar.tsx', sidebar);

// 2. Fix focus stealing in all pages
const pages = ['src/pages/Home.tsx', 'src/pages/Education.tsx', 'src/pages/Experience.tsx', 'src/pages/Games.tsx'];

for (const path of pages) {
    if (!fs.existsSync(path)) continue;
    let content = fs.readFileSync(path, 'utf8');
    
    // Replace simple focus click with smarter one
    const oldPattern = 'onClick={() => inputRef.current?.focus()}';
    const newPattern = 'onClick={(e) => { if (!(e.target as HTMLElement).closest(\'input, textarea, button, a\')) inputRef.current?.focus(); }}';
    
    if (content.includes(oldPattern)) {
        content = content.replace(oldPattern, newPattern);
        fs.writeFileSync(path, content);
        console.log(`Fixed focus in ${path}`);
    }
}

console.log('Sidebar and focus fixes applied.');
