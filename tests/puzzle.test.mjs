import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateNewBoard, createScrambledBoard } from '../src/greens-and-reds/board.ts';
import { getSolution } from '../src/greens-and-reds/greenredsolver.ts';

test('clicks toggle only the selected square and its orthogonal neighbors', () => {
  for (let pos = 0; pos < 9; pos++) {
    const original = Array(9).fill(1);
    const expected = original.map((value, index) => {
      const distance = Math.abs(Math.floor(index / 3) - Math.floor(pos / 3))
        + Math.abs(index % 3 - pos % 3);
      return distance <= 1 ? 0 : value;
    });
    const actual = calculateNewBoard(pos, original);
    assert.deepEqual(actual, expected);
    assert.deepEqual(original, Array(9).fill(1));
    assert.deepEqual(calculateNewBoard(pos, actual), original);
  }
});

test('solver reaches all green from every one of the 512 possible boards', () => {
  for (let state = 0; state < 512; state++) {
    const original = Array.from({ length: 9 }, (_, index) => (state >> index) & 1);
    const solution = getSolution(original);
    assert.equal(solution.length, 9);
    assert.ok(solution.every(value => value === 0 || value === 1));
    let board = [...original];
    solution.forEach((press, index) => {
      if (press) board = calculateNewBoard(index, board);
    });
    assert.deepEqual(board, Array(9).fill(1), `Failed board ${state}`);
    assert.deepEqual(original, Array.from({ length: 9 }, (_, index) => (state >> index) & 1));
  }
});

test('a canceled scramble still starts with an unsolved board', (t) => {
  t.mock.method(Math, 'random', () => 0);
  const board = createScrambledBoard();
  assert.equal(board.length, 9);
  assert.ok(board.some(cell => cell === 0));
  assert.ok(board.every(cell => cell === 0 || cell === 1));
});
