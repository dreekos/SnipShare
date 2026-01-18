const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const { createSnippet, getSnippet, getSnippetCount } = require('./database');

// Calculate expiration date
function calculateExpiration(expiration) {
    if (!expiration || expiration === 'never') return null;

    const now = new Date();
    switch (expiration) {
        case '1h':
            return new Date(now.getTime() + 60 * 60 * 1000).toISOString();
        case '24h':
            return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
        case '7d':
            return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
        case '30d':
            return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
        default:
            return null;
    }
}

// Create snippet via API
router.post('/snippets', (req, res) => {
    const { title, content, language, expiration } = req.body;

    if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'Content is required' });
    }

    const id = nanoid(8);
    const expiresAt = calculateExpiration(expiration);

    try {
        createSnippet(id, title || 'Untitled', content, language || 'plaintext', expiresAt);
        res.status(201).json({
            success: true,
            id,
            url: `/s/${id}`,
            raw_url: `/s/${id}/raw`
        });
    } catch (error) {
        console.error('Error creating snippet:', error);
        res.status(500).json({ error: 'Failed to create snippet' });
    }
});

// Get snippet via API
router.get('/snippets/:id', (req, res) => {
    const { id } = req.params;

    try {
        const snippet = getSnippet(id);

        if (snippet) {
            res.json({
                success: true,
                snippet: {
                    id: snippet.id,
                    title: snippet.title,
                    content: snippet.content,
                    language: snippet.language,
                    created_at: snippet.created_at,
                    expires_at: snippet.expires_at,
                    views: snippet.views
                }
            });
        } else {
            res.status(404).json({ error: 'Snippet not found' });
        }
    } catch (error) {
        console.error('Error fetching snippet:', error);
        res.status(500).json({ error: 'Failed to fetch snippet' });
    }
});

// Get statistics
router.get('/stats', (req, res) => {
    try {
        const count = getSnippetCount();
        res.json({
            success: true,
            stats: {
                total_snippets: count
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

module.exports = router;
