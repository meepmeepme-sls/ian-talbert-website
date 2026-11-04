const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public')));

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

// 404 Fallback
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    currentPath: req.path
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Ian Talbert Portfolio active at http://localhost:${PORT}`);
  });
}

module.exports = app;
