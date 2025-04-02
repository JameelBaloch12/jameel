import React, { useState } from "react";
import "./Deposit1.css";
import axios from "axios";  // For sending requests to the backend

const Deposit = () => {
  const [amount, setAmount] = useState("");  // Deposit amount
  const [username, setUsername] = useState("");  // Username of the client
  const [phoneNumber, setPhoneNumber] = useState("");  // Client's phone number
  const [method, setMethod] = useState("EasyPaisa");  // Payment method: EasyPaisa or JazzCash
  const [message, setMessage] = useState("");  // Success/Error message
  const [balance, setBalance] = useState(1000);  // Initial balance

  const handleDeposit = () => {
    // Validate the deposit amount
    if (amount < 300 || amount > 45000) {
      setMessage("Invalid amount! Please enter an amount between 300 and 45,000.");
      return;
    }

    // Validate username and phone number
    if (!username || !phoneNumber) {
      setMessage("Please provide both Username and Phone Number.");
      return;
    }

    // Call backend API to process the deposit
    axios
      .post("/api/deposit", { amount, username, phoneNumber, method })
      .then((response) => {
        setMessage(`Deposit of PKR ${amount} via ${method} successful!`);
        setBalance(balance + amount);  // Update balance after deposit
      })
      .catch((error) => {
        setMessage("Error processing deposit.");
      });
  };

  return (
    <div className="deposit-container">
      <div className="deposit-box">
        <h2 className="deposit-title">Deposit Funds</h2>
        <p className="deposit-instructions">
          Please enter the amount you would like to deposit. The amount should be between PKR 300 and PKR 45,000.
        </p>

        <div className="deposit-amount-section">
          <div className="deposit-range">
            <label>Min Deposit: PKR 300</label>
            <label>Max Deposit: PKR 45,000</label>
          </div>

          <input
            type="number"
            className="deposit-input"
            placeholder="Enter Deposit Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="300"
            max="45000"
          />

          <input
            type="text"
            className="deposit-input"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            className="deposit-input"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <div className="method-selection">
            <label>Select Payment Method:</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="method-select"
            >
              <option value="EasyPaisa">EasyPaisa</option>
              <option value="JazzCash">JazzCash</option>
            </select>
          </div>
        </div>

        <button className="deposit-button" onClick={handleDeposit}>
          Deposit Now
        </button>

        {/* Display success or error message */}
        {message && <p className="message-box">{message}</p>}
      </div>
    </div>
  );
};

export default Deposit;
