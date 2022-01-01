//    **
//    *
//    *
const Piece5 = ({ piece }) => ({
  render: () => {
    if (piece.rotation === 270) {
      return [
        [0, 1],
        [0, 0],
        [1, 1],
        [2, 1],
      ];
    }

    if (piece.rotation === 180) {
      return [
        [0, 2],
        [1, 2],
        [1, 1],
        [1, 0],
      ];
    }

    if (piece.rotation === 90) {
      return [
        [2, 1],
        [2, 0],
        [1, 0],
        [0, 0],
      ];
    }

    return [
      [0, 0],
      [1, 0],
      [0, 1],
      [0, 2],
    ];
  },
  width: () => {
    return piece.rotation === 270 || piece.rotation === 90 ? 3 : 2;
  }
});

export default Piece5;
