import json
import random

def isValid(grid, row, col, num):
    for x in range(9):
        if grid[row][x] == num:
            return False
    for y in range(9):
        if grid[y][col] == num:
            return False
    

    startRow = row - row % 3
    startCol = col - col % 3
    
    for i in range(3):
        for j in range(3):
            if grid[i + startRow][j + startCol] == num:
                return False
    
    return True

def solveSudoku(grid):
    for i in range(9):
        for j in range(9):
            if grid[i][j] == 0:
                for num in range(1,10):
                    if isValid(grid, i, j, num):
                        grid[i][j] = num
                        if solveSudoku(grid):
                            return True
                        grid[i][j] = 0
                return False
    return True                       

def print_board(grid):
    for row in grid:
        print(f"{row}")
    print("\n \n")
            
      

first_row = random.sample(range(1, 10), 9)
grid = [first_row] + [[0 for _ in range(9)] for _ in range(8)]
solveSudoku(grid)

with open('sudoku.json', 'w') as f:
        json.dump(grid, f)
