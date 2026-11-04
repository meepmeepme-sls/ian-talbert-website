const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

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

// Blog posts loader
function getBlogPosts() {
  const blogDir = path.join(__dirname, 'content', 'blog');
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      readingTime: data.readingTime || '5 min read',
      chapter: data.chapter || '',
      summary: data.summary || '',
      tags: data.tags || [],
      content,
      html: md.render(content)
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

const posts = getBlogPosts();
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

// 4. Blog Index
renderPage('blog', { title: 'Field Notes & Technical Treatises', currentPath: '/blog', posts }, 'blog/index.html');
renderPage('blog', { title: 'Field Notes & Technical Treatises', currentPath: '/blog', posts }, 'blog.html');

// 5. Individual Blog Posts
posts.forEach(post => {
  renderPage('post', {
    title: post.title,
    currentPath: `/blog/${post.slug}`,
    post
  }, `blog/${post.slug}/index.html`);
  renderPage('post', {
    title: post.title,
    currentPath: `/blog/${post.slug}`,
    post
  }, `blog/${post.slug}.html`);
});

console.log('Static export complete in dist/ directory.');
