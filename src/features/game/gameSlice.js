import { createSlice } from '@reduxjs/toolkit';
import { selectGameStatus } from './gameSelectors';
import { pieceCells, randomPiece, roomForPiece } from './pieces/pieces';
import { GameStatuses, ACCELERATION_FACTOR } from './constants';

const initialState = {
  timerID: null,
  currentPiece: null,
  lastAdvanceTime: null,
  dropSpeed: 1000,
  dropSpeedAccelerated: false,
  status: GameStatuses.stopped,
  affixedCells: [],
};

const affixPiece = (piece, state) => {
  if (piece.y === 0) {
    // End game
    state.status = GameStatuses.over;
    state.timerID = null;
  } else {
    // Drop piece & introduce new piece
    state.affixedCells = [
      ...state.affixedCells,
      ...pieceCells(piece),
    ];

    state.currentPiece = randomPiece();
  }
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.timerID = action.payload;
      state.status = GameStatuses.started;
      state.affixedCells = [];
      state.currentPiece = randomPiece();
      state.lastAdvanceTime = Date.now();
    },

    accelerateDropSpeed: (state) => {
      state.dropSpeedAccelerated = true;
    },

    decelerateDropSpeed: (state) => {
      state.dropSpeedAccelerated = false;
    },

    rotateLeft: (state) => {
      const currentPiece = state.currentPiece;

      const rotatedPiece = {
        ...currentPiece,
        rotation: (currentPiece.rotation + 270) % 360,
      };

      if (roomForPiece(rotatedPiece, state.affixedCells)) {
        state.currentPiece.rotation = rotatedPiece.rotation;
      }
    },

    rotateRight: (state) => {
      const currentPiece = state.currentPiece;

      const rotatedPiece = {
        ...currentPiece,
        rotation: (currentPiece.rotation + 90) % 360,
      };

      if (roomForPiece(rotatedPiece, state.affixedCells)) {
        state.currentPiece.rotation = rotatedPiece.rotation;
      }
    },

    moveLeft: (state) => {
      const currentPiece = state.currentPiece;

      const movedPiece = {
        ...currentPiece,
        x: state.currentPiece.x - 1,
      };

      if (roomForPiece(movedPiece, state.affixedCells)) {
        state.currentPiece.x = movedPiece.x;
      }
    },

    moveRight: (state) => {
      const currentPiece = state.currentPiece;

      const movedPiece = {
        ...currentPiece,
        x: state.currentPiece.x + 1,
      };

      if (roomForPiece(movedPiece, state.affixedCells)) {
        state.currentPiece.x = movedPiece.x;
      }
    },

    dropPiece: (state) => {
      const currentPiece = state.currentPiece;

      let advancedPiece = {
        ...currentPiece,
        y: currentPiece.y + 1
      };

      while (roomForPiece(advancedPiece, state.affixedCells)) {
        advancedPiece.y +=1;
      }

      advancedPiece.y -= 1;

      affixPiece(advancedPiece, state);
    },

    advancePiece: (state) => {
      const currentPiece = state.currentPiece;

      const advancedPiece = {
        ...currentPiece,
        y: currentPiece.y + 1
      };

      if (roomForPiece(advancedPiece, state.affixedCells)) {
        state.currentPiece.y = advancedPiece.y;
      } else {
        affixPiece(currentPiece, state);
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
  accelerateDropSpeed,
  decelerateDropSpeed,
  dropPiece,
} = gameSlice.actions;

export const handleKeydown = (keyCode) => (dispatch, getState) => {
  const currentStatus = selectGameStatus(getState());

  if (currentStatus === GameStatuses.stopped || currentStatus === GameStatuses.over) {
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
    } else if (keyCode === "ArrowDown") {
      dispatch(accelerateDropSpeed());
    } else if (keyCode === "Space") {
      dispatch(dropPiece());
    }
  }
};

export const handleKeyup = (keyCode) => (dispatch, getState) => {
  if (keyCode === "ArrowDown") {
    dispatch(decelerateDropSpeed());
  }
};

export const handleGameTick = () => (dispatch, getState) => {
  const state = getState()
  const currentStatus = selectGameStatus(state);
  const { lastAdvanceTime, dropSpeed, dropSpeedAccelerated } = state.game;

  if (currentStatus === GameStatuses.started && lastAdvanceTime !== null) {
    const compareTime = dropSpeedAccelerated ?
      dropSpeed - dropSpeed * ACCELERATION_FACTOR :
      dropSpeed;

    if (Date.now() - lastAdvanceTime > compareTime) {
      dispatch(advancePiece());
    }
  }
};

export default gameSlice.reducer;
