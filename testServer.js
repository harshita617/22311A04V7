const express = require('express');
const app = express();
const PORT = 3001;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get('/primes', async (req, res) => {
  await delay(200);
  res.json({ numbers: [2, 3, 5, 7] });
});

app.get('/fibo', async (req, res) => {
  await delay(100);
  res.json({ numbers: [1, 1, 2, 3, 5, 8] });
});

app.get('/even', async (req, res) => {
  await delay(100);
  res.json({ numbers: [2, 4, 6, 8, 10] });
});

app.get('/rand', async (req, res) => {
  await delay(300);
  res.json({ numbers: [11, 17, 23] });
});

app.listen(PORT, () =>{
      console.log(`Average Calculator Microservice running on port ${PORT}`);
});