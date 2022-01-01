import React from 'react';

import { GameStatuses } from './gameSlice';
import { selectGameStatus, selectCurrentPiece } from './gameSelectors';
import { useSelector } from 'react-redux';
import { PieceFactory } from './pieces/pieces';

const PIECE_CELL_SIZE = 32;

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

const Piece = ({ piece }) => {
  const offsets = PieceFactory(piece).render();

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
              className="piece-cell"
              style={{ left: `${ offset[0] * PIECE_CELL_SIZE }px`, top: `${ offset[1] * PIECE_CELL_SIZE }px` }}
            />
          );
        })
      }
    </div>
  )
}

const CurrentPiece = () => {
  const piece = useSelector(selectCurrentPiece);

  return piece === null ? null : <Piece piece={ piece } />
}

const Game = () => {
  const gameStatus = useSelector(selectGameStatus);

  return (
    <div id="game">
      { gameStatus === GameStatuses.stopped &&
        <GameStopped /> }
      <CurrentPiece />
    </div>
  );
}

export default Game;
