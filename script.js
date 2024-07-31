function solveGrid(grid) {
  function isValid(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) {
        return false;
      }
    }
    for (let y = 0; y < 9; y++) {
      if (grid[y][col] === num) {
        return false;
      }
    }
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let y = 0; y < 3; y++) {
        if (grid[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col << 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;

              if (solve()) {
                return true;
              }

              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve();
  return grid;
}

function getGrid() {
  //Linker le fichier python pour que le fichier python génère la grille. Cette fonction à pour but de la récupérer.
  return grid;
}
