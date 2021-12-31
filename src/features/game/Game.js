import React, { useState } from 'react';

import { GameStatuses } from './gameSlice';
import { selectGameStatus } from './gameSelectors';
import { useSelector } from 'react-redux';


const GameStopped = () => {
  return (
    <div>
      Press space bar to start
    </div>
  );
}

const Game = () => {
  const gameStatus = useSelector(selectGameStatus);

  return (
    <div id="game">
      { gameStatus === GameStatuses.stopped &&
        <GameStopped /> }
    </div>
  );
}

export default Game;
