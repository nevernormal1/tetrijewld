import { findMatchedCells } from '../features/game/cellMatcher.js'

it('matches 3 in a row across to the left', () => {
  const pieceCells = [
    {x: 4, y: 10, color: 'yellow'},
    {x: 5, y: 10, color: 'green'},
    {x: 6, y: 10, color: 'yellow'},
    {x: 5, y: 9, color: 'yellow'},
  ];

  const affixedCells = [
    {x: 3, y: 10, color: 'yellow'},
    {x: 2, y: 10, color: 'yellow'},
    ...pieceCells,
  ]

  const matches = findMatchedCells(pieceCells, affixedCells);

  expect(matches.length).toEqual(3);

  expect(matches).toContain(affixedCells[0]);
  expect(matches).toContain(affixedCells[1]);
  expect(matches).toContain(pieceCells[0]);
});

it('matches 3 in a row across to the right', () => {
  const pieceCells = [
    {x: 4, y: 10, color: 'yellow'},
    {x: 5, y: 10, color: 'green'},
    {x: 6, y: 10, color: 'yellow'},
    {x: 5, y: 9, color: 'yellow'},
  ];

  const affixedCells = [
    {x: 7, y: 10, color: 'yellow'},
    {x: 8, y: 10, color: 'yellow'},
    ...pieceCells,
  ]

  const matches = findMatchedCells(pieceCells, affixedCells);

  expect(matches.length).toEqual(3);

  expect(matches).toContain(affixedCells[0]);
  expect(matches).toContain(affixedCells[1]);
  expect(matches).toContain(pieceCells[2]);
});

it('matches 4 in a row up in the middle', () => {
  const pieceCells = [
    {x: 4, y: 10, color: 'green'},
    {x: 5, y: 10, color: 'yellow'},
    {x: 6, y: 10, color: 'green'},
    {x: 5, y: 9, color: 'yellow'},
  ];

  const affixedCells = [
    {x: 5, y: 8, color: 'yellow'},
    {x: 5, y: 11, color: 'yellow'},
    ...pieceCells,
  ]

  const matches = findMatchedCells(pieceCells, affixedCells);

  expect(matches.length).toEqual(4);

  expect(matches).toContain(affixedCells[0]);
  expect(matches).toContain(affixedCells[1]);
  expect(matches).toContain(pieceCells[1]);
  expect(matches).toContain(pieceCells[3]);
});

it('matches 3 in a row up but does not match 2 in a row to the right', () => {
  const pieceCells = [
    {x: 4, y: 10, color: 'green'},
    {x: 5, y: 10, color: 'yellow'},
    {x: 4, y: 11, color: 'green'},
    {x: 5, y: 9, color: 'yellow'},
  ];

  const affixedCells = [
    {x: 6, y: 10, color: 'yellow'},
    {x: 5, y: 8, color: 'yellow'},
    ...pieceCells,
  ]

  const matches = findMatchedCells(pieceCells, affixedCells);

  expect(matches.length).toEqual(3);

  expect(matches).toContain(affixedCells[1]);
  expect(matches).toContain(pieceCells[1]);
  expect(matches).toContain(pieceCells[3]);
});
