import React, { useState } from "react";
import "./Withdraw1.css";
import axios from "axios";  // For sending requests to the backend

const Withdraw = () => {
  const [name, setName] = useState("");  // For user's name
  const [amount, setAmount] = useState("");  // Withdrawal amount
  const [phoneNumber, setPhoneNumber] = useState("");  // Recipient's phone number
  const [balance, setBalance] = useState(1000);  // Current balance
  const [message, setMessage] = useState("");  // For displaying success/error message

  const handleWithdraw = (method) => {
    // Validate the withdrawal amount
    if (amount <= 0 || amount > balance) {
      setMessage("Invalid amount! Please enter a valid amount.");
      return;
    }

    // Deduct the amount from the balance
    setBalance(balance - amount);
    setMessage(`Withdrawal of PKR ${amount} via ${method} successful!`);

    // Call backend API to send SMS
    axios
      .post("/api/send-message", {
        phoneNumber: phoneNumber,
        amount: amount,
        method: method,
      })
      .then((response) => {
        console.log("Message sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setMessage("Error processing withdrawal.");
      });
  };

  return (
    <div className="withdraw-container">
      <div className="withdraw-box">
        <h2 className="withdraw-title">Withdraw Funds</h2>
        <p className="withdraw-balance">Current Balance: PKR {balance}</p>
        
        <input
          type="text"
          className="withdraw-input"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <input
          type="number"
          className="withdraw-input"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <input
          type="text"
          className="withdraw-input"
          placeholder="Enter Recipient Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button className="withdraw-button jazzcash-button" onClick={() => handleWithdraw("JazzCash")}>
          Withdraw via JazzCash
        </button>

        <button className="withdraw-button easypaisa-button" onClick={() => handleWithdraw("EasyPaisa")}>
          Withdraw via EasyPaisa
        </button>

        {/* Display message after withdrawal */}
        {message && <p className="message-box">{message}</p>}
      </div>
    </div>
  );
};

export default Withdraw;
