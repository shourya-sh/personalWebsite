import fs from 'fs';
let c = fs.readFileSync('src/pages/Games.tsx', 'utf8');

if (!c.includes("import RightSidebar from '@/components/RightSidebar';")) {
    c = c.replace("import React", "import React;\nimport RightSidebar from '@/components/RightSidebar';\n// ");
}

const startIndex = c.indexOf('{/* Right Sidebar - Contact/Comms */}');
if (startIndex !== -1) {
    const EndText = '      </div>\n    </div>\n  );\n}';
    const endIndex = c.lastIndexOf(EndText);
    if (endIndex !== -1) {
        c = c.substring(0, startIndex) + '<RightSidebar />\n' + EndText;
    }
}

fs.writeFileSync('src/pages/Games.tsx', c);
console.log('Fixed Sidebar securely');
