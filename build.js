const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy public assets to dist
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
copyDir(path.join(__dirname, 'public'), distDir);

const viewsDir = path.join(__dirname, 'views');

function renderPage(templateName, data, outSubpath) {
  const templatePath = path.join(viewsDir, `${templateName}.ejs`);
  const html = ejs.render(fs.readFileSync(templatePath, 'utf8'), data, {
    views: [viewsDir],
    filename: templatePath
  });
  const targetPath = path.join(distDir, outSubpath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, html, 'utf8');
  console.log(`Rendered: ${outSubpath}`);
}

// 1. Landing (About Me)
renderPage('index', { title: 'About Me', currentPath: '/' }, 'index.html');

// 2. Portfolio
renderPage('portfolio', { title: 'Curated Engineering Portfolio', currentPath: '/portfolio' }, 'portfolio/index.html');
renderPage('portfolio', { title: 'Curated Engineering Portfolio', currentPath: '/portfolio' }, 'portfolio.html');

// 3. Resume
renderPage('resume', { title: 'Curriculum Vitae & One-Pager Resume', currentPath: '/resume' }, 'resume/index.html');
renderPage('resume', { title: 'Curriculum Vitae & One-Pager Resume', currentPath: '/resume' }, 'resume.html');

// 4. 404
renderPage('404', { title: 'Page Not Found', currentPath: '/404' }, '404.html');

console.log('Static export complete in dist/ directory.');
