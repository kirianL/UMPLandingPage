const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components', 'team');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Profile.tsx'));

const searchRegex = /\{artist\.name\.split\(\['"\] \[\]\['"\]\)\.map\(\(word, i\) => \([\s\S]*?<span key=\{i\} className="block">[\s\S]*?\{word\.split\(''\)\.map\(\(char, j\) => \([\s\S]*?<span[\s\S]*?key=\{j\}[\s\S]*?style=\{char\.toUpperCase\(\) === 'Ñ' \? \{ display: 'inline-block', marginRight: '0\.3em' \} : \{\}\}[\s\S]*?>[\s\S]*?\{char\}[\s\S]*?<\/span>[\s\S]*?\)\)\}[\s\S]*?<\/span>[\s\S]*?\)\)\}/g;

let updated = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes("marginRight: '0.3em'")) {
    content = content.replace("marginRight: '0.3em'", "marginRight: '0.12em'");
    fs.writeFileSync(filePath, content);
    updated++;
    console.log('Updated ' + file);
  }
}
console.log('Total updated: ' + updated);
