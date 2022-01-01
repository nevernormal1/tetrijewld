//    **
//    **
const Piece6 = ({ piece }) => ({
  render: () => {
    return [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ];
  },
  width: () => {
    return 2;
  },
  canRotateRight: () => {
    return true;
  }
});

export default Piece6;
