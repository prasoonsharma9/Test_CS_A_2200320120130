const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD';

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        populateCurrencyDropdowns(data.rates);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        alert("Failed to fetch exchange rates. Please try again later.");
    }
}

function populateCurrencyDropdowns(rates) {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';

    Object.keys(rates).forEach(currency => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const exchangeRate = data.rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        alert("Failed to convert currency. Please try again.");
    }
}

fetchExchangeRates();
