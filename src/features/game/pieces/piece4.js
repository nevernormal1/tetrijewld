import { NUM_COLUMNS } from '../constants';

//    **
//     *
//     *
const Piece4 = ({ piece }) => ({
  render: () => {
    if (piece.rotation === 270) {
      return [
        [0, 1],
        [0, 0],
        [1, 0],
        [2, 0],
      ];
    }

    if (piece.rotation === 180) {
      return [
        [1, 2],
        [0, 2],
        [0, 1],
        [0, 0],
      ];
    }

    if (piece.rotation === 90) {
      return [
        [2, 0],
        [2, 1],
        [1, 1],
        [0, 1],
      ];
    }

    return [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ];
  },

  width: () => {
    return piece.rotation === 270 || piece.rotation === 90 ? 3 : 2;
  },

  height: () => {
    return piece.rotation === 270 || piece.rotation === 90 ? 2 : 3;
  },

  canRotateRight: () => {
    if (piece.rotation === 270 || piece.rotation === 90) {
      return true;
    }
    return piece.x < NUM_COLUMNS - 2;
  }
});

export default Piece4;
