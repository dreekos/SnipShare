const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const { createSnippet, getSnippet } = require('./database');

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

// Handle snippet creation
router.post('/api/snippets', (req, res) => {
    const { title, content, language } = req.body;

    if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'Content is required' });
    }

    const id = nanoid(8);

    try {
        createSnippet(id, title || 'Untitled', content, language || 'plaintext');
        res.redirect(`/s/${id}`);
    } catch (error) {
        console.error('Error creating snippet:', error);
        res.status(500).json({ error: 'Failed to create snippet' });
    }
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
