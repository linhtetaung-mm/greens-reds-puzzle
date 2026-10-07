export function calculateNewBoard(pos: number, currentBoard: number[]): number[] {
  const newBoard = [...currentBoard];
  const r = Math.floor(pos / 3);
  const c = pos % 3;

  newBoard[pos] ^= 1;
  if (r < 2) newBoard[(r + 1) * 3 + c] ^= 1;
  if (r > 0) newBoard[(r - 1) * 3 + c] ^= 1;
  if (c < 2) newBoard[r * 3 + (c + 1)] ^= 1;
  if (c > 0) newBoard[r * 3 + (c - 1)] ^= 1;

  return newBoard;
}

export function createScrambledBoard(): number[] {
  let board = Array<number>(9).fill(1);
  for (let i = 0; i < 20; i++) {
    board = calculateNewBoard(Math.floor(Math.random() * 9), board);
  }
  // A scramble can cancel itself out; always start with a playable puzzle.
  return board.every(cell => cell === 1) ? calculateNewBoard(0, board) : board;
}
