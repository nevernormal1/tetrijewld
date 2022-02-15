import { createSelector } from '@reduxjs/toolkit';

const gameState = (state) => state.game;

const selectGameStatus = createSelector(
  gameState,
  (state) => state.status
);

const selectCurrentPiece = createSelector(
  gameState,
  (state) => state.currentPiece
);

const selectNextPieces = createSelector(
  gameState,
  (state) => state.nextPieces
);

const selectAffixedCells = createSelector(
  gameState,
  (state) => state.affixedCells
);

export {
  selectGameStatus,
  selectCurrentPiece,
  selectAffixedCells,
  selectNextPieces,
};
