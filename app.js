const express = require('express');
const path = require('path');
const https = require('https'); 

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

const API_KEY = '353797ac6062390aed8218ce';
const api_url = `https://v6.exchangerate-api.com/v6/353797ac6062390aed8218ce/latest/USD`;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

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

app.post('/convert', (req, res) => {
  const { amount, sourceCurrency, targetCurrency } = req.body;

  https.get(api_url, response => {
    let data = '';

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      const jsonData = JSON.parse(data);
      const sourceRate = jsonData.conversion_rates[sourceCurrency];
      const targetRate = jsonData.conversion_rates[targetCurrency];
      const result = (amount / sourceRate) * targetRate;

      res.json({ result });
    });

  }).on('error', error => {
    console.error('Error fetching currencies:', error);
    res.status(500).json({ error: 'Error fetching currencies' });
  });
});



const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Kantor API',
      version: '1.0.0',
      description: 'Dokumentacja API dla kontoru internetowego',
      contact: {
        name: "Api Kantor",
        url: "http://localhost:3000",
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['swagger.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
