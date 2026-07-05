"use client";

import { useState, useEffect } from 'react';
import { getSolution } from './greenredsolver';
import ReactMarkdown from 'react-markdown';
import techMarkdown from "./greenandredsolution.md?raw";
import exampleMarkdown from "./example.md?raw";

export default function GreensAndReds() {


  // 1. Initialize with a "safe" empty state (all Green/1)
  const [board, setBoard] = useState<number[]>(Array(9).fill(1));
  const [moves, setMoves] = useState(0);
  const [isClient, setIsClient] = useState(false); // New state to track mounting

  const [hints, setHints] = useState<number[]>(Array(9).fill(0));

  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  // 2. This only runs once the component is safely in the browser
  useEffect(() => {
    setIsClient(true);
    resetGame(); // Scramble the board once mounted
  }, []);

  function calculateNewBoard(pos: number, currentBoard: number[]): number[] {
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

  const handleShowSolution = () => {
    const sol = getSolution(board);
    setHints(sol);
  };

  const handleSquareClick = (index: number) => {
    setBoard((prevBoard) => calculateNewBoard(index, prevBoard));
    setMoves((m) => m + 1);

    // If the user clicks a hinted square, remove that hint
    const newHints = [...hints];
    newHints[index] = 0; 
    setHints(newHints);
  };

  const resetGame = () => {
    let tempBoard = Array(9).fill(1);
    for (let i = 0; i < 20; i++) {
      const randomPos = Math.floor(Math.random() * 9);
      tempBoard = calculateNewBoard(randomPos, tempBoard);
    }
    setBoard(tempBoard);
    setMoves(0);
    setHints(Array(9).fill(0));
  };

  const isWinner = board.every((cell) => cell === 1);

  // 3. Don't render the game board until we are on the client
  if (!isClient) {
    return <div className="h-[400px] flex items-center justify-center">Loading Puzzle...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      
      {/* Game Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Greens & Reds</h2>
        <p className="text-gray-500">Make all squares Green. Moves: {moves}</p>
      </div>

      {/* The Game Board (Replaces the Canvas) */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-[400px] aspect-square bg-black p-2 rounded-xl shadow-lg">
        {board.map((cellValue, index) => (
          <button
            key={index}
            onClick={() => handleSquareClick(index)}
            disabled={isWinner}
            className={`
              relative w-full h-full rounded-md transition-all duration-300 flex items-center justify-center
              ${cellValue === 1 ? 'bg-green-500' : 'bg-red-500'}
              ${isWinner ? 'opacity-80' : 'active:scale-95'}
            `}
          >
            {/* This is the visual hint */}
            {hints[index] === 1 && (
              <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-md" />
            )}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button 
          onClick={resetGame}
          className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
        >
          Reset Grid
        </button>

        <button 
          onClick={handleShowSolution}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Show Solution
        </button>

        {/* Floating Help Button */}
        <button
          onClick={() => setIsHelpOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-xl shadow transition-all cursor-pointer"
        >
          ❓ How to Play
        </button>
      </div>

      {/* Win State */}
      {isWinner && moves > 0 && (
        <div className="text-green-600 font-bold text-xl animate-bounce">
          Puzzle Solved!
        </div>
      )}


      {/* The Accessible Modal Overlay */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Puzzle Instructions</h2>
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Content Pane with Tailwind Prose Styles */}
            <div className="p-6 overflow-y-auto text-left">
              <article className="prose prose-slate max-w-none prose-headings:font-bold">
                <ReactMarkdown>{techMarkdown}</ReactMarkdown>
                <hr/><br/>
                <ReactMarkdown>{exampleMarkdown}</ReactMarkdown>
              </article>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl text-right">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 text-sm font-medium rounded-xl cursor-pointer"
              >
                Got it, let's play!
              </button>
            </div>

          </div>
        </div>
      )}
    </div>


  );
}