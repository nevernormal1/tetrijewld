import { NUM_COLUMNS } from '../constants';

//   *
//   *
//   *
//   *
const Piece3 = ({ piece }) => ({
  render: () => {
    if (piece.rotation === 270 || piece.rotation === 90) {
      return [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ];
    }

    return [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
  },

  width: () => {
    return piece.rotation === 270 || piece.rotation === 90 ? 4 : 1;
  },

  height: () => {
    return piece.rotation === 270 || piece.rotation === 90 ? 1 : 4;
  },

  canRotateRight: () => {
    if (piece.rotation === 270 || piece.rotation === 90) {
      return true;
    }

    return piece.x < NUM_COLUMNS - 3;
  }
});

export default Piece3;
