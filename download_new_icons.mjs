import fs from 'fs';
import https from 'https';

const baseUri = 'https://win98icons.alexmeub.com/icons/png/';

// Fallbacks are tried sequentially if the previous fails
const downloads = [
  {
    target: 'public/retro_icons/projects.png',
    urls: ['console_prompt-0.png', 'gears-0.png', 'application_executable-0.png']
  },
  {
    target: 'public/retro_icons/education.png',
    urls: ['book_open-0.png', 'certificate-0.png', 'document_text-0.png']
  }
];

downloads.forEach(({ target, urls }) => {
  let urlIndex = 0;

  const tryDownload = () => {
    if (urlIndex >= urls.length) {
      console.log(`Failed to download anything for ${target}`);
      return;
    }

    const file = urls[urlIndex];
    const fullUrl = `${baseUri}${file}`;
    
    https.get(fullUrl, (res) => {
      if (res.statusCode === 200) {
         const dest = fs.createWriteStream(target);
         res.pipe(dest);
         dest.on('finish', () => console.log(`SUCCESS: Downloaded ${file} -> ${target}`));
      } else {
         console.log(`FAIL: ${file} (HTTP ${res.statusCode}). Trying next fallback...`);
         urlIndex++;
         tryDownload();
      }
    }).on('error', (err) => {
      console.log(`ERROR: ${err.message}. Trying next fallback...`);
      urlIndex++;
      tryDownload();
    });
  };

  tryDownload();
});
