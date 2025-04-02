import React, { useState } from "react";
import "./App.css";
import Login from "./components/Page/Login";
import SignUp from "./components/Page/SignUp";
import CrashGame from "./components/CrashGame/Crash";
import Deposit from "./components/Page/Money/Deposit"; // Import the Deposit component
import File from './components/CrashGame/File.js';
function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="logo">Crash Game</h2>
        <div className="nav-buttons">
          <button onClick={() => setCurrentPage("home")}>Home</button>
          <button onClick={() => setCurrentPage("login")}>Login</button>
          <button onClick={() => setCurrentPage("signup")}>Withdraw</button>
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
            <File/>
          </>
        )}
        {currentPage === "login" && <Login />}
        {currentPage === "signup" && <SignUp />}
        {currentPage === "deposit" && <Deposit />} {/* Show Deposit Page */}
      </div>
    </div>
  );
}

export default App;
