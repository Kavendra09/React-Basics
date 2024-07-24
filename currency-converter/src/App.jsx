import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const API_KEY = "cabbe1f9a5d6cb2b5249e56f";
const currencyOptions = ["eur", "usd", "gbp"];

function App() {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [baseAmount, setBaseAmount] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBaseAmountChange = (e) => {
    const value = e.target.value;
    if (value <= 0) {
      setErrorMessage("Base amount must be greater than zero");
    } else {
      setBaseAmount(value);
      setErrorMessage("");
    }
  };

  const handleSwap = () => {
    if (baseCurrency === targetCurrency) {
      setErrorMessage("Base currency and converted currency cannot be the same");
      return;
    }
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
    setBaseAmount(convertedAmount);
    setConvertedAmount("");
    setErrorMessage("");
  };

  const convertCurrency = async () => {
    if (baseCurrency === targetCurrency) {
      setErrorMessage("Base currency and converted currency cannot be the same");
      return;
    }
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCurrency}/${targetCurrency}`
      );
      const rate = response.data.conversion_rate;
      const amount = (parseFloat(baseAmount) * rate).toFixed(2);
      setConvertedAmount(amount);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      setErrorMessage("Error fetching conversion rate");
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="currency-selection">
        <label>
          Pick a Base Currency:
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            {currencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Base Amount:
          <input
            type="number"
            value={baseAmount}
            onChange={handleBaseAmountChange}
          />
        </label>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="currency-selection">
        <label>
          Pick a Target Currency:
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            {currencyOptions
              .filter((option) => option !== baseCurrency)
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div className="button-container">
        <button onClick={handleSwap}>Swap</button>
        <button onClick={convertCurrency} disabled={!baseAmount || baseAmount <= 0}>
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="conversion-result">
          <h2>
            Converted Amount: {convertedAmount} {targetCurrency.toUpperCase()}
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
