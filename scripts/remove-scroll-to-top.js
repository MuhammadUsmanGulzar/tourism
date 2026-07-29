const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');

  // Regex to remove the scroll to top link block
  // It handles variable whitespace and the inner <i> tag
  const regex = /<a\s+href="#"\s+className="scroll-to-top"\s+aria-label="Scroll to top">\s*<i\s+className="ri-arrow-up-line"><\/i>\s*<\/a>/g;

  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Removed from ${file}`);
  }
});
