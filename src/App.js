import React, { useState } from "react";
import "./App.css";
import Login from "./components/Page/Login";
import SignUp from "./components/Page/SignUp";
import CrashGame from "./components/CrashGame/Crash";
import Deposit from "./components/Page/Money/Deposit"; // Import Deposit component
import Withdraw from "./components/Page/Money/Withdraw"; // Import Withdraw component
import AdminWallet from "./components/CrashGame/AdminWallet";
function App() {
  const [currentPage, setCurrentPage] = useState("home");
   // Adjust the path as necessary

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="logo">Crash Game</h2>
        <div className="nav-buttons">
          <button onClick={() => setCurrentPage("home")}>Home</button>
          <button onClick={() => setCurrentPage("login")}>Login</button>
          <button onClick={() => setCurrentPage("withdraw")}>Withdraw</button> {/* Fixed Withdraw Button */}
          <button onClick={() => setCurrentPage("deposit")}>Deposit</button> {/* Deposit Button */}
        </div>
      </nav>

      {/* Page Content */}
      <div className="content">
        {currentPage === "home" && (
          <>
            <h1>Welcome to Crash Game</h1>
            <p>Play Now</p>
            <CrashGame />
            <AdminWallet/>
          </>
        )}
        {currentPage === "login" && <Login />}
        {currentPage === "signup" && <SignUp />}
        {currentPage === "deposit" && <Deposit />}
        {currentPage === "withdraw" && <Withdraw />} {/* Fixed Withdraw Page */}
      </div>
    </div>
  );
}

export default App;
