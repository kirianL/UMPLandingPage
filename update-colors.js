const fs = require('fs');
const files = [
  'c:/Users/Kirian/Desktop/Work/UMP/LandingPageUMP/components/team/DJProfile.tsx',
  'c:/Users/Kirian/Desktop/Work/UMP/LandingPageUMP/components/team/ArtistProfile.tsx',
  'c:/Users/Kirian/Desktop/Work/UMP/LandingPageUMP/components/team/ProducerProfile.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('const themeText')) {
    content = content.replace(
      /const bgImage = .*?;/s,
      `$&
  const isPurple = artist.slug === "milletck" || artist.name.toLowerCase().includes("mille");
  const themeText = isPurple ? "text-[#d8b4fe]" : "text-[#bbdbfa]";
  const themeBg60 = isPurple ? "bg-[#d8b4fe]/60" : "bg-[#bbdbfa]/60";
  const themeSelection = isPurple ? "selection:bg-[#d8b4fe]" : "selection:bg-[#bbdbfa]";
  const themeGroupHoverText = isPurple ? "group-hover:text-[#d8b4fe]" : "group-hover:text-[#bbdbfa]";`
    );
  }

  content = content.replace(/selection:bg-\[#bbdbfa\]/g, '${themeSelection}');
  content = content.replace(/text-\[#bbdbfa\]/g, '${themeText}');
  content = content.replace(/bg-\[#bbdbfa\]\/60/g, '${themeBg60}');
  content = content.replace(/group-hover:text-\[#bbdbfa\]/g, '${themeGroupHoverText}');

  content = content.replace(/className="([^"]*?\$\{[^}]+\}[^"]*?)"/g, 'className={`$1`}');
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
