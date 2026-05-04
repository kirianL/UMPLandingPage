const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components', 'team');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Profile.tsx'));

const search = `            {artist.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}`;
const replace = `            {artist.name.split(' ').map((word, i) => (
              <span key={i} className="block">
                {word.split('').map((char, j) => (
                  <span key={j} className={char.toUpperCase() === 'Ñ' ? 'pr-[0.15em] inline-block' : ''}>
                    {char}
                  </span>
                ))}
              </span>
            ))}`;

let updated = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(search)) {
    content = content.replace(search, replace);
    fs.writeFileSync(filePath, content);
    updated++;
    console.log('Updated ' + file);
  } else {
    const searchCRLF = search.replace(/\n/g, '\r\n');
    if (content.includes(searchCRLF)) {
      content = content.replace(searchCRLF, replace.replace(/\n/g, '\r\n'));
      fs.writeFileSync(filePath, content);
      updated++;
      console.log('Updated ' + file + ' (CRLF)');
    } else {
      console.log('Not found in ' + file);
    }
  }
}
console.log('Total updated: ' + updated);
