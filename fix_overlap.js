const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components', 'team');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Profile.tsx'));

let updated = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Adjust text size to prevent overflow
  if (content.includes('md:text-[20vw]')) {
    content = content.replace(/md:text-\[20vw\]/g, 'md:text-[16.5vw]');
    content = content.replace(/md:text-\[15vw\]/g, 'md:text-[13vw]');
    content = content.replace(/md:text-\[12vw\]/g, 'md:text-[11vw]');
    changed = true;
  }

  // 2. Add padding bottom on desktop to push the text up away from the bottom info
  if (content.includes('pb-[180px] md:pb-0')) {
    content = content.replace('pb-[180px] md:pb-0', 'pb-[180px] md:pb-20');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    updated++;
    console.log('Updated ' + file);
  }
}
console.log('Total updated: ' + updated);
