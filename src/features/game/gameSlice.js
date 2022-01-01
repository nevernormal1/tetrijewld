import { createSlice } from '@reduxjs/toolkit';
import { selectGameStatus } from './gameSelectors';

export const GameStatuses = {
  stopped: 'stopped',
  started: 'started',
}

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
      state.currentPiece.rotation += 90;
      if (state.currentPiece.rotation >= 360) {
        state.currentPiece.rotation -= 360;
      }
    },
  },
});

export const {
  startGame,
  introducePiece,
  rotateLeft,
  rotateRight
} = gameSlice.actions;

export const handleKeydown = (keyCode) => (dispatch, getState) => {
  const currentStatus = selectGameStatus(getState());

  if (currentStatus === GameStatuses.stopped) {
    dispatch(startGame());
  } else {
    if (keyCode === "ArrowLeft") {
      dispatch(rotateLeft());
    } else if (keyCode === "ArrowRight") {
      dispatch(rotateRight());
    }
  }
};

export default gameSlice.reducer;
