const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://utturgrampanchayat.com/',
  'https://utturgrampanchayat.com/members.php',
  'https://utturgrampanchayat.com/about.php',
  'https://utturgrampanchayat.com/gallary.php'
];

const fetchHtml = (url) => new Promise((resolve) => {
  https.get(url, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
  });
});

async function main() {
  let imgSrcs = [];
  
  for (const url of urls) {
      console.log('Fetching', url);
      const html = await fetchHtml(url);
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      while ((match = imgRegex.exec(html)) !== null) {
        imgSrcs.push(match[1]);
      }
      
      // also check for background-image
      const bgRegex = /background-image:\s*url\(([^)]+)\)/g;
      while ((match = bgRegex.exec(html)) !== null) {
          let src = match[1].replace(/['"]/g, '');
          imgSrcs.push(src);
      }
  }

  imgSrcs = [...new Set(imgSrcs)].filter(src => src && !src.startsWith('data:'));
  console.log('Found images:', imgSrcs);
  
  // Download them
  const outDir = path.join(__dirname, 'Images');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  
  for (let src of imgSrcs) {
    let fullUrl = src;
    if (!src.startsWith('http')) {
      fullUrl = 'https://utturgrampanchayat.com/' + src.replace(/^\/+/, '');
    }
    const filename = path.basename(src).split('?')[0];
    if (!filename) continue;
    const dest = path.join(outDir, filename);
    
    // Don't overwrite if we already have it
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
        console.log(`Skipping ${filename}, already exists.`);
        continue;
    }
    
    console.log(`Downloading ${fullUrl} to ${dest}`);
    await new Promise((res) => {
      https.get(fullUrl, response => {
        if(response.statusCode === 200) {
            response.pipe(fs.createWriteStream(dest)).on('finish', res);
        } else {
            console.log(`Failed ${fullUrl}: ${response.statusCode}`);
            res();
        }
      }).on('error', (e) => {
          console.error(e);
          res();
      });
    });
  }
}
main();
