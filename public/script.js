function createWalkingPlayer(containerId) {
  const container = document.getElementById(containerId);

  // Add the player
  const player = document.createElement("div");
  player.className = "player forward"; // Start with the forward image
  container.appendChild(player);

  // Add the speaking bubble
  const bubble = document.createElement("div");
  bubble.className = "speaking-bubble";
  bubble.innerText = "You can do it!";
  player.appendChild(bubble);

  // Initial position of the player
  let x = 500; // Adjusted to fit within the isometric container
  let y = 600; // Adjusted to fit within the isometric container
  const step = 2; // Movement step in pixels
  const speed = 100; // Movement speed in milliseconds

  // Set the player's initial position
  player.style.left = `${x}px`;
  player.style.top = `${y}px`;

  // Define boundaries
  const minX = x - 100; // 100 pixels to the left of the starting position
  const minY = y - 100; // 100 pixels above the starting position
  const maxLeft = x - 50; // 50 pixels to the left of the starting position
  const maxRight = x + 150; // 150 pixels to the right of the starting position
  const maxY = y + 100; // 100 pixels below the starting position

  // Current direction of movement
  let directionX = Math.random() < 0.5 ? -1 : 1; // -1 for left, 1 for right
  let directionY = Math.random() < 0.5 ? -1 : 1; // -1 for up, 1 for down
  // Function to move the player
  function movePlayer() {
    // Move horizontally
    if (x + step * directionX > maxRight || x + step * directionX < maxLeft) {
      directionX *= -1; // Reverse direction
    }
    x += step * directionX;

    // Move vertically
    if (y + step * directionY > maxY || y + step * directionY < minY) {
      directionY *= -1; // Reverse direction
    }
    y += step * directionY;

    // Update player's class based on direction
    if (directionY === -1) {
      player.className = "player backward";
    } else if (directionY === 1) {
      player.className = "player forward";
    } else if (directionX === -1) {
      player.className = "player left";
    } else if (directionX === 1) {
      player.className = "player right";
    }

    // Update player's position
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
  }

  // Move the player at regular intervals
  setInterval(movePlayer, speed);
}

// Initialize the player
createWalkingPlayer("isometric-container");

function createSnowflakes(containerId, numFlakes) {
  const container = document.getElementById(containerId);

  for (let i = 0; i < numFlakes; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.width = `${Math.random() * 10 + 5}px`;
    snowflake.style.height = snowflake.style.width;
    snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(snowflake);
  }
}

function removeSnowflakes() {
  const snowflakes = document.querySelectorAll(".snowflake");
  snowflakes.forEach((snowflake) => snowflake.remove());
}

function createLeaves(containerId, numLeaves, leafImageUrl) {
  const container = document.getElementById(containerId);

  for (let i = 0; i < numLeaves; i++) {
    const leaf = document.createElement("div");
    leaf.className = "leaf";
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.width = `${Math.random() * 20 + 10}px`;
    leaf.style.height = leaf.style.width;
    leaf.style.backgroundImage = `url('${leafImageUrl}')`;
    leaf.style.animationDuration = `${Math.random() * 5 + 5}s`;
    leaf.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(leaf);
  }
}

function removeLeaves() {
  const leaves = document.querySelectorAll(".leaf");
  leaves.forEach((leaf) => leaf.remove());
}

// To-Do List Functionality
const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todosContainer = document.querySelector(".todos");
// Filters and Delete All
const showCompleteButton = document.getElementById("show-complete");
const showIncompleteButton = document.getElementById("show-incomplete");
const deleteAllButton = document.getElementById("delete-all");

// Delete All functionality
deleteAllButton.addEventListener("click", () => {
  todosContainer.innerHTML = "";
});

// Show only completed tasks
showCompleteButton.addEventListener("click", () => {
  document.querySelectorAll(".todo").forEach((todo) => {
    if (!todo.querySelector(".completed")) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
});

// Show only incomplete tasks
showIncompleteButton.addEventListener("click", () => {
  document.querySelectorAll(".todo").forEach((todo) => {
    if (todo.querySelector(".completed")) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
});

// Modified addTodo function
function addTodo(task) {
  if (!task) return;

  const todoItem = document.createElement("li");
  todoItem.className = "todo";

  const todoText = document.createElement("span");
  todoText.textContent = task;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  deleteButton.addEventListener("click", () => {
    todosContainer.removeChild(todoItem);
  });

  const completeButton = document.createElement("button");
  completeButton.className = "complete-btn";
  completeButton.innerHTML = '<i class="fa fa-check"></i>';
  completeButton.addEventListener("click", () => {
    todoText.classList.toggle("completed");
    completeButton.classList.toggle("completed");
    todoItem.querySelector("span").style.textDecoration =
      todoText.classList.contains("completed") ? "line-through" : "none";
  });

  todoItem.appendChild(todoText);
  todoItem.appendChild(completeButton);
  todoItem.appendChild(deleteButton);
  todosContainer.appendChild(todoItem);

  todoInput.value = "";
}

// event listeners for addButton
addButton.addEventListener("click", () => addTodo(todoInput.value));
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") addTodo(todoInput.value);
});

let countdownInterval;
let remainingTime;
let totalDuration;

const timeDisplay = document.querySelector(".time-display");
const progressCircle = document.querySelector("circle.progress");
const setTimerInput = document.getElementById("set-timer");
const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");

function updateTimerDisplay(seconds) {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  timeDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

function updateCircleProgress() {
  const progress = (remainingTime / totalDuration) * 283;
  progressCircle.style.strokeDashoffset = progress;
}

function startCountdown() {
  clearInterval(countdownInterval); // Clear any existing countdown
  countdownInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimerDisplay(remainingTime);
      updateCircleProgress();
    } else {
      clearInterval(countdownInterval);
      alert("Time's up!");
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  const inputMinutes = parseInt(setTimerInput.value, 10);
  if (!isNaN(inputMinutes) && inputMinutes > 0) {
    totalDuration = inputMinutes * 60;
    remainingTime = totalDuration;
    updateTimerDisplay(remainingTime);
    updateCircleProgress();
    startCountdown();
  } else if (remainingTime) {
    startCountdown(); // Resume if paused
  }
});

pauseBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
});

