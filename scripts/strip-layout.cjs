const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');

  // Regex to remove <header>...</header> and <footer>...</footer>
  // Uses lazy matching [\s\S]*? to not delete everything in between
  content = content.replace(/<header[\s\S]*?<\/header>/g, '');
  content = content.replace(/<footer[\s\S]*?<\/footer>/g, '');

  fs.writeFileSync(filepath, content);
  console.log(`Stripped header/footer from ${file}`);
});
