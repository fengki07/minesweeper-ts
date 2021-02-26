import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from '../constants';
import { Cell, CellValue, CellState } from '../types';

const grabAllAdjacentCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number): {
    topLeftcell: Cell | null;
    topcell: Cell | null;
    topRighcell: Cell | null;
    leftcell: Cell | null;
    righcell: Cell | null;
    butttomLeftcell: Cell | null;
    buttomcell: Cell | null;
    buttomrighcell: Cell | null;


  } => {
  const topLeftcell = rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  const topcell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  const topRighcell = rowParam > 0 && colParam < MAX_COLS - 1 ? cells[rowParam - 1][colParam + 1] : null;
  const leftcell = colParam > 0 ? cells[rowParam][colParam] : null;
  const righcell = colParam < MAX_COLS - 1 ? cells[rowParam][colParam + 1] : null;
  const butttomLeftcell = rowParam < MAX_ROWS - 1 && colParam > 0 ? cells[rowParam + 1][colParam - 1] : null;
  const buttomcell = rowParam < MAX_ROWS - 1 ? cells[rowParam + 1][colParam] : null;
  const buttomrighcell = rowParam < MAX_ROWS - 1 && colParam < MAX_COLS - 1 ? cells[rowParam + 1][colParam + 1] : null;

  return {
    topLeftcell,
    topcell,
    topRighcell,
    leftcell,
    righcell,
    butttomLeftcell,
    buttomcell,
    buttomrighcell,

  }
}

export const Generatecells = () => {
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
    const currentcell = cells[randomRow][randomCol];
    if (currentcell.value !== CellValue.bomb) {
      cells = cells.map((row, rowParam) =>
        row.map((cell, colParam) => {
          if (randomRow === rowParam && randomCol === colParam) {
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
      const currentcell = cells[rowIndex][colIndex];
      if (currentcell.value === CellValue.bomb) {
        continue;
      }
      let numberOfBomb = 0;
      const {
        topLeftcell,
        topcell,
        topRighcell,
        leftcell,
        righcell,
        butttomLeftcell,
        buttomcell,
        buttomrighcell

      } = grabAllAdjacentCells(cells, rowIndex, colIndex);

      if (topLeftcell?.value === CellValue.bomb) {
        numberOfBomb++;
      }
      if (topcell?.value === CellValue.bomb) {
        numberOfBomb++;
      }
      if (topRighcell?.value === CellValue.bomb) {
        numberOfBomb++;
      }
      if (leftcell?.value === CellValue.bomb) {
        numberOfBomb++;
      }
      if (righcell?.value === CellValue.bomb) {
        numberOfBomb++;
      }
      if (butttomLeftcell?.value === CellValue.bomb) {
        numberOfBomb++;
      }
      if (buttomcell?.value === CellValue.bomb) {
        numberOfBomb++;
      }
      if (buttomrighcell?.value === CellValue.bomb) {
        numberOfBomb++;
      }
      if (numberOfBomb > 0) {
        cells[rowIndex][colIndex] = {
          ...currentcell,
          value: numberOfBomb
        }
      }
    }
  }

  return cells;
}

export const openMultipleCells = (cells: Cell[][], rowParam: number, colParam: number): Cell[][] => {
  const currentCell = cells[rowParam][colParam];

  if (
    currentCell.state === CellState.visible ||
    currentCell.state === CellState.flagged
  ) {
    return cells;
  }
  let newCells = cells.slice();
  newCells[rowParam][colParam].state = CellState.visible;
  const {
    topLeftcell,
    topcell,
    topRighcell,
    leftcell,
    righcell,
    butttomLeftcell,
    buttomcell,
    buttomrighcell

  } = grabAllAdjacentCells(cells, rowParam, colParam);

  if (
    topLeftcell?.state === CellState.open &&
    topLeftcell.value !== CellValue.bomb
  ) {
    if (topLeftcell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, rowParam - 1);
    } else {
      newCells[rowParam - 1][colParam - 1].state = CellState.visible;
    }
  }

  if (topcell?.state === CellState.open && topcell.value !== CellValue.bomb) {
    if (topcell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, colParam);
    } else {
      newCells[rowParam - 1][colParam].state = CellState.visible;
    } 
  }

  if (
    topRighcell?.state === CellState.open &&
    topRighcell.value !== CellValue.bomb
  ) {
    if (topRighcell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, colParam + 1);
    } else {
      newCells[rowParam - 1][colParam + 1].state = CellState.visible;
    }
  }

  if (leftcell?.state === CellState.open && leftcell.value !== CellValue.bomb) {
    if (leftcell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam - 1);
    } else {
      newCells[rowParam][colParam - 1].state = CellState.visible;
    }
  }

  if (
    righcell?.state === CellState.open &&
    righcell.value !== CellValue.bomb
  ) {
    if (righcell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam + 1);
    } else {
      newCells[rowParam][colParam + 1].state = CellState.visible;
    }
  }

  if (
    butttomLeftcell?.state === CellState.open &&
    butttomLeftcell.value !== CellValue.bomb
  ) {
    if (butttomLeftcell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, colParam - 1);
    } else {
      newCells[rowParam + 1][colParam - 1].state = CellState.visible;
    }
  }

  if (
    buttomcell?.state === CellState.open &&
    buttomcell.value !== CellValue.bomb
  ) {
    if (buttomcell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, colParam);
    } else {
      newCells[rowParam + 1][colParam].state = CellState.visible;
    }
  }

  if (
    buttomrighcell?.state === CellState.open &&
    buttomrighcell.value !== CellValue.bomb
  ) {
    if (buttomrighcell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, colParam + 1);
    } else {
      newCells[rowParam + 1][colParam + 1].state = CellState.visible;
    }
  }

  return newCells;
};