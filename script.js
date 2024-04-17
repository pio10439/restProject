document.addEventListener("DOMContentLoaded", function() {
 
  const table = document.getElementById('currency-table');
  
 
  const converterForm = document.getElementById('converter-form');
 
  const sourceCurrencySelect = document.getElementById('source-currency');
  const targetCurrencySelect = document.getElementById('target-currency');

  
  function convertCurrency(amount, sourceCurrency, targetCurrency) {
    fetch('/rates')
      .then(response => response.json())
      .then(data => {
        const sourceRate = data[sourceCurrency];
        const targetRate = data[targetCurrency];
        const result = (amount / sourceRate) * targetRate;
        const resultElement = document.getElementById('conversion-result');
        resultElement.textContent = `${amount} ${sourceCurrency} = ${result.toFixed(2)} ${targetCurrency}`;
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
        alert('Error fetching currencies. Please try again later.');
      });
  }

  
  converterForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const sourceCurrency = document.getElementById('source-currency').value;
    const targetCurrency = document.getElementById('target-currency').value;
    convertCurrency(amount, sourceCurrency, targetCurrency);
  });

  
  function fetchDataAndUpdateTable() {
    fetch('/rates') 
      .then(response => response.json())
      .then(data => {
        
        table.innerHTML = '';

        
        const selectedCurrencies = ['PLN', 'USD', 'CHF', 'GBP'];

        selectedCurrencies.forEach(currency => {
          const row = document.createElement('tr');
          const currencyCell = document.createElement('td');
          currencyCell.textContent = currency;
          const rateCell = document.createElement('td');
          rateCell.textContent = data[currency].toFixed(2);
          row.appendChild(currencyCell);
          row.appendChild(rateCell);
          table.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }

  
  function updateCurrencyOptions(data) {
    
    sourceCurrencySelect.innerHTML = '';
    targetCurrencySelect.innerHTML = '';

    const currencies = Object.keys(data);

    
    currencies.forEach(currency => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = currency;
      sourceCurrencySelect.appendChild(option.cloneNode(true));
      targetCurrencySelect.appendChild(option.cloneNode(true));
    });
  }

  fetchDataAndUpdateTable();

  
  fetch('/rates')
    .then(response => response.json())
    .then(data => {
      updateCurrencyOptions(data);
    })
    .catch(error => {
      console.error('Error fetching currencies:', error);
    });

  const refreshInterval = 5000; 
  setInterval(fetchDataAndUpdateTable, refreshInterval);
});
