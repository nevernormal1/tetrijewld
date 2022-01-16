import React from 'react';

import { GameStatuses, PIECE_CELL_SIZE } from './constants';
import {
  selectGameStatus,
  selectCurrentPiece,
  selectAffixedCells,
} from './gameSelectors';
import { useSelector } from 'react-redux';
import { PieceFactory } from './pieces/pieces';

const GameStopped = () => {
  return (
    <div className="instructions">
      <table>
        <tbody>
          <tr>
            <td><code>Z</code></td>
            <td>Rotate Left</td>
          </tr>
          <tr>
            <td><code>&uarr;</code></td>
            <td>Rotate Right</td>
          </tr>
          <tr>
            <td><code>&larr;</code></td>
            <td>Move Left</td>
          </tr>
          <tr>
            <td><code>&rarr;</code></td>
            <td>Move Left</td>
          </tr>
        </tbody>
      </table>

      <p>Press any key to start</p>
    </div>
  );
}

const GameOver = () => {
  return (
    <div className="instructions">
      <p>Game over!</p>
    </div>
  );
}

const Cell = ({ cell }) => {
  return (
    <div
      className={ `piece-cell ${ cell.color }` }
      style={{ left: `${ cell.x * PIECE_CELL_SIZE }px`, top: `${ cell.y * PIECE_CELL_SIZE }px` }}
    />
  )
}

const Piece = ({ piece }) => {
  const pieceObj = PieceFactory(piece);
  const cells = pieceObj.offsets().map((offset, index) => ({
    id: piece.id + index,
    x: pieceObj.x + offset[0],
    y: pieceObj.y + offset[1],
    color: piece.colors[index],
  }));

  return cells.map(cell => <Cell cell={ cell } />);
}

const AffixedCells = () => {
  const cells = useSelector(selectAffixedCells);

  return cells.map(cell => (
    <Cell key={ cell.id } cell={ cell } />
  ))
};

const CurrentPiece = () => {
  const piece = useSelector(selectCurrentPiece);

  return piece === null ? null : <Piece piece={ piece } />
};

const Game = () => {
  const gameStatus = useSelector(selectGameStatus);

  return (
    <div id="game">
      { gameStatus === GameStatuses.stopped &&
        <GameStopped /> }

      { gameStatus === GameStatuses.over &&
        <GameOver /> }

      <CurrentPiece />
      <AffixedCells />
    </div>
  );
}

export default Game;
