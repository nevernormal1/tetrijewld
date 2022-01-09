import { createSlice } from '@reduxjs/toolkit';
import { selectGameStatus } from './gameSelectors';
import { PieceFactory } from './pieces/pieces';
import { GameStatuses, NUM_ROWS, NUM_COLUMNS } from './constants';

const initialState = {
  currentPiece: null,
  lastAdvanceTime: null,
  dropSpeed: 1000,
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
      state.lastAdvanceTime = Date.now();
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

    advancePiece: (state) => {
      if (state.currentPiece.y < NUM_ROWS) {
        state.currentPiece.y += 1;
        state.lastAdvanceTime = Date.now();
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
  advancePiece,
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

export const handleGameTick = () => (dispatch, getState) => {
  const state = getState()
  const currentStatus = selectGameStatus(state);
  const { lastAdvanceTime, dropSpeed } = state.game;

  if (currentStatus === GameStatuses.started) {
    if (lastAdvanceTime !== null && Date.now() - lastAdvanceTime > dropSpeed) {
      dispatch(advancePiece());
    }
  }
};

export default gameSlice.reducer;
