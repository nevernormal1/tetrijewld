//   *
//  ***
const Piece0 = ({ piece }) => {
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
};

export default Piece0;
