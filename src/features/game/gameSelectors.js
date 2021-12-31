import { createSelector } from '@reduxjs/toolkit';

const gameState = (state) => state.game;

const selectGameStatus = createSelector(
  gameState,
  (state) => state.status
);

const selectDroppedPieces = createSelector(
  gameState,
  (state) => state.droppedPieces
);

export {
  selectGameStatus,
  selectDroppedPieces
};
