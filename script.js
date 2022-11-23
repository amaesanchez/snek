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
  constructor(width=50, height=50) {
    this.width = width;
    this.height = height;
    this.food = "o"
  }

  makeGame() {
    const rows = Array.from({length: height});
    const matrix = rows.map(row => Array.from({length: width}));

    console.log(matrix);
  }
}



/** create snake instance
 * - create method for lengthening snake when it eats food
 */

const game = new Boardgame();
