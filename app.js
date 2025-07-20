const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Here we GOOOOOO...', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(200).send('Post enabled!!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
