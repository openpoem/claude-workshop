const express = require('express');
const app = express();

app.use(express.json());

// In-memory store
const users = [];

// GET all users
app.get('/api/users', (req, res) => {
  res.json({ data: users });
});

// GET user by id
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ data: user });
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  const user = {
    id: String(users.length + 1),
    name: name,
    email: email,
    createdAt: new Date().toISOString()
  };

  users.push(user);

  res.json({ data: user });
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.json({ deleted: true });
});

module.exports = app;
