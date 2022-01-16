//   *
//   *
//   *
//   *
const Piece3 = ({ piece }) => ({
  offsets: () => {
    if (piece.rotation === 0) {
      return [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ];
    } else if (piece.rotation === 90) {
      return [
        [3, 0],
        [2, 0],
        [1, 0],
        [0, 0],
      ];
    } else if (piece.rotation === 180) {
      return [
        [0, 3],
        [0, 2],
        [0, 1],
        [0, 0],
      ];
    } else if (piece.rotation === 270) {
      return [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ];
    }
  },

  width: () => {
    return piece.rotation === 270 || piece.rotation === 90 ? 4 : 1;
  },

  height: () => {
    return piece.rotation === 270 || piece.rotation === 90 ? 1 : 4;
  },
});

export default Piece3;
