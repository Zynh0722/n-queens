/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n}); //fixme

  let nRooksHelper = function (row = 0) {
    if (row >= n) {
      return true;
    }

    for (let i = 0; i < n; i++) {
      board.rows()[row][i] = 1;

      if (!board.hasColConflictAt(i)) {
        if (nRooksHelper(row + 1)) {
          return true;
        }
      }

      board.rows()[row][i] = 0;
    }

    return false;
  };

  nRooksHelper(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n}); //fixme

  let solutionCount = 0;

  let usedCols = {};

  let nRooksHelper = function (row = 0, count = 0) {
    if (row >= n) {
      solutionCount++;
      return true;
    }

    for (let i = 0; i < n; i++) {
      if (usedCols[i] === undefined) {
        board.rows()[row][i] = 1;

        usedCols[i] = true;
        nRooksHelper(row + 1, count);
        usedCols[i] = undefined;
      }

      board.rows()[row][i] = 0;
    }

    return false;
  };

  nRooksHelper(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n}); //fixme

  let nQueensHelper = function (row = 0) {
    if (row >= n) {
      return true;
    }

    for (let i = 0; i < n; i++) {
      board.rows()[row][i] = 1;

      if (!board.hasAnyQueensConflicts()) {
        if (nQueensHelper(row + 1)) {
          return true;
        }
      }

      board.rows()[row][i] = 0;
    }

    return false;
  };

  nQueensHelper(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n}); //fixme

  let solutionCount = 0;

  let nQueensHelper = function (row = 0, count = 0) {
    if (row >= n) {
      solutionCount++;
      return true;
    }

    for (let i = 0; i < n; i++) {
      board.rows()[row][i] = 1;

      if (!board.hasColConflictAt(i) &&
          !board.hasAnyMajorDiagonalConflicts(row, i) &&
          !board.hasAnyMinorDiagonalConflicts(row, i)) {
        nQueensHelper(row + 1, count);
      }

      board.rows()[row][i] = 0;
    }

    return false;
  };

  nQueensHelper(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
