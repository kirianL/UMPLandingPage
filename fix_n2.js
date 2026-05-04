const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components', 'team');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Profile.tsx'));

let updated = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /\{artist\.name\.split\((['"])[ ]\1\)\.map\(\(word, i\) => \([\s\S]*?<span key=\{i\} className="block">[\s\S]*?\{word\.split\(''\)\.map\(\(char, j\) => \([\s\S]*?<span key=\{j\} className=\{char\.toUpperCase\(\) === 'Ñ' \? 'pr-\[0\.15em\] inline-block' : ''\}>[\s\S]*?\{char\}[\s\S]*?<\/span>[\s\S]*?\)\)\}[\s\S]*?<\/span>[\s\S]*?\)\)\}/g;

  if (regex.test(content)) {
    content = content.replace(regex, `{artist.name.replace(/ñ/gi, 'N').split(' ').map((word, i) => (\n              <span key={i} className="block">\n                {word}\n              </span>\n            ))}`);
    fs.writeFileSync(filePath, content);
    updated++;
    console.log('Updated ' + file);
  } else {
    // Just in case some files weren't updated yet, check for the original pattern
    const regex2 = /\{artist\.name\.split\((['"])[ ]\1\)\.map\(\(word, i\) => \([\s\S]*?<span key=\{i\} className="block">[\s\S]*?\{word\}[\s\S]*?<\/span>[\s\S]*?\)\)\}/g;
    if (regex2.test(content)) {
      content = content.replace(regex2, `{artist.name.replace(/ñ/gi, 'N').split(' ').map((word, i) => (\n              <span key={i} className="block">\n                {word}\n              </span>\n            ))}`);
      fs.writeFileSync(filePath, content);
      updated++;
      console.log('Updated original ' + file);
    }
  }
}
console.log('Total updated: ' + updated);
