import React from 'react';

import { GameStatuses } from './gameSlice';
import { selectGameStatus, selectCurrentPiece } from './gameSelectors';
import { useSelector } from 'react-redux';

import Piece0 from './pieces/piece0';
import Piece1 from './pieces/piece1';
import Piece2 from './pieces/piece2';
import Piece3 from './pieces/piece3';
import Piece4 from './pieces/piece4';
import Piece5 from './pieces/piece5';
import Piece6 from './pieces/piece6';

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

const PieceRenderers = [
  Piece0, Piece1, Piece2, Piece3, Piece4, Piece5, Piece6
]

const Piece = ({ piece }) => {
  const Renderer = PieceRenderers[piece.type];
  const offsets = Renderer({ piece });

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
