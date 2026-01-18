const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../data/snipshare.db');
const db = new Database(dbPath);

// Initialize database
function initDatabase() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS snippets (
            id TEXT PRIMARY KEY,
            title TEXT,
            content TEXT NOT NULL,
            language TEXT DEFAULT 'plaintext',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME,
            views INTEGER DEFAULT 0
        )
    `);

    console.log('Database initialized');
}

// Create a new snippet
function createSnippet(id, title, content, language, expiresAt = null) {
    const stmt = db.prepare(`
        INSERT INTO snippets (id, title, content, language, expires_at)
        VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(id, title, content, language, expiresAt);
}

// Get snippet by ID
function getSnippet(id) {
    const stmt = db.prepare('SELECT * FROM snippets WHERE id = ?');
    return stmt.get(id);
}

// Increment view count
function incrementViews(id) {
    const stmt = db.prepare('UPDATE snippets SET views = views + 1 WHERE id = ?');
    return stmt.run(id);
}

// Get snippet count
function getSnippetCount() {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM snippets');
    return stmt.get().count;
}

// Delete expired snippets
function cleanupExpired() {
    const stmt = db.prepare('DELETE FROM snippets WHERE expires_at IS NOT NULL AND expires_at < datetime("now")');
    return stmt.run();
}

module.exports = {
    initDatabase,
    createSnippet,
    getSnippet,
    incrementViews,
    getSnippetCount,
    cleanupExpired
};
