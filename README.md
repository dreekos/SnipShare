# SnipShare

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)

A minimalist, open-source code snippet sharing platform. Share code quickly without creating an account.

## Features

- Quick snippet sharing with unique URLs
- Syntax highlighting for 12+ languages
- Dark/Light mode toggle
- Snippet expiration options (1h, 24h, 7d, 30d, never)
- Copy to clipboard functionality
- Raw snippet view
- RESTful API for programmatic access
- No account required
- 100% Open Source

## Quick Start

### Using npm

```bash
# Install dependencies
npm install

# Start the server
npm start

# Or use development mode with auto-reload
npm run dev
```

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t snipshare .
docker run -p 3000:3000 snipshare
```

The application will be available at `http://localhost:3000`

## API Reference

### Create Snippet

```bash
POST /api/snippets
Content-Type: application/json

{
  "title": "My Snippet",
  "content": "console.log('Hello World');",
  "language": "javascript",
  "expiration": "24h"
}
```

### Get Snippet

```bash
GET /api/snippets/:id
```

### Get Statistics

```bash
GET /api/stats
```

## Configuration

Environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `NODE_ENV` | development | Environment mode |
| `DATABASE_PATH` | ./data/snipshare.db | SQLite database path |
| `RATE_LIMIT_WINDOW` | 900000 | Rate limit window (ms) |
| `RATE_LIMIT_MAX` | 100 | Max requests per window |

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: SQLite (better-sqlite3)
- **Frontend**: EJS, Vanilla JS
- **Styling**: Custom CSS with dark/light themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**SnipShare** - Because sharing code should be simple.
