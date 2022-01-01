//   **
//  **
const Piece1 = ({ piece }) => {
  if (piece.rotation === 270 || piece.rotation === 90) {
    return [
      [0, 1],
      [0, 0],
      [1, 2],
      [1, 1],
    ];
  }

  return [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ];
};

export default Piece1;
