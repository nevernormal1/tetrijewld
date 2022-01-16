//    **
//    **
const Piece6 = ({ piece }) => ({
  offsets: () => {
    if (piece.rotation === 0) {
      return [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ];
    } else if (piece.rotation === 90) {
      return [
        [1, 0],
        [1, 1],
        [0, 0],
        [0, 1],
      ];
    } else if (piece.rotation === 180) {
      return [
        [1, 1],
        [0, 1],
        [1, 0],
        [0, 0],
      ];
    } else if (piece.rotation === 270) {
      return [
        [0, 1],
        [0, 0],
        [1, 1],
        [1, 0],
      ];
    }
  },

  width: () => {
    return 2;
  },

  height: () => {
    return 2;
  },
});

export default Piece6;
