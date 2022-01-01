//   *
//   *
//   *
//   *
const Piece3 = ({ piece }) => {
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
};

export default Piece3;
