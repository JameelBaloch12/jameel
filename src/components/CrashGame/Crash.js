import React, { useState, useEffect } from "react";
import './Crash1.css';

const CrashGame = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [isCrashed, setIsCrashed] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [userBalance, setUserBalance] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [crashPoint, setCrashPoint] = useState(null);

  useEffect(() => {
    if (isPlaying) {
      const randomCrashPoint = (Math.random() * 8.5 + 1.5).toFixed(2);
      setCrashPoint(parseFloat(randomCrashPoint));

      let interval = setInterval(() => {
        setMultiplier((prev) => {
          if (prev >= crashPoint) {
            clearInterval(interval);
            setIsCrashed(true);
            setIsPlaying(false);
            return prev;
          }
          return parseFloat((prev + 0.05).toFixed(2));
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, crashPoint]);

  const placeBet = () => {
    if (betAmount > userBalance) {
      alert("Insufficient balance!");
      return;
    }

    setUserBalance(userBalance - betAmount);
    setMultiplier(1.0);
    setIsCrashed(false);
    setIsPlaying(true);
  };

  const cashOut = () => {
    if (!isCrashed && isPlaying) {
      const winnings = betAmount * multiplier;
      setUserBalance(userBalance + winnings);
      setIsPlaying(false);
      alert(`You cashed out at ${multiplier}x and won $${winnings.toFixed(2)}!`);
    } else if (isCrashed) {
      alert("Game has already crashed. You cannot cash out.");
    } else {
      alert("You cannot cash out yet.");
    }
  };

  return (
    <div className="crashgame-container">
      <div className="crashgame-box">
        <h2 className="crashgame-title">Crash Game</h2>

        {/* Display balance */}
        <div className="crashgame-balance">
          <p>Your Balance: ${userBalance.toFixed(2)}</p>
        </div>

        {/* Bet input field */}
        <div className="crashgame-bet">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="crashgame-input"
            placeholder="Enter Bet Amount"
            disabled={isPlaying}
          />
        </div>

        {/* Current multiplier */}
        <div className="crashgame-stats">
          <p>Current Multiplier: <span className="crashgame-multiplier active">{multiplier.toFixed(2)}x</span></p>
          {isCrashed && crashPoint !== null && (
            <p className="crashgame-info">Crashed at {crashPoint.toFixed(2)}x!</p>
          )}
        </div>

        {/* Buttons */}
        <button 
          className="crashgame-button" 
          onClick={placeBet}
          disabled={isPlaying || betAmount <= 0 || betAmount > userBalance}
        >
          Place Bet
        </button>

        <button 
          className="crashgame-button" 
          onClick={cashOut}
          disabled={!isPlaying || isCrashed}
        >
          Cash Out
        </button>

        {/* Error Message */}
        {isCrashed && (
          <p className="error-message">Game Crashed! Bet again!</p>
        )}
      </div>
    </div>
  );
};

export default CrashGame;
