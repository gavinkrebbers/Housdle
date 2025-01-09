import { useEffect, useState } from "react";
import PopUp from "./PopUp";

export default function TicTacToe() {
  const [winner, setWinner] = useState("");
  const [visible, setVisible] = useState(false);
  const [draw, setDraw] = useState();
  const [turn, setTurn] = useState(0);
  const [grid, setGrid] = useState(
    Array(3)
      .fill("")
      .map(() => Array(3).fill(""))
  );

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    setVisible(false);
    setTurn(0);
    setGrid(
      Array(3)
        .fill("")
        .map(() => Array(3).fill(""))
    );
  };

  const handleClick = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = turn % 2 == 0 ? "X" : "O";
    setGrid(newGrid);
    if (checkWinner(grid)) {
      setWinner(checkWinner(grid));
      setDraw(false);
      setVisible(true);
      return;
    }
    if (turn == 8) {
      setDraw(true);
      setVisible(true);
      return;
    }

    setTurn((prev) => prev + 1);
  };

  const checkWinner = (grid) => {
    for (let row = 0; row < 3; row++) {
      if (
        grid[row][0] &&
        grid[row][0] === grid[row][1] &&
        grid[row][1] === grid[row][2]
      ) {
        return grid[row][0];
      }
    }
    for (let col = 0; col < 3; col++) {
      if (
        grid[0][col] &&
        grid[0][col] === grid[1][col] &&
        grid[1][col] === grid[2][col]
      ) {
        return grid[0][col];
      }
    }
    if (grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      return grid[0][0];
    }
    if (grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      return grid[0][2];
    }

    return null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {visible ? (
        <PopUp draw={draw} winner={winner} onClose={initializeGame} />
      ) : (
        <></>
      )}
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Tic Tac Toe
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {grid.map((row, rIndex) =>
            row.map((tile, cIndex) => (
              <button
                onClick={() => handleClick(rIndex, cIndex)}
                key={`${rIndex}-${cIndex}`}
                className="w-20 h-20 text-4xl font-bold text-gray-700 transition duration-200 ease-in-out bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tile}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
