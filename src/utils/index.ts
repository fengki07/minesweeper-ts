import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from '../constants';
import { Cell, CellValue, CellState } from '../types';


export const GenerateCells = () => {
    let cells: Cell[][] = [];

    for (let row = 0; row < MAX_ROWS; row++) {
        cells.push([]);
        for (let col = 0; col < MAX_COLS; col++) {
            cells[row].push({
                value: CellValue.none,
                state: CellState.open,
            })
        }
    }
    let bombsPlaced = 0;
    while (bombsPlaced < NO_OF_BOMBS) {
        const randomRow = Math.floor(Math.random() * MAX_ROWS);
        const randomCol = Math.floor(Math.random() * MAX_COLS);
        const currentCell = cells[randomRow][randomCol];
        if (currentCell.value !== CellValue.bomb) {
            cells = cells.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                if (randomRow === rowIndex && randomCol === colIndex) {
                  return {
                    ...cell,
                    value: CellValue.bomb
                  };
                }
      
                return cell;
              })
            );
            bombsPlaced++;
          }
        }
      for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
        for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
          const currentCell= cells[rowIndex][colIndex];
          if (currentCell.value === CellValue.bomb) {
            continue;
          }
          let numberOfBomb = 0;
          const topLeftBomb = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex -1] : null;
          const topBomb = rowIndex > 0 ? cells[rowIndex -1][colIndex]: null ;
          const topRighBomb = rowIndex > 0 && colIndex < MAX_COLS -1 ? cells[rowIndex -1][colIndex +1]: null;
          const leftBomb =  colIndex > 0 ? cells[rowIndex][colIndex]: null;
          const righBomb = colIndex < MAX_COLS -1 ? cells[rowIndex][colIndex +1]: null ;
          const butttomLeftBomb = rowIndex < MAX_ROWS -1 && colIndex > 0 ? cells[rowIndex +1][colIndex -1]: null;
          const buttomBomb = rowIndex < MAX_ROWS -1 ? cells[rowIndex +1][colIndex]: null ;
          const buttomrighBombs = rowIndex < MAX_ROWS -1 && colIndex < MAX_COLS -1 ? cells[rowIndex +1][colIndex +1]:null;

          if (topLeftBomb?.value === CellValue.bomb) {
            numberOfBomb++;
          }
          if (topBomb?.value === CellValue.bomb) {
            numberOfBomb++;
          }
          if (topRighBomb?.value === CellValue.bomb) {
            numberOfBomb++;
          }
          if (leftBomb?.value === CellValue.bomb) {
            numberOfBomb++;
          }
          if (righBomb?.value === CellValue.bomb) {
            numberOfBomb++;
          }
          if (butttomLeftBomb?.value === CellValue.bomb) {
            numberOfBomb++;
          }
          if (buttomBomb?.value === CellValue.bomb) {
            numberOfBomb++;
          }
          if (buttomrighBombs?.value === CellValue.bomb) {
            numberOfBomb++;
          }
          if (numberOfBomb > 0 ) {
            cells[rowIndex][colIndex] = {
              ... currentCell,
              value: numberOfBomb
            }
          }
        }
      }

    return cells;
}

