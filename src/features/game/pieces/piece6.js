//    **
//    **
const Piece6 = ({ piece }) => ({
  offsets: () => {
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

  height: () => {
    return 2;
  },
});

export default Piece6;
