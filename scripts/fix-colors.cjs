const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'src', 'css');
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

for (const file of files) {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace all color overrides for header--scrolled that turn things black
  content = content.replace(/\.header--scrolled \.navbar__logo a \{ color: #111; \}\n?/g, '');
  content = content.replace(/\.header--scrolled \.navbar__menu a \{ color: #444; font-weight: 500; \}\n?/g, '');
  content = content.replace(/\.header--scrolled \.navbar__menu a:hover \{ color: var\(--primary-color\); \}\n?/g, '');
  content = content.replace(/\.header--scrolled \.navbar__cta \{ color: var\(--white\); \}\n?/g, '');
  content = content.replace(/\.header--scrolled \.navbar__social \{ color: #111; \}\n?/g, '');
  content = content.replace(/\.header--scrolled \.navbar__hamburger \{ color: #111; \}\n?/g, '');
  
  // also handle the responsive.css one if it still exists
  content = content.replace(/\.header--scrolled \.navbar__hamburger \{\s*color: #111;\s*\}\n?/g, '');

  fs.writeFileSync(filePath, content);
  console.log(`Cleaned ${file}`);
}