document.addEventListener("DOMContentLoaded", function () {
  const seasonSelector = document.getElementById("season");

  // Set the default background to spring
  changeBackground("fall");

  seasonSelector.addEventListener("change", function () {
    const selectedSeason = seasonSelector.value;
    changeBackground(selectedSeason);
  });
});

function changeBackground(season) {
  const gameContainer = document.getElementById("game-container");
  switch (season) {
    case "spring":
      gameContainer.style.backgroundImage = 'url("imgs/Town_spring.png")';
      removeSnowflakes();
      removeLeaves();
      createLeaves("isometric-container", 100, "imgs/sakura_leaf.png");
      break;
    case "summer":
      gameContainer.style.backgroundImage = 'url("imgs/Town_summer.png")';
      removeSnowflakes();
      removeLeaves();
      createLeaves("isometric-container", 100, "imgs/summer_leaf.png");
      break;
    case "fall":
      gameContainer.style.backgroundImage = 'url("imgs/Town_fall.png")';
      removeSnowflakes();
      removeLeaves();
      createLeaves("isometric-container", 100, "imgs/leaf_fall.png");
      break;
    case "winter":
      gameContainer.style.backgroundImage = 'url("imgs/Town_winter.png")';
      removeLeaves();
      createSnowflakes("isometric-container", 100);
      break;
    default:
      gameContainer.style.backgroundImage = "";
  }
}
// To-Do List Minimize/Expand Functionality
const todoContainer = document.querySelector(".todo-container");
const todoTitle = document.querySelector(".todo-container h1");

// Add a toggle event to minimize or expand the Todo List
todoContainer.addEventListener("click", (event) => {
  // Prevent collapsing when clicking inside the container on inputs or buttons
  if (event.target !== todoTitle) return;

  todoContainer.classList.toggle("collapsed");
});

const timerContainer = document.querySelector(".timer-container");

// Add a toggle event to minimize or expand the Timer Container
timeDisplay.addEventListener("click", () => {
  timerContainer.classList.toggle("collapsed");
});

function findSeason() {
  const now = new Date();
  const month = now.getMonth() + 1; // Months are 0-11, so add 1 to make it 1-12
  const day = now.getDate();

  // Determine the season based on month and day
  if (
    (month === 12 && day >= 21) ||
    (month <= 3 && (month === 1 || month === 2 || (month === 3 && day < 20)))
  ) {
    return "Winter";
  } else if (
    (month === 3 && day >= 20) ||
    (month <= 6 && (month === 4 || month === 5 || (month === 6 && day < 21)))
  ) {
    return "Spring";
  } else if (
    (month === 6 && day >= 21) ||
    (month <= 9 && (month === 7 || month === 8 || (month === 9 && day < 22)))
  ) {
    return "Summer";
  } else if (
    (month === 9 && day >= 22) ||
    (month <= 12 &&
      (month === 10 || month === 11 || (month === 12 && day < 21)))
  ) {
    return "Fall";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "1b18e0f9f69d3dc2aa1da8944e1b0f42"; // Replace with your actual API key
  const cityInput = document.getElementById("city-input");
  const weatherIcon = document.getElementById("weather-icon");

  cityInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      // Check for the "Enter" key
      const city = cityInput.value.trim(); // Get the entered city
      if (city) {
        getWeather(city); // Fetch weather if city is not empty
      }
    }
  });

  function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherError = document.getElementById("weather-error"); // Select the error container

    const currentSeason = findSeason().toLowerCase();

    if (currentSeason) {
      document.getElementById("season").value = currentSeason;
      changeBackground(currentSeason);
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          updateWeatherIcon(null);
          document.getElementById("weather-temp").textContent = "";
          throw new Error("Weather data not available");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.weather && data.weather[0]) {
          updateWeatherIcon(data.weather[0].main.toLowerCase());
          weatherError.style.display = "none"; // Hide error message on success
          weatherIcon.style.display = "block";
        }
        if (data.main && data.main.temp) {
          document.getElementById("weather-temp").textContent =
            `${data.main.temp}°C`;
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        weatherError.textContent =
          "Error: Unable to fetch weather data. Please try again.";
        weatherError.style.display = "block"; // Show the error message
      });
  }

  function updateWeatherIcon(weather) {
    switch (weather) {
      case "clear":
        weatherIcon.src = "imgs/sunny.png";
        break;
      case "clouds":
        weatherIcon.src = "imgs/cloudy.png";
        break;
      case "rain":
      case "drizzle":
        weatherIcon.src = "imgs/raining.png";
        break;
      case "snow":
        weatherIcon.src = "imgs/snowing.png";
        break;
      default:
        weatherIcon.style.display = "none";
        break;
    }
  }
});
