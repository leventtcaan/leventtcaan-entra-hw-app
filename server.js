const express = require('express');
const path = require('path');
const app = express();

// static dosyalar vs.
app.use(express.static(path.join(__dirname, 'public')));

// Sadece ana sayfa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// auth callback vs. kendi path'lerin
app.get('/auth/redirect', (req, res) => {
  // MSAL callback logic
});

// Örnek korumalı sayfa route'u
app.get('/profile', (req, res) => {
  // burada authentication check yapacaksın
  res.send('Profile page');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));