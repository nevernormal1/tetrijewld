import React from 'react';

import {
  GameStatuses,
  PIECE_CELL_SIZE,
  PIECE_CELL_THUMB_SIZE,
} from './constants';
import {
  selectGameStatus,
  selectCurrentPiece,
  selectAffixedCells,
  selectNextPieces,
} from './gameSelectors';
import { useSelector } from 'react-redux';
import { cellsForPiece } from './pieces/pieces';
import GameStopped from './GameStopped';

const GameOver = () => {
  return (
    <div className="instructions">
      <p>Game over!</p>
    </div>
  );
}

const Cell = ({ cell, size }) => {
  const style = {
    left: `${ cell.x * size }px`,
    top: `${ cell.y * size }px`,
  }

  return (
    <div
      className={ `piece-cell ${ cell.color } ${ cell.matched ? "matched" : "" }`}
      style={ style }
    />
  )
}

const AffixedCells = () => {
  const cells = useSelector(selectAffixedCells);

  return cells.map(cell => (
    <Cell key={ cell.id } cell={ cell } size={ PIECE_CELL_SIZE }/>
  ))
};

const Piece = ({ piece, size }) => {
  return piece && cellsForPiece(piece).map(cell => (
    <Cell key={ cell.id } cell={ cell } size={ size } />
  ));
};

const CurrentPiece = () => {
  const piece = useSelector(selectCurrentPiece);

  return <Piece piece={ piece } size={ PIECE_CELL_SIZE } />
};

const NextPieces = () => {
  const nextPieces = useSelector(selectNextPieces);

  return (
    <div id="next-container">
      Next:
      <div id="next-pieces">
        { nextPieces.map(piece => (
          <div key={ piece.id } className="piece-container">
            <Piece piece={ piece } size={ PIECE_CELL_THUMB_SIZE } />
          </div>
        )) }
      </div>
    </div>
  )

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

      { gameStatus === GameStatuses.started &&
        <NextPieces /> }
    </div>
  );
}

export default Game;
