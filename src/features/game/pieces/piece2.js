//   **
//    **
const Piece2 = ({ piece }) => ({
  offsets: () => {
    if (piece.rotation === 0) {
      return [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ];
    } else if (piece.rotation === 90) {
      return [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ];
    } else if (piece.rotation === 180) {
      return [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ];
    } else if (piece.rotation === 270) {
      return [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ];
    }
  },
  width: () => {
    return piece.rotation === 270 || piece.rotation === 90 ? 2 : 3;
  },

  height: () => {
    return piece.rotation === 270 || piece.rotation === 90 ?  3 : 2;
  },
});

export default Piece2;
