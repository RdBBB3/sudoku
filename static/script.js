function getGrid() {
    return fetch("/sudoku/sudoku-json")
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error loading the Sudoku:", error);
            throw error;
        });
}

function solveGrid(grid) {
    function isValid(grid, row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num || grid[x][col] === num) {
                return false;
            }
        }

        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] == 0) {
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
        return grid;
    }

    solve();
    return true;
}

function putBlanksInGrid(grid, numberToRemove) {
    const size = grid.length;
    let cellsToRemove = numberToRemove;
    const grid2 = JSON.parse(JSON.stringify(grid));
    while (cellsToRemove > 0) {
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);

        if (grid[row][col] != 0) {
            let temp = grid[row][col];
            grid[row][col] = 0;

            if (solveGrid(grid2)) {
                cellsToRemove--;
            } else {
                grid[row][col] = temp;
            }
        }
    }
    return grid;
}

function displayFront(finishedGrid) {
    var table = document.getElementById("sudokuGrid");
    for (let i = 0; i < 9; i++) {
        var row = document.createElement("tr");
        for (let y = 0; y < 9; y++) {
            var cell = document.createElement("td");
            if (finishedGrid[i][y] == 0) {
                cell.textContent = "";
                cell.contentEditable = true;
            } else {
                cell.textContent = finishedGrid[i][y];
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function captureInput(grid) {
    var table = document.getElementById("sudokuGrid");
    for (let i = 0; i < 9; i++) {
        for (let y = 0; y < 9; y++) {
            var cell = document.addEventListener("input");
            if (cell.k)
                if (cell == grid[i][y]) {
                    alert("Bonne Réponse");
                } else {
                    alert("Faux");
                }
        }
    }
}

getGrid().then((grid) => {
    let finishedGrid = putBlanksInGrid(grid, 40);
    displayFront(finishedGrid);
    captureInput(grid);
});
