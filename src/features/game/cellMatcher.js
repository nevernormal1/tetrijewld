import { NUM_ROWS, NUM_COLUMNS } from './constants';

export const findMatchedCells = (pieceCells, affixedCells) => {
  const ret = new Set();

  const gridCells = new Array(NUM_COLUMNS);

  affixedCells.forEach((affixedCell) => {
    gridCells[affixedCell.x] ||= new Array(NUM_ROWS);
    gridCells[affixedCell.x][affixedCell.y] = affixedCell;
  });

  pieceCells.forEach(pieceCell => {
    let gridCell = gridCells[pieceCell.x][pieceCell.y];

    let cellsInRow = [gridCell];
    let cellsInColumn = [gridCell];

    const gridCellMatch = (gridCell) => (
      gridCell && gridCell.color === pieceCell.color
    );

    for (let i=pieceCell.x - 1; i>= 0; i--) {
      const gridColumn = gridCells[i];
      gridCell = gridColumn && gridColumn[pieceCell.y];
      if (gridCellMatch(gridCell)) {
        cellsInRow.push(gridCell);
      } else {
        break;
      }
    }

    for (let i=pieceCell.x + 1; i<NUM_COLUMNS; i++) {
      const gridColumn = gridCells[i];
      gridCell = gridColumn && gridColumn[pieceCell.y];
      if (gridCellMatch(gridCell)) {
        cellsInRow.push(gridCell);
      } else {
        break;
      }
    }

    for (let i=pieceCell.y - 1; i>= 0; i--) {
      const gridColumn = gridCells[pieceCell.x];
      gridCell = gridColumn && gridColumn[i];
      if (gridCellMatch(gridCell)) {
        cellsInColumn.push(gridCell);
      } else  {
        break;
      }
    }

    for (let i=pieceCell.y + 1; i<NUM_ROWS; i++) {
      const gridColumn = gridCells[pieceCell.x];
      gridCell = gridColumn && gridColumn[i];
      if (gridCellMatch(gridCell)) {
        cellsInColumn.push(gridCell);
      } else {
        break;
      }
    }

    if (cellsInRow.length >= 3) {
      cellsInRow.forEach(cell => ret.add(cell));
    }

    if (cellsInColumn.length >= 3) {
      cellsInColumn.forEach(cell => ret.add(cell));
    }
  });

  return [...ret];
};

