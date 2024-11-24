import React, { useEffect, useState } from "react";

function Game() {
  const [position, setPosition] = useState({ x: 200, y: 100 }); // Initial position
  const STEP = 10; // Movement step in pixels
  const [direction, setDirection] = useState("forward"); // Player direction

  useEffect(() => {
    const handleKeyDown = (event) => {
      setPosition((prevPosition) => {
        let newX = prevPosition.x;
        let newY = prevPosition.y;

        switch (event.key) {
          case "ArrowUp":
            newY -= STEP;
            setDirection("backward");
            break;
          case "ArrowDown":
            newY += STEP;
            setDirection("forward");
            break;
          case "ArrowLeft":
            newX -= STEP;
            setDirection("forward");
            break;
          case "ArrowRight":
            newX += STEP;
            setDirection("forward");
            break;
          default:
            break;
        }

        return { x: newX, y: newY };
      });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div id="game-container">
      <div
        id="isometric-container"
        style={{
          position: "relative",
          width: "500px",
          height: "300px",
          border: "1px solid #ccc",
        }}
      >
        <div
          id="player"
          className={`player ${direction}`}
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: "40px",
            height: "40px",
            backgroundColor: "blue", // Placeholder for the player's visual representation
            borderRadius: "50%", // Make the player look like a circle
          }}
        ></div>
      </div>
    </div>
  );
}

export default Game;
