import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { selectGameStatus } from './gameSelectors';
import { cellsForPiece, randomPiece, roomForPiece } from './pieces/pieces';
import { GameStatuses, ACCELERATION_FACTOR, NUM_ROWS, NUM_COLUMNS } from './constants';

const initialState = {
  timerID: null,
  currentPiece: null,
  lastAdvanceTime: null,
  dropSpeed: 1000,
  dropSpeedAccelerated: false,
  status: GameStatuses.stopped,
  removingCells: false,
  affixedCells: [],
};

const findMatchedCells = (pieceCells, affixedCells) => {
  const ret = new Set();

  const gridCells = new Array(NUM_COLUMNS);

  affixedCells.forEach((affixedCell) => {
    gridCells[affixedCell.x] ||= new Array(NUM_ROWS);
    gridCells[affixedCell.x][affixedCell.y] = affixedCell;
  });

  pieceCells.forEach(pieceCell => {
    let gridCell = gridCells[pieceCell.x][pieceCell.y];

    let cellsInRow = [gridCell];
    let cellsInColumn = [gridCell];

    const gridCellMatch = (gridCell) => (
      gridCell && gridCell.color === pieceCell.color
    );

    for (let i=pieceCell.x - 1; i>= 0; i--) {
      const gridColumn = gridCells[i];
      gridCell = gridColumn && gridColumn[pieceCell.y];
      if (gridCellMatch(gridCell)) {
        cellsInRow.push(gridCell);
      } else {
        break;
      }
    }

    for (let i=pieceCell.x + 1; i<NUM_COLUMNS; i++) {
      const gridColumn = gridCells[i];
      gridCell = gridColumn && gridColumn[pieceCell.y];
      if (gridCellMatch(gridCell)) {
        cellsInRow.push(gridCell);
      } else {
        break;
      }
    }

    for (let i=pieceCell.y - 1; i>= 0; i--) {
      const gridColumn = gridCells[pieceCell.x];
      gridCell = gridColumn && gridColumn[i];
      if (gridCellMatch(gridCell)) {
        cellsInColumn.push(gridCell);
      } else  {
        break;
      }
    }

    for (let i=pieceCell.y + 1; i<NUM_ROWS; i++) {
      const gridColumn = gridCells[pieceCell.x];
      gridCell = gridColumn && gridColumn[i];
      if (gridCellMatch(gridCell)) {
        cellsInColumn.push(gridCell);
      } else {
        break;
      }
    }

    if (cellsInRow.length >= 3) {
      cellsInRow.forEach(cell => ret.add(cell));
    }

    if (cellsInColumn.length >= 3) {
      cellsInColumn.forEach(cell => ret.add(cell));
    }
  });

  return [...ret];
}

const affixPiece = (piece, state) => {
  if (piece.y === 0) {
    // End game
    state.status = GameStatuses.over;
    state.timerID = null;
  } else {
    const pieceCells = cellsForPiece(piece);

    // Drop piece & introduce new piece
    state.affixedCells = [
      ...state.affixedCells,
      ...pieceCells,
    ];

    const matchedCells = findMatchedCells(pieceCells, state.affixedCells);

    matchedCells.forEach(cell => cell.matched = true);

    if (matchedCells.length > 0) {
      state.currentPiece = null;
      state.matchedCells = matchedCells;
      state.removingCells = true;
    } else {
      state.currentPiece = randomPiece();
    }
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

      if (currentPiece !== null) {
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
      }
    },

    clearRemovingCells: (state) => {
      state.removingCells = false;
    },

    removeCells: (state) => {
      state.affixedCells = state.affixedCells.filter(ac => (
        !state.matchedCells.some(mc => mc.x === ac.x && mc.y === ac.y)
      ));

      // Put matched cells with lesser y values before those with higher
      // y values so that when we move cells downward, they can't pass
      // a matched cell before it contributes a unit to its fall.
      state.matchedCells.sort((a, b) => a.y - b.y);

      state.matchedCells.forEach(mc => {
        state.affixedCells.forEach(ac => {
          if (ac.x === mc.x && ac.y < mc.y) {
            ac.y += 1;
          }
        });
      });

      state.matchedCells = [];
      state.currentPiece = randomPiece();
      state.lastAdvanceTime = Date.now();
    },
  },
});

const {
  accelerateDropSpeed,
  advancePiece,
  clearRemovingCells,
  decelerateDropSpeed,
  dropPiece,
  moveLeft,
  moveRight,
  removeCells,
  rotateLeft,
  rotateRight,
  startGame,
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


const removeAndDropCells = () => (dispatch, getState) => {
  dispatch(clearRemovingCells());
  setTimeout(() => dispatch(removeCells()), 1000);
};

export const handleGameTick = () => (dispatch, getState) => {
  const state = getState()
  const currentStatus = selectGameStatus(state);
  const { lastAdvanceTime, dropSpeed, dropSpeedAccelerated, removingCells } = state.game;

  if (removingCells) {
    dispatch(removeAndDropCells());
  } else if (currentStatus === GameStatuses.started && lastAdvanceTime !== null) {
    const compareTime = dropSpeedAccelerated ?
      dropSpeed - dropSpeed * ACCELERATION_FACTOR :
      dropSpeed;

    if (Date.now() - lastAdvanceTime > compareTime) {
      dispatch(advancePiece());
    }
  }
};

export default gameSlice.reducer;
