const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Basic route
app.get('/', (req, res) => {
    res.send('SnipShare - Coming Soon!');
});

// Start server
app.listen(PORT, () => {
    console.log(`SnipShare running on http://localhost:${PORT}`);
});
