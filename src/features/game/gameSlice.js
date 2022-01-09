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

const roomForPiece = (piece) => {
  const pieceObject = PieceFactory(piece);

  const spaceOnRight = piece.x + pieceObject.width() <= NUM_COLUMNS
  const spaceOnBottom = piece.y + pieceObject.height() <= NUM_ROWS

  return spaceOnRight && spaceOnBottom;
};

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
      const currentPiece = state.currentPiece;

      const rotatedPiece = {
        ...currentPiece,
        rotation: (currentPiece.rotation + 270) % 360
      };

      if (roomForPiece(rotatedPiece)) {
        state.currentPiece.rotation = rotatedPiece.rotation;
      }
    },

    rotateRight: (state) => {
      const currentPiece = state.currentPiece;

      const rotatedPiece = {
        ...currentPiece,
        rotation: (currentPiece.rotation + 90) % 360
      };

      if (roomForPiece(rotatedPiece)) {
        state.currentPiece.rotation = rotatedPiece.rotation;
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
      const currentPiece = state.currentPiece;

      const advancedPiece = {
        ...currentPiece,
        y: currentPiece.y + 1
      };

      const advancedPieceObject = PieceFactory(advancedPiece);

      if (advancedPiece.y + advancedPieceObject.height() <= NUM_ROWS) {
        state.currentPiece.y = advancedPiece.y;
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
