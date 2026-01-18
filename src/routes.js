const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const { createSnippet, getSnippet, incrementViews } = require('./database');

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

// View snippet
router.get('/s/:id', (req, res) => {
    const { id } = req.params;

    try {
        const snippet = getSnippet(id);

        if (snippet) {
            incrementViews(id);
            res.render('view', {
                title: `${snippet.title} - SnipShare`,
                snippet
            });
        } else {
            res.render('view', {
                title: 'Not Found - SnipShare',
                snippet: null
            });
        }
    } catch (error) {
        console.error('Error fetching snippet:', error);
        res.render('view', {
            title: 'Error - SnipShare',
            snippet: null
        });
    }
});

// Get raw snippet content
router.get('/s/:id/raw', (req, res) => {
    const { id } = req.params;

    try {
        const snippet = getSnippet(id);

        if (snippet) {
            res.type('text/plain').send(snippet.content);
        } else {
            res.status(404).send('Snippet not found');
        }
    } catch (error) {
        console.error('Error fetching raw snippet:', error);
        res.status(500).send('Error fetching snippet');
    }
});

// About page
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About - SnipShare'
    });
});

module.exports = router;
