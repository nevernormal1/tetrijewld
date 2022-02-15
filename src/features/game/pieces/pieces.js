import { COLORS, NUM_ROWS, NUM_COLUMNS } from '../constants';

import Piece0 from './piece0';
import Piece1 from './piece1';
import Piece2 from './piece2';
import Piece3 from './piece3';
import Piece4 from './piece4';
import Piece5 from './piece5';
import Piece6 from './piece6';

const PieceClasses = [
  Piece0, Piece1, Piece2, Piece3, Piece4, Piece5, Piece6
]

export const PieceFactory = (piece) => {
  const PieceClass = PieceClasses[piece.type];

  return {
    ...PieceClass({ piece }),
    x: piece.x,
    y: piece.y,
    rotation: piece.rotation,
  };
}

export const cellsForPiece = (piece) => {
  const pieceObj = PieceFactory(piece);

  return pieceObj.offsets().map((offset, index) => ({
    id: piece.id + index,
    x: piece.x + offset[0],
    y: piece.y + offset[1],
    color: piece.colors[index],
  }));
}

const randomColor = () => (
  COLORS[Math.floor(Math.random() * 7)]
);

export const randomPiece = function() {
  let id = 0;

  return () => {
    const nextId = id;
    id += 1;

    return {
      id: nextId,
      type: Math.floor(Math.random() * 7),
      x: 4,
      y: 0,
      rotation: 0,
      colors: Array(4).fill(0).map(randomColor),
    };
  };
}();

const insideLeftBoundary = (pieceObj) => (
  pieceObj.offsets().every(offset => (
    pieceObj.x + offset[0] >= 0
  ))
);

const insideRightBoundary = (pieceObj) => (
  pieceObj.offsets().every(offset => (
    pieceObj.x + offset[0] < NUM_COLUMNS
  ))
);

const insideBottomBoundary = (pieceObj) => (
  pieceObj.y + pieceObj.height() <= NUM_ROWS
);

const collidesWithCell = (pieceObj, cell) => (
  pieceObj.offsets().some(offset => (
    pieceObj.x + offset[0] === cell.x &&
      pieceObj.y + offset[1] === cell.y
  ))
);

const collidesWithCells = (pieceObj, cells) => (
  cells.some(cell => collidesWithCell(pieceObj, cell))
)

export const roomForPiece = (piece, affixedCells) => {
  const pieceObj = PieceFactory(piece);

  return insideLeftBoundary(pieceObj) && insideRightBoundary(pieceObj) &&
    insideBottomBoundary(pieceObj) && !collidesWithCells(pieceObj, affixedCells);
};

