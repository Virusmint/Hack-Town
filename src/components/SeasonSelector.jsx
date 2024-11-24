import React, { useState, useEffect } from "react";

function SeasonSelector() {
  // Initialize state with the default selected season
  const [selectedSeason, setSelectedSeason] = useState("fall");

  // Update the background image when the selected season changes
  useEffect(() => {
    const gameContainer = document.getElementById("game-container");

    const changeBackground = (season) => {
      switch (season) {
        case "spring":
          gameContainer.style.backgroundImage = 'url("imgs/Town_spring.png")';
          break;
        case "summer":
          gameContainer.style.backgroundImage = "../imgs/Town_summer.png";
          break;
        case "fall":
          gameContainer.style.backgroundImage = 'url("imgs/Town_fall.png")';
          break;
        case "winter":
          gameContainer.style.backgroundImage = 'url("imgs/Town_winter.png")';
          break;
        default:
          gameContainer.style.backgroundImage = "";
      }
    };

    changeBackground(selectedSeason);
  }, [selectedSeason]); // Runs only when selectedSeason changes

  // Handle change in selected season
  const handleChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <div className="season-selector">
      <label htmlFor="season">Select Season:</label>
      <select
        id="season"
        value={selectedSeason} // Bind state to the select
        onChange={handleChange} // Update state when value changes
      >
        <option value="spring">Spring</option>
        <option value="summer">Summer</option>
        <option value="fall">Fall</option>
        <option value="winter">Winter</option>
      </select>
    </div>
  );
}

export default SeasonSelector;
