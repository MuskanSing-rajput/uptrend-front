const fs = require('fs');

const files = process.argv.slice(2);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Remove header
  const headerStart = content.search(/<header className=\{?`?navbar/);
  if (headerStart !== -1) {
    let tagCount = 0;
    let i = headerStart;
    let insideString = false;
    let stringChar = null;
    let headerEnd = -1;

    for (; i < content.length; i++) {
      if (!insideString && (content[i] === '"' || content[i] === "'" || content[i] === '`')) {
        insideString = true;
        stringChar = content[i];
      } else if (insideString && content[i] === stringChar && content[i-1] !== '\\') {
        insideString = false;
        stringChar = null;
      }

      if (!insideString) {
        if (content.substring(i, i + 7) === '<header') tagCount++;
        else if (content.substring(i, i + 9) === '</header>') {
          tagCount--;
          if (tagCount === 0) {
            headerEnd = i + 9;
            break;
          }
        }
      }
    }
    
    if (headerEnd !== -1) {
      content = content.slice(0, headerStart) + content.slice(headerEnd);
    }
  }

  // Remove footer
  const footerStart = content.search(/<footer/);
  if (footerStart !== -1) {
    let tagCount = 0;
    let i = footerStart;
    let insideString = false;
    let stringChar = null;
    let footerEnd = -1;

    for (; i < content.length; i++) {
      if (!insideString && (content[i] === '"' || content[i] === "'" || content[i] === '`')) {
        insideString = true;
        stringChar = content[i];
      } else if (insideString && content[i] === stringChar && content[i-1] !== '\\') {
        insideString = false;
        stringChar = null;
      }

      if (!insideString) {
        if (content.substring(i, i + 7) === '<footer') tagCount++;
        else if (content.substring(i, i + 9) === '</footer>') {
          tagCount--;
          if (tagCount === 0) {
            footerEnd = i + 9;
            break;
          }
        }
      }
    }

    if (footerEnd !== -1) {
      content = content.slice(0, footerStart) + content.slice(footerEnd);
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
