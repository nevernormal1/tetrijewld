import { findMatchedCells } from '../features/game/cellMatcher.js'

//    Y
// YYYGY
it('matches 3 in a row across', () => {
  const affixedCells = [
    {x: 2, y: 10, color: 'yellow'},
    {x: 3, y: 10, color: 'yellow'},
    {x: 4, y: 10, color: 'yellow'},
    {x: 5, y: 10, color: 'green'},
    {x: 6, y: 10, color: 'yellow'},
    {x: 5, y: 9, color: 'yellow'},
  ]

  const matches = findMatchedCells(affixedCells);

  expect(matches.length).toEqual(3);

  expect(matches).toContain(affixedCells[0]);
  expect(matches).toContain(affixedCells[1]);
  expect(matches).toContain(affixedCells[2]);
});

//  Y
//  Y
// GYG
//  Y
it('matches 4 in a row vertically', () => {
  const affixedCells = [
    {x: 5, y: 8, color: 'yellow'},
    {x: 5, y: 9, color: 'yellow'},
    {x: 5, y: 10, color: 'yellow'},
    {x: 5, y: 11, color: 'yellow'},
    {x: 4, y: 10, color: 'green'},
    {x: 6, y: 10, color: 'green'},
  ]

  const matches = findMatchedCells(affixedCells);

  expect(matches.length).toEqual(4);

  expect(matches).toContain(affixedCells[0]);
  expect(matches).toContain(affixedCells[1]);
  expect(matches).toContain(affixedCells[2]);
  expect(matches).toContain(affixedCells[3]);
});

//  Y
//  Y
// GYY
// G
it('matches 3 in a row vertically but does not match 2 in a row to the left', () => {
  const affixedCells = [
    {x: 4, y: 10, color: 'green'},
    {x: 4, y: 11, color: 'green'},
    {x: 5, y: 8, color: 'yellow'},
    {x: 5, y: 9, color: 'yellow'},
    {x: 5, y: 10, color: 'yellow'},
    {x: 6, y: 10, color: 'yellow'},
  ]

  const matches = findMatchedCells(affixedCells);

  expect(matches.length).toEqual(3);

  expect(matches).toContain(affixedCells[2]);
  expect(matches).toContain(affixedCells[3]);
  expect(matches).toContain(affixedCells[4]);
});

// BB BYY  Y Y GG G
it ('does not match across gaps horizontally', () => {
  const affixedCells = [
    {x: 0, y: 0, color: 'blue'},
    {x: 1, y: 0, color: 'blue'},
    {x: 3, y: 0, color: 'blue'},
    {x: 4, y: 0, color: 'yellow'},
    {x: 5, y: 0, color: 'yellow'},
    {x: 8, y: 0, color: 'yellow'},
    {x: 10, y: 0, color: 'yellow'},
    {x: 12, y: 0, color: 'green'},
    {x: 13, y: 0, color: 'green'},
    {x: 15, y: 0, color: 'green'},
  ]

  const matches = findMatchedCells(affixedCells);

  expect(matches.length).toEqual(0);
});

//  BBB  GGGG
//  B     G
//  B     G
//  Y     Y
//  B   YYYY
//  B     Y
//  B
it('matches multiple runs in a row and column', () => {
  const affixedCells = [
    {x: 0, y: 0, color: 'blue'},
    {x: 0, y: 1, color: 'blue'},
    {x: 0, y: 2, color: 'blue'},
    {x: 0, y: 3, color: 'yellow'},
    {x: 0, y: 4, color: 'blue'},
    {x: 0, y: 5, color: 'blue'},
    {x: 0, y: 6, color: 'blue'},
    {x: 1, y: 0, color: 'blue'},
    {x: 2, y: 0, color: 'blue'},
    {x: 4, y: 4, color: 'yellow'},
    {x: 5, y: 0, color: 'green'},
    {x: 5, y: 4, color: 'yellow'},
    {x: 6, y: 0, color: 'green'},
    {x: 6, y: 1, color: 'green'},
    {x: 6, y: 2, color: 'green'},
    {x: 6, y: 3, color: 'yellow'},
    {x: 6, y: 4, color: 'yellow'},
    {x: 6, y: 5, color: 'yellow'},
    {x: 7, y: 0, color: 'green'},
    {x: 7, y: 4, color: 'yellow'},
    {x: 8, y: 0, color: 'green'},
  ]

  const matches = findMatchedCells(affixedCells);

  expect(matches.length).toEqual(20);

  expect(matches).toContain(affixedCells[0]);
  expect(matches).toContain(affixedCells[1]);
  expect(matches).toContain(affixedCells[2]);
  expect(matches).toContain(affixedCells[4]);
  expect(matches).toContain(affixedCells[5]);
  expect(matches).toContain(affixedCells[6]);
  expect(matches).toContain(affixedCells[7]);
  expect(matches).toContain(affixedCells[8]);
  expect(matches).toContain(affixedCells[9]);
  expect(matches).toContain(affixedCells[10]);
  expect(matches).toContain(affixedCells[11]);
  expect(matches).toContain(affixedCells[12]);
  expect(matches).toContain(affixedCells[13]);
  expect(matches).toContain(affixedCells[15]);
  expect(matches).toContain(affixedCells[16]);
  expect(matches).toContain(affixedCells[17]);
  expect(matches).toContain(affixedCells[18]);
  expect(matches).toContain(affixedCells[19]);
});
