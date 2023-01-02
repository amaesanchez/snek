"use strict";

/** create board game class
 * - create method for making the boardgame in memory
 * - create method for randomizing food
 * - create method for when snake goes up/down/left/right
 */

class Boardgame {
  /** create boardgame given width and height
   * which will be the # of elements in a row & # of rows
   * - also has
   */
  constructor(width = 30, height = 30) {
    this.width = width;
    this.height = height;
    this.food = {char: "o", X: null, Y: null};
    this.matrix = null;
  }

  makeGame() {
    const rows = Array.from({ length: this.height });
    const matrix = rows.map(row => Array.from({ length: this.width }).fill(0));
    // .map(i => null)
    this.matrix = matrix;
  }

  placeFood() {
    // pick and RETURNrandom row and random index
    // at that location,

    const randomRow = Math.floor(Math.random() * (this.height + 1));
    const randomCol = Math.floor(Math.random() * (this.width + 1));
    this.matrix[randomRow][randomCol] = this.food.char;

    this.food.X = randomCol;
    this.food.Y = randomRow;

    return [randomRow, randomCol];

  }

  startGame() {
    console.debug("startGame method");
    this.makeGame();
    this.placeFood();
  }
}




/** create snake instance
 * - create method for lengthening snake when it eats food
 */
class Snake {
  constructor(y=game.height - 1, x=0) {
    this.direction = "ArrowRight";
    this.body = [{X: x, Y: y}];
  }

  // method for adding a snake cell when it eats food
  static addSnakeBody(row, cell) {
    console.debug("addSnakedebug", this.direction);

    const newBody = new Snake(row, cell);
    this.body.push(newBody);
    game.matrix[row][cell] = newBody;

    console.log(game.matrix[row])
  }

  // method for changing the direction of the FRONT of the snake??


}

// you dont need an object instance in every cell, just instances for the snake
// to keep track?
