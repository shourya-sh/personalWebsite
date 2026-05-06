import fs from 'fs';
import path from 'path';

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'Contact.tsx' && f !== 'Projects.tsx' && f !== 'Resume.tsx');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Insert import if absent
  if (!content.includes('import RightSidebar from')) {
    content = content.replace(/(import React[^;]*;)/, `$1\nimport RightSidebar from '@/components/RightSidebar';`);
    modified = true;
  }

  // Remove `function ContactCard(...) { ... }` or `function SidebarContactCard(...) { ... }`
  const cardRegex = /function (?:Sidebar)?ContactCard\([^)]+\)\s*\{[\s\S]*?(?=\n\}\n)\n\}\n/m;
  if (cardRegex.test(content)) {
    content = content.replace(cardRegex, '');
    modified = true;
  }

  // Replace the Right Sidebar block
  // Depending on exactly how the file ends, we match start to end
  const sidebarRegex = /\{\/\*\s*Right Sidebar.*?<\/div>\n\n\s*<\/(div|style|script)>/s;
  // Actually, Education and Experience have <style> at the bottom. The easiest way is matching up to the last </div> before the final styles
  // Let's use a simpler match: find `{/* Right Sidebar` and match until `{/* Footer Sys Log */}` block finishes.
  
  const exactSidebarRegex = /\{\/\* Right Sidebar.*?\{\/\* Footer Sys Log \*\/\}[\s\S]*?<\/div>\n\s*<\/div>/s;
  
  if (exactSidebarRegex.test(content)) {
    content = content.replace(exactSidebarRegex, '<RightSidebar />');
    modified = true;
  } else {
    // try slightly broader or narrower
    const altRegex = /\{\/\* Right Sidebar - Contact\/Comms \*\/\}[\s\S]*?(?=(?:<\/div>\n\s*(?:<\/?style>)?\n\s*<\/div>\n\s*\);|<\/div>\n\s*<\/div>\n\s*<style>|<\/div>\n\s*<\/div>\n\s*\);))/s;
    const match = content.match(altRegex);
    if (match) {
        content = content.replace(altRegex, '<RightSidebar />\n      ');
        modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Modified', file);
  }
}

