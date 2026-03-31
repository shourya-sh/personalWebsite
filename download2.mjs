import fs from 'fs';
import https from 'https';

const baseUri = 'https://win98icons.alexmeub.com/icons/png/';

const downloads = [
  { target: 'public/retro_icons/education.png', file: 'certificate-0.png' },
  { target: 'public/retro_icons/experience.png', file: 'gears-0.png' },
  { target: 'public/retro_icons/resume.png', file: 'document_text-0.png' },
  { target: 'public/retro_icons/games.png', file: 'joypad-0.png' }
];

downloads.forEach(({ target, file }) => {
  https.get(`${baseUri}${file}`, (res) => {
    if (res.statusCode === 200) {
       const dest = fs.createWriteStream(target);
       res.pipe(dest);
       dest.on('finish', () => console.log(`Downloaded ${file} to ${target}`));
    } else {
       console.log(`Failed HTTP ${res.statusCode} for ${file}`);
    }
  });
});
