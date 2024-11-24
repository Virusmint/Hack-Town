import React, { useState, useEffect } from "react";

function Timer() {
  return (
    <div className="timer-container">
      <div className="circle">
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle className="background" cx="50" cy="50" r="45"></circle>
          <circle className="progress" cx="50" cy="50" r="45"></circle>
        </svg>
        <div className="time-display">00:00:00</div>
      </div>
      <div className="timer-controls">
        <input type="number" id="set-timer" placeholder="Enter minutes" />
        <button className="start-btn">Start</button>
        <button className="pause-btn">Pause</button>
      </div>
    </div>
  );
}

export default Timer;
