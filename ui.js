"use strict";

const $GAME_BOARD = $("#gameboard");
const TIMER_MS = 250;
const KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
let intervalID;

function displayGame() {
  // create a grid using matrix in memory
  // append to #gameboard
  let $tbody = $("<tbody>");

  for (let i = 0; i < game.height; i++) {
    let $matrixRow = $("<tr>");
    for (let j = 0; j < game.width; j++) {
      $matrixRow.append($("<td>"));
    }
    $tbody.append($matrixRow);
  }

  $GAME_BOARD.attr("style", `width:${10 * game.width}px`);
  $GAME_BOARD.append($tbody);
}

/** places food item at random cell on grid */
function displayFood() {
  let [randomRow, randomCol] = [game.food.Y, game.food.X];

  // get to random cell and change its bg color
  // (pref with jQuery but couldnt figure it out)
  // store the food coordinates so when snake reaches food,
  // new snakebody is added at the food coord?

  const rows = document.querySelectorAll("tr");
  const foodCell = rows[randomRow].children[randomCol];
  foodCell.setAttribute("style", "background-color:red");
}

function displaySnake() {
  console.debug("displaySnake", snake.body);
  // make snake instance and place
  // at the last row, first cell in memory FIRSt

  const rows = document.querySelectorAll("tr");
  for (let coord of snake.body) {
    console.log(rows, coord.X, coord.Y);
    const snake_body = rows[coord.Y].children[coord.X];
    snake_body.setAttribute("style", "background-color: yellow");
  }
  console.log('body', snake.body)
}

function updateDirection(evt) {
  evt.preventDefault();
  const key = evt.originalEvent.key;

  if (KEYS.includes(key)) {
    snake.direction = key;
  }
}

function updateTile(coord) {
  const rows = document.querySelectorAll("tr");
  const cell = rows[coord.Y].children[coord.X];
  cell.setAttribute("style", "background-color:black");
}

function updateSnake() {
  const last_body = snake.body[snake.body.length - 1];

  if (snake.direction === "ArrowUp") {
    const new_body = { X: last_body.X, Y: last_body.Y - 1 };
    snake.body.unshift(new_body);
  } else if (snake.direction === "ArrowDown") {
    const new_body = { X: last_body.X, Y: last_body.Y + 1 };
    snake.body.unshift(new_body);
  } else if (snake.direction === "ArrowLeft") {
    const new_body = { X: last_body.X - 1, Y: last_body.Y };
    snake.body.unshift(new_body);
  } else if (snake.direction === "ArrowRight") {
    const new_body = { X: last_body.X + 1, Y: last_body.Y };
    snake.body.unshift(new_body);
  }
}

function moveSnake() {
  if (!checkForBounds()) {
    clearTimeout(intervalID);
    alert('you lose')
    return
  }
  const last_body = snake.body[snake.body.length - 1];
  updateTile(last_body)

  if (snake.direction === "ArrowUp") {
    const new_body = { X: last_body.X, Y: last_body.Y - 1 };
    snake.body.unshift(new_body);
    snake.body.pop();
  } else if (snake.direction === "ArrowDown") {
    const new_body = { X: last_body.X, Y: last_body.Y + 1 };
    snake.body.unshift(new_body);
    snake.body.pop();
  } else if (snake.direction === "ArrowLeft") {
    const new_body = { X: last_body.X - 1, Y: last_body.Y };
    snake.body.unshift(new_body);
    snake.body.pop();
  } else if (snake.direction === "ArrowRight") {
    const new_body = { X: last_body.X + 1, Y: last_body.Y };
    snake.body.unshift(new_body);
    snake.body.pop();
  }
  console.log("movesnake", snake.body)

  if (checkForFood()) {
    updateSnake()
    game.placeFood();
    displayFood();
  }

  displaySnake()
}

function checkForBounds() {
  const head = snake.body[0]

  if (head.Y >= game.height || head.Y < 0 || head.X >= game.width || head.X < 0) {
    return false
  }
  return true;
}

function checkForFood() {
  const head = snake.body[0]

  if (head.X == game.food.X && head.Y == game.food.Y) {
    console.log('true')
    return true
  }

  return false
}

/** Start game */
function startGame() {
  $GAME_BOARD.empty();
  game = new Boardgame();
  snake = new Snake();


  game.startGame();

  displayGame();
  displayFood();
  displaySnake();

  if (intervalID) {
    clearTimeout(intervalID);
  }

  intervalID = setInterval(moveSnake, TIMER_MS);
}

let game;
let snake;
$("#start").on("click", startGame);
$(document).keydown(updateDirection);

/** while the snake hasnt hit a wall or itself
 *
 * - EVERY 500ms or so, pop the last snake cell and
 * - push to the front of the cell
 * - use the snake.direction of the front snake cell to figure out
 * - where to push the new snake instance
 * - check for food at each move
 *
 * - when snake encounters food "o", add to snake body
 * - and displayfood again
 *
 */
