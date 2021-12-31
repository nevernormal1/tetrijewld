import React from 'react';

import { GameStatuses } from './gameSlice';
import { selectGameStatus, selectCurrentPiece } from './gameSelectors';
import { useSelector } from 'react-redux';

const GameStopped = () => {
  return (
    <div>
      Press space bar to start
    </div>
  );
}

//   *
//  ***
const Piece0 = ({ piece }) => {
  return [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ];
};

//   **
//  **
const Piece1 = ({ piece }) => {
  return [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ];
};

//   **
//    **
const Piece2 = ({ piece }) => {
  return [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ];
};

//   *
//   *
//   *
//   *
const Piece3 = ({ piece }) => {
  return [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ];
};

//    **
//     *
//     *
const Piece4 = ({ piece }) => {
  return [
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
  ];
}

//    **
//    *
//    *
const Piece5 = ({ piece }) => {
  return [
    [0, 0],
    [1, 0],
    [0, 1],
    [0, 2],
  ];
}

//    **
//    **
const Piece6 = ({ piece }) => {
  return [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ];
}


const PieceRenderers = [
  Piece0, Piece1, Piece2, Piece3, Piece4, Piece5, Piece6
]

const Piece = ({ piece }) => {
  const Renderer = PieceRenderers[piece.type];

  const offsets = Renderer({ piece });

  const containerClasses = `piece-container x${ piece.x } y${ piece.y }`

  return (
    <div key={ piece.id } className={ containerClasses }>
      {
        offsets.map((offset, index) => {
          const classNames = `piece-cell x${ offset[0] } y${ offset[1] }`

          return (
            <div
              key={`${ piece.id }:${ index }`}
              className={ classNames }
            />
          );
        })
      }
    </div>
  )
}

const CurrentPiece = () => {
  const piece = useSelector(selectCurrentPiece);

  return piece === null ? null : <Piece piece={ piece } />
}

const Game = () => {
  const gameStatus = useSelector(selectGameStatus);

  return (
    <div id="game">
      { gameStatus === GameStatuses.stopped &&
        <GameStopped /> }
      <CurrentPiece />
    </div>
  );
}

export default Game;
