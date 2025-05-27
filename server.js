const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const TEST_SERVER = 'http://localhost:3001';

const endpoints = {
  'p': `${TEST_SERVER}/primes`,
  'f': `${TEST_SERVER}/fibo`,
  'e': `${TEST_SERVER}/even`,
  'r': `${TEST_SERVER}/rand`
};

const WINDOW_SIZE = 10;
let windowState = [];

app.get('/numbers/:numberid', async (req, res) => {
  const id = req.params.numberid;
  
  if (!endpoints[id]) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const windowPrevState = [...windowState];
  let fetchedNumbers = [];

  try {
    const response = await axios.get(endpoints[id], { timeout: 500 });
    const numbers = response.data.numbers;

    for (let num of numbers) {
      if (!windowState.includes(num)) {
        windowState.push(num);
        fetchedNumbers.push(num);
      }
    }

    while (windowState.length > WINDOW_SIZE) {
      windowState.shift();
    }

    const avg = windowState.length === 0 
      ? 0 
      : parseFloat((windowState.reduce((sum, val) => sum + val, 0) / windowState.length).toFixed(2));

    // Return response
    return res.json({
      windowPrevState,
      windowCurrState: windowState,
      numbers: fetchedNumbers,
      avg
    });

  } catch (error) {
    return res.status(500).json({ error: 'Timeout or fetch error from third-party server' });
  }
});

app.listen(PORT, () => {
  console.log(`Average Calculator Microservice running on port ${PORT}`);
});