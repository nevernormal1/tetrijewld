import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameReducer from '../features/game/gameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
  },
});
