import fs from 'fs';

// Fix Games.tsx focus
try {
    let games = fs.readFileSync('src/pages/Games.tsx', 'utf8');
    const gamesOld = "onClick={() => { if (gameState !== 'PLAYING') inputRef.current?.focus() }}";
    const gamesNew = "onClick={(e) => { if (gameState !== 'PLAYING' && !(e.target as HTMLElement).closest('input, textarea, button, a')) inputRef.current?.focus() }}";
    if (games.includes(gamesOld)) {
        games = games.replace(gamesOld, gamesNew);
        fs.writeFileSync('src/pages/Games.tsx', games);
        console.log('Fixed Games.tsx focus');
    }
} catch(e) {}

// Fix RightSidebar stop propagation
try {
    let sidebar = fs.readFileSync('src/components/RightSidebar.tsx', 'utf8');
    if (!sidebar.includes('onClick={stopProp}')) {
        sidebar = sidebar.replace(
            'export default function RightSidebar() {',
            'export default function RightSidebar() {\n  const stopProp = (e: React.MouseEvent) => e.stopPropagation();'
        );
        sidebar = sidebar.replace(
            '<div className="bg-[#0a0a0a]',
            '<div onClick={stopProp} className="bg-[#0a0a0a]'
        );
        fs.writeFileSync('src/components/RightSidebar.tsx', sidebar);
        console.log('Fixed RightSidebar stopProp');
    }
} catch(e) {}
