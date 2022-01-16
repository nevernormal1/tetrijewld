import React from 'react';

import { GameStatuses, PIECE_CELL_SIZE } from './constants';
import {
  selectGameStatus,
  selectCurrentPiece,
  selectAffixedCells,
} from './gameSelectors';
import { useSelector } from 'react-redux';
import { pieceCells } from './pieces/pieces';
import GameStopped from './GameStopped';

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

const AffixedCells = () => {
  const cells = useSelector(selectAffixedCells);

  return cells.map(cell => (
    <Cell key={ cell.id } cell={ cell } />
  ))
};

const CurrentPiece = () => {
  const piece = useSelector(selectCurrentPiece);

  if (piece === null) {
    return null;
  }

  return pieceCells(piece).map(cell => <Cell key={ cell.id } cell={ cell } />);
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
