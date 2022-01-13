import React from 'react';

import { GameStatuses, PIECE_CELL_SIZE } from './constants';
import {
  selectGameStatus,
  selectCurrentPiece,
  selectDroppedPieces,
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

const Piece = ({ piece }) => {
  const offsets = PieceFactory(piece).offsets();

  return (
    <div
      key={ piece.id }
      className="piece-container"
      style={ { left: `${ piece.x * PIECE_CELL_SIZE }px`, top: `${ piece.y * PIECE_CELL_SIZE }px` } }
    >
      {
        offsets.map((offset, index) => {
          return (
            <div
              key={`${ piece.id }:${ index }`}
              className={ `piece-cell ${ piece.colors[index] }` }
              style={{ left: `${ offset[0] * PIECE_CELL_SIZE }px`, top: `${ offset[1] * PIECE_CELL_SIZE }px` }}
            />
          );
        })
      }
    </div>
  )
}

const DroppedPieces = () => {
  const pieces = useSelector(selectDroppedPieces);

  return pieces.map(piece => (
    <Piece key={ piece.id } piece={ piece } />
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
      <DroppedPieces />
    </div>
  );
}

export default Game;
