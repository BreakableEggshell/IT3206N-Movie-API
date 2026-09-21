const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

const movies = [];
let nextId = 1;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/movies', (req, res) => res.json(movies));

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === +req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

app.post('/api/movies', (req, res) => {
  const { title, genre, year } = req.body || {};
  const missing = ['title', 'genre', 'year'].filter(f => !(req.body || {})[f]);
  if (missing.length) {
    return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
  }
  const movie = { id: nextId++, title, genre, year: +year };
  movies.push(movie);
  res.status(201).json(movie);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));