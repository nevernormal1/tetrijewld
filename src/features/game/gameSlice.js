import { createSlice } from '@reduxjs/toolkit';
import { selectGameStatus } from './gameSelectors';
import { PieceFactory } from './pieces/pieces';
import { GameStatuses, NUM_COLUMNS } from './constants';

const initialState = {
  currentPiece: null,
  status: GameStatuses.stopped,
  droppedPieces: [],
};

const randomPiece = () => ({
  id: Date.now(),
  type: Math.floor(Math.random() * 7),
  x: 4,
  y: 0,
  rotation: 0,
})

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = GameStatuses.started;
      state.droppedPieces = [];
      state.currentPiece = randomPiece();
    },

    introducePiece: (state) => {
    },

    rotateLeft: (state) => {
      state.currentPiece.rotation -= 90;
      if (state.currentPiece.rotation < 0) {
        state.currentPiece.rotation += 360;
      }
    },

    rotateRight: (state) => {
      const piece = PieceFactory(state.currentPiece)

      if (piece.canRotateRight()) {
        state.currentPiece.rotation += 90;
        if (state.currentPiece.rotation >= 360) {
          state.currentPiece.rotation -= 360;
        }
      }
    },

    moveLeft: (state) => {
      if (state.currentPiece.x > 0) {
        state.currentPiece.x -= 1;
      }
    },

    moveRight: (state) => {
      const piece = PieceFactory(state.currentPiece)

      if (state.currentPiece.x < NUM_COLUMNS - piece.width()) {
        state.currentPiece.x += 1;
      }
    },
  },
});

export const {
  startGame,
  introducePiece,
  rotateLeft,
  rotateRight,
  moveLeft,
  moveRight,
} = gameSlice.actions;

export const handleKeydown = (keyCode) => (dispatch, getState) => {
  const currentStatus = selectGameStatus(getState());

  if (currentStatus === GameStatuses.stopped) {
    dispatch(startGame());
  } else {
    if (keyCode === "KeyZ") {
      dispatch(rotateLeft());
    } else if (keyCode === "ArrowUp") {
      dispatch(rotateRight());
    } else if (keyCode === "ArrowLeft") {
      dispatch(moveLeft());
    } else if (keyCode === "ArrowRight") {
      dispatch(moveRight());
    }
  }
};

export default gameSlice.reducer;
