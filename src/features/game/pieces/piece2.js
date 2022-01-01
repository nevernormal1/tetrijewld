import { NUM_COLUMNS } from '../constants';

//   **
//    **
const Piece2 = ({ piece }) => ({
  render: () => {
    if (piece.rotation === 270 || piece.rotation === 90) {
      return [
        [0, 2],
        [0, 1],
        [1, 1],
        [1, 0],
      ];
    }

    return [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ];
  },
  width: () => {
    return piece.rotation === 270 || piece.rotation === 90 ? 2 : 3;
  },
  canRotateRight: () => {
    if (piece.rotation === 0 || piece.rotation === 180) {
      return true;
    }
    return piece.x < NUM_COLUMNS - 2;
  }
});

export default Piece2;
