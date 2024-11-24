function createWalkingPlayer(containerId) {
  const container = document.getElementById(containerId);

  // Add the player
  const player = document.createElement("div");
  player.className = "player forward"; // Start with the forward image
  container.appendChild(player);

  // Initial position of the player
  let x = 200; // Adjusted to fit within the isometric container
  let y = 100; // Adjusted to fit within the isometric container
  const step = 10; // Movement step in pixels

  // Set the player's initial position
  player.style.left = `${x}px`;
  player.style.top = `${y}px`;

  // Handle keyboard input for movement
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        y -= step;
        player.className = "player backward";
        break;
      case "ArrowDown":
        y += step;
        player.className = "player forward";
        break;
      case "ArrowLeft":
        x -= step;
        player.className = "player forward";
        break;
      case "ArrowRight":
        x += step;
        player.className = "player forward";
        break;
    }

    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
  });
}

// Initialize the player
createWalkingPlayer("isometric-container");

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
  const gameContainer = document.getElementById("game-container");

  // Set the default background to spring
  changeBackground("fall");

  seasonSelector.addEventListener("change", function () {
    const selectedSeason = seasonSelector.value;
    changeBackground(selectedSeason);
  });

  function changeBackground(season) {
    switch (season) {
      case "spring":
        gameContainer.style.backgroundImage = 'url("imgs/Town_spring.png")';
        break;
      case "summer":
        gameContainer.style.backgroundImage = 'url("imgs/Town_summer.png")';
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
  }
});

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
