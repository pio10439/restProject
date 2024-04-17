const express = require('express');
const path = require('path');
const https = require('https'); 

const app = express();
const PORT = 3000;

const API_KEY = 'c448ced78d8474e7b9fb41c2';
const api_url = ` https://v6.exchangerate-api.com/v6/c448ced78d8474e7b9fb41c2/latest/PLN`;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/rates', (req, res) => {
  https.get(api_url, response => {
    let data = '';


    response.on('data', chunk => {
      data += chunk;
    });


    response.on('end', () => {
      const jsonData = JSON.parse(data);
      res.json(jsonData.conversion_rates);
    });
  }).on('error', error => {
    console.error('Error fetching currencies:', error);
    res.status(500).send('Error fetching currencies');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
