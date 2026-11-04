const express = require('express');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Markdown parser
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// Configure view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public')));

// Helper to load and cache/parse blog posts
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

  // Sort descending by date
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

// Routes
// 1. Landing Page (About Me)
app.get('/', (req, res) => {
  res.render('index', {
    title: 'About Me',
    currentPath: '/'
  });
});

// 2. Curated Engineering Portfolio
app.get('/portfolio', (req, res) => {
  res.render('portfolio', {
    title: 'Curated Engineering Portfolio',
    currentPath: '/portfolio'
  });
});

// 3. One-Pager Resume Viewer
app.get('/resume', (req, res) => {
  res.render('resume', {
    title: 'Curriculum Vitae & One-Pager Resume',
    currentPath: '/resume'
  });
});

// 4. Personal Blog Index
app.get('/blog', (req, res) => {
  const posts = getBlogPosts();
  res.render('blog', {
    title: 'Field Notes & Technical Treatises',
    currentPath: '/blog',
    posts
  });
});

// 5. Individual Blog Post
app.get('/blog/:slug', (req, res) => {
  const posts = getBlogPosts();
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) {
    return res.status(404).render('post', {
      title: 'Article Not Found',
      currentPath: '/blog',
      post: {
        title: 'Treatise Not Found',
        chapter: 'Error 404',
        date: '',
        readingTime: '',
        tags: [],
        html: '<p>The requested treatise could not be located in the volume catalog. Please return to the <a href="/blog">Field Notes index</a>.</p>'
      }
    });
  }

  res.render('post', {
    title: post.title,
    currentPath: `/blog/${post.slug}`,
    post
  });
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).render('post', {
    title: 'Page Not Found',
    currentPath: req.path,
    post: {
      title: 'Folio Page Not Found (404)',
      chapter: 'Errata',
      date: '',
      readingTime: '',
      tags: [],
      html: '<p>The requested page is not indexed in this monograph. Return to the <a href="/">Frontispiece (About Me)</a>.</p>'
    }
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Ian Talbert Monograph & Portfolio active at http://localhost:${PORT}`);
  });
}

module.exports = app;
