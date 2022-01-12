import { createSlice } from '@reduxjs/toolkit';
import { selectGameStatus } from './gameSelectors';
import { PieceFactory } from './pieces/pieces';
import { GameStatuses, NUM_ROWS, NUM_COLUMNS } from './constants';

const initialState = {
  timerID: null,
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

const pieceObjectsCollide = (pieceObj1, pieceObj2) => (
  pieceObj1.offsets().some(offset1 => (
    pieceObj2.offsets().some(offset2 => (
      pieceObj1.x + offset1[0] === pieceObj2.x + offset2[0] &&
        pieceObj1.y + offset1[1] === pieceObj2.y + offset2[1]
    ))
  ))
);

const roomForPiece = (piece, droppedPieces) => {
  const pieceObject = PieceFactory(piece);

  // Inside left boundary?
  if (piece.x < 0) {
    return false;
  }

  // Inside right boundary?
  if (piece.x + pieceObject.width() > NUM_COLUMNS) {
    return false;
  }

  // Inside bottom boundary?
  if (piece.y + pieceObject.height() > NUM_ROWS) {
    return false;
  }

  // Collides with dropped pieces?
  return !droppedPieces.some(droppedPiece => pieceObjectsCollide(
    PieceFactory(droppedPiece), pieceObject)
  );
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action) => {
      if (state.status === GameStatuses.stopped) {
        state.timerID = action.payload;
        state.status = GameStatuses.started;
        state.droppedPieces = [];
        state.currentPiece = randomPiece();
        state.lastAdvanceTime = Date.now();
      }
    },

    rotateLeft: (state) => {
      const currentPiece = state.currentPiece;

      const rotatedPiece = {
        ...currentPiece,
        rotation: (currentPiece.rotation + 270) % 360,
      };

      if (roomForPiece(rotatedPiece, state.droppedPieces)) {
        state.currentPiece.rotation = rotatedPiece.rotation;
      }
    },

    rotateRight: (state) => {
      const currentPiece = state.currentPiece;

      const rotatedPiece = {
        ...currentPiece,
        rotation: (currentPiece.rotation + 90) % 360,
      };

      if (roomForPiece(rotatedPiece, state.droppedPieces)) {
        state.currentPiece.rotation = rotatedPiece.rotation;
      }
    },

    moveLeft: (state) => {
      const currentPiece = state.currentPiece;

      const movedPiece = {
        ...currentPiece,
        x: state.currentPiece.x - 1,
      };

      if (roomForPiece(movedPiece, state.droppedPieces)) {
        state.currentPiece.x = movedPiece.x;
      }
    },

    moveRight: (state) => {
      const currentPiece = state.currentPiece;

      const movedPiece = {
        ...currentPiece,
        x: state.currentPiece.x + 1,
      };

      if (roomForPiece(movedPiece, state.droppedPieces)) {
        state.currentPiece.x = movedPiece.x;
      }
    },

    dropPiece: (state) => {
      const currentPiece = state.currentPiece;

      let advancedPiece = {
        ...currentPiece,
        y: currentPiece.y + 1
      };

      while (roomForPiece(advancedPiece, state.droppedPieces)) {
        advancedPiece.y = advancedPiece.y + 1;
      }

      state.currentPiece.y = advancedPiece.y - 1;
    },

    advancePiece: (state) => {
      const currentPiece = state.currentPiece;

      const advancedPiece = {
        ...currentPiece,
        y: currentPiece.y + 1
      };

      if (roomForPiece(advancedPiece, state.droppedPieces)) {
        state.currentPiece.y = advancedPiece.y;
      } else {
        if (currentPiece.y === 0) {
          // End game
          state.status = GameStatuses.over;
          window.clearInterval(state.timerID);
          state.timerID = null;
        } else {
          state.droppedPieces.push(state.currentPiece);
          state.currentPiece = randomPiece();
        }
      }

      state.lastAdvanceTime = Date.now();
    },
  },
});

export const {
  startGame,
  rotateLeft,
  rotateRight,
  moveLeft,
  moveRight,
  advancePiece,
  dropPiece,
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
    } else if (keyCode === "Space") {
      dispatch(dropPiece());
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
