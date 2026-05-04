const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components', 'team');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Profile.tsx'));

const searchRegex = /\{artist\.name\.replace\(\/ñ\/gi, 'N'\)\.split\(' '\)\.map\(\(word, i\) => \([\s\S]*?<span key=\{i\} className="block">[\s\S]*?\{word\}[\s\S]*?<\/span>[\s\S]*?\)\)\}/g;

const replaceString = `{artist.name.split(' ').map((word, i) => (
              <span key={i} className="block">
                {word.split('').map((char, j) => (
                  <span 
                    key={j} 
                    style={char.toUpperCase() === 'Ñ' ? { display: 'inline-block', marginRight: '0.3em' } : {}}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}`;

let updated = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (searchRegex.test(content)) {
    content = content.replace(searchRegex, replaceString);
    fs.writeFileSync(filePath, content);
    updated++;
    console.log('Updated ' + file);
  }
}
console.log('Total updated: ' + updated);
