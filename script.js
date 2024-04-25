document.addEventListener("DOMContentLoaded", function() {
  const table = document.getElementById('currency-table');
  const converterForm = document.getElementById('converter-form');
  const sourceCurrencySelect = document.getElementById('source-currency');
  const targetCurrencySelect = document.getElementById('target-currency');
  const conversionResult = document.getElementById('conversion-result');

  //Przeliczanie walut
  function convertCurrency(amount, sourceCurrency, targetCurrency) {
    fetch('/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount,
        sourceCurrency: sourceCurrency,
        targetCurrency: targetCurrency
      })
    })
    .then(response => response.json())
    .then(data => {
      conversionResult.textContent = `${amount} ${sourceCurrency} = ${data.result.toFixed(2)} ${targetCurrency}`;
    })
    .catch(error => {
      console.error('Error converting currency:', error);
      alert('Error converting currency. Please try again later.');
    });
  }

  converterForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const sourceCurrency = sourceCurrencySelect.value;
    const targetCurrency = targetCurrencySelect.value;
    convertCurrency(amount, sourceCurrency, targetCurrency);
  });

  // Tabela walut
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

//akrualizacja wyboru walut
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

  // Aktualizacja walut
  fetch('/rates')
    .then(response => response.json())
    .then(data => {
      updateCurrencyOptions(data);
    })
    .catch(error => {
      console.error('Error fetching currencies:', error);
    });

  // Odświeżanie 
  const refreshInterval = 5000; 
  setInterval(fetchDataAndUpdateTable, refreshInterval);
});
