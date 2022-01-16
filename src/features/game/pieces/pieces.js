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

export const pieceCells = (piece) => {
  const pieceObj = PieceFactory(piece);

  return pieceObj.offsets().map((offset, index) => ({
    id: piece.id + index,
    x: piece.x + offset[0],
    y: piece.y + offset[1],
    color: piece.colors[index],
  }));
}
