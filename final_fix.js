import fs from 'fs';
let c = fs.readFileSync('src/pages/Games.tsx', 'utf8');

c = "import RightSidebar from '@/components/RightSidebar';\n" + c;

const startToken = '{/* Right Sidebar - Contact/Comms */}';
const startIdx = c.indexOf(startToken);

if (startIdx !== -1) {
    c = c.substring(0, startIdx) + "<RightSidebar />\n      </div>\n    </div>\n  );\n}\n";
}

c = c.split('admin@shourya:~$').join('admin@shourya:~/games$');

// Fix global click handler
const clickHandlerObj = /const handleGlobalClick = \(\) => \{\s*if \(window\.getSelection\(\)\?\.toString\(\)\.length === 0\) \{\s*inputRef\.current\?\.focus\(\);\s*\}\s*\};/;
  
if (clickHandlerObj.test(c)) {
   const replacement = `const handleGlobalClick = (e: MouseEvent) => {
   if ((e.target as HTMLElement).closest('input, textarea, button, a')) return;
   if (window.getSelection()?.toString().length === 0) {
     inputRef.current?.focus();
   }
 };`;
   c = c.replace(clickHandlerObj, replacement);
   c = c.replace(/document\.addEventListener\('click', handleGlobalClick\);/g, "document.addEventListener('click', handleGlobalClick as EventListener);");
   c = c.replace(/document\.removeEventListener\('click', handleGlobalClick\);/g, "document.removeEventListener('click', handleGlobalClick as EventListener);");
}

fs.writeFileSync('src/pages/Games.tsx', c);
console.log('Fixed Games completely');
