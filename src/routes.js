const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('index', {
        title: 'SnipShare - Share Code Snippets'
    });
});

// Create new snippet page
router.get('/new', (req, res) => {
    res.render('new', {
        title: 'New Snippet - SnipShare'
    });
});

// View snippet (placeholder)
router.get('/s/:id', (req, res) => {
    res.render('view', {
        title: 'View Snippet - SnipShare',
        snippet: null
    });
});

// About page
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About - SnipShare'
    });
});

module.exports = router;
