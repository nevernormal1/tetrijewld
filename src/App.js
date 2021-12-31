import React from 'react';

import Game from './features/game/Game';

import './App.css';

function App() {
  return (
    <div className="container">
      <div id="heading">
        <h1 className="game-title">TetriJewld</h1>
      </div>
      <Game />
    </div>
  );
}

export default App;
