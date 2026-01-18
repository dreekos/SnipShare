const express = require('express');
const path = require('path');
const routes = require('./routes');
const apiRoutes = require('./api');
const { initDatabase } = require('./database');
const rateLimiter = require('./middleware/rateLimit');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for proper IP detection behind reverse proxies
app.set('trust proxy', 1);

// Initialize database
initDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rate limiting for API routes
app.use('/api', rateLimiter);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes
app.use('/', routes);
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`SnipShare running on http://localhost:${PORT}`);
});
