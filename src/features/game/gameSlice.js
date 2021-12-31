import { createSlice } from '@reduxjs/toolkit';

export const GameStatuses = {
  stopped: 'stopped',
  started: 'started',
}

const initialState = {
  status: GameStatuses.stopped,
  droppedPieces: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = GameStatuses.started
    },

    introducePiece: (state) => {
    },

    rotateLeft: (state, action) => {
    },

    rotateRight: (state, action) => {
    },
  },
});

export const { introducePiece, rotateLeft, rotateRight } = gameSlice.actions;

export default gameSlice.reducer;
