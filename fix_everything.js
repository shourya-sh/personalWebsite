import fs from 'fs';

let ed = fs.readFileSync('src/pages/Education.tsx', 'utf8');
ed = ed.replace('institutionIcon={BookOpen}', 'institutionIcon="/woods.png"');
fs.writeFileSync('src/pages/Education.tsx', ed);

const files = ['src/pages/Home.tsx', 'src/pages/Education.tsx', 'src/pages/Experience.tsx', 'src/pages/Games.tsx'];

for (const file of files) {
  let c = fs.readFileSync(file, 'utf8');
  
  const clickHandlerObj = /const handleGlobalClick = \(\) => \{\s*if \(window\.getSelection\(\)\?\.toString\(\)\.length === 0\) \{\s*inputRef\.current\?\.focus\(\);\s*\}\s*\};/;
  
  if (clickHandlerObj.test(c)) {
      const replacement = `const handleGlobalClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea, button, a')) return;
      if (window.getSelection()?.toString().length === 0) {
        inputRef.current?.focus();
      }
    };`;
      c = c.replace(clickHandlerObj, replacement);
  }
  
  const clickHandlerEvt = /document\.addEventListener\('click', handleGlobalClick\);/;
  if (clickHandlerEvt.test(c)) {
      c = c.replace(/document\.addEventListener\('click', handleGlobalClick\);/g, "document.addEventListener('click', handleGlobalClick as EventListener);");
  }
  
  const clickHandlerDel = /document\.removeEventListener\('click', handleGlobalClick\);/;
  if (clickHandlerDel.test(c)) {
      c = c.replace(/document\.removeEventListener\('click', handleGlobalClick\);/g, "document.removeEventListener('click', handleGlobalClick as EventListener);");
  }

  // Same thing but maybe different spacing
  const altClickHandler = /const handleGlobalClick = \(\) => \{\n\s*if \(window\.getSelection\(\)\?\.toString\(\)\.length === 0\) \{\n\s*inputRef\.current\?\.focus\(\);\n\s*\}\n\s*\};/;
  if (altClickHandler.test(c)) {
      const altRep = `const handleGlobalClick = (e: any) => {\n      if (e.target.closest('input, textarea, button, a')) return;\n      if (window.getSelection()?.toString().length === 0) {\n        inputRef.current?.focus();\n      }\n    };`;
      c = c.replace(altClickHandler, altRep);
  }
  
  fs.writeFileSync(file, c);
}
console.log('Fixed handlers and icon');
