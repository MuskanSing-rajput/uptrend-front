const fs = require('fs');

const files = process.argv.slice(2);
const toRemove = [
  /const \[navVisible, setNavVisible\] = useState\(true\);\n?/g,
  /const \[lastScrollY, setLastScrollY\] = useState\(0\);\n?/g,
  /useEffect\(\(\) => \{\n\s*const handleScroll[\s\S]*?\}, \[lastScrollY\]\);\n?/g
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  toRemove.forEach(regex => {
    content = content.replace(regex, '');
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Cleaned hooks in ${file}`);
  }
});
