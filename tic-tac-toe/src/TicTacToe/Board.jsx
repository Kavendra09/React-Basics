import React, { useState, useMemo } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winnerLogic = useMemo(() => [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ], []);

  const checkWinner = () => {
    for (let [a, b, c] of winnerLogic) {
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return null;
  };

  const isWinner = checkWinner();

  const handleClick = (index) => {
    if (state[index] || isWinner) {
      return;
    }
    const newState = state.slice();
    newState[index] = isXTurn ? "X" : "O";
    setState(newState);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="board-container">
      {isWinner ? (
        <>
          <div style={{ color: "#fff" }}>{isWinner} won the game</div>
          <button onClick={handleReset}>Play Again</button>
        </>
      ) : (
        <>
          <h4>Player {isXTurn ? "X" : "O"} please move</h4>
          <div className="board">
            {state.map((value, index) => (
              <Square key={index} value={value} onClick={() => handleClick(index)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
