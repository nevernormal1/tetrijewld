import { NUM_COLUMNS } from '../constants';

//   *
//  ***
const Piece0 = ({ piece }) => ({
  render: () => {
    if (piece.rotation === 270) {
      return [
        [0, 1],
        [1, 2],
        [1, 1],
        [1, 0],
      ];
    }

    if (piece.rotation === 180) {
      return [
        [1, 1],
        [2, 0],
        [1, 0],
        [0, 0],
      ];
    }

    if (piece.rotation === 90) {
      return [
        [1, 1],
        [0, 0],
        [0, 1],
        [0, 2],
      ];
    }

    return [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ];
  },

  width: () => {
    return piece.rotation === 270 || piece.rotation === 90 ?  2 : 3;
  },

  canRotateRight: () => {
    if (piece.rotation === 0 || piece.rotation === 180) {
      return true;
    }
    return piece.x < NUM_COLUMNS - 2;
  }
});

export default Piece0;
