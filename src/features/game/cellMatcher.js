const matchedCellsInLine = (line) => {
  let ret = [];
  let matchedCells = [];
  let previousIndex = -1;

  const addMatchedGroup = (cells) => {
    if (cells.length >= 3) {
      ret = [...ret, ...cells];
    }
  }

  line.forEach((cell, index) => {
    if (matchedCells.length === 0 ||
      (index === previousIndex + 1 && cell.color === matchedCells[0].color)) {
      matchedCells.push(cell);
    } else {
      addMatchedGroup(matchedCells);
      matchedCells = [cell];
    }

    previousIndex = index;
  });

  addMatchedGroup(matchedCells);

  return ret;
};

export const findMatchedCells = (affixedCells) => {
  const ret = new Set();

  let gridCells = [];

  affixedCells.forEach((affixedCell) => {
    gridCells[affixedCell.x] ||= [];
    gridCells[affixedCell.x][affixedCell.y] = affixedCell;
  });

  gridCells.forEach((column, index) => {
    matchedCellsInLine(column).forEach(cell => ret.add(cell));
  });

  gridCells = [];

  affixedCells.forEach((affixedCell) => {
    gridCells[affixedCell.y] ||= [];
    gridCells[affixedCell.y][affixedCell.x] = affixedCell;
  });

  gridCells.forEach((row, index) => {
    matchedCellsInLine(row).forEach(cell => ret.add(cell));
  });

  return [...ret];
};

