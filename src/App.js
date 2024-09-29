import { useState } from 'react';

export default function Board() {
   const [squares, setSquares] = useState(Array(9).fill(null));
   const [xIsNext, setXIsNext] = useState(true);
   const [isReset, setReset] = useState(false);
   const [winnigLines, winner] = calculateWinner(squares);

   function handleClick(i) {
      setReset(false);
      if (squares[i] || (winner))
      {
         console.log("nothing happens here");
         return;
      }
      const nextSqaures = squares.slice();
      if (xIsNext) {
         nextSqaures[i] = "X";
      } else {
         nextSqaures[i] = "O";
      }
      setSquares(nextSqaures);
      setXIsNext(!xIsNext);
   }

   function handleReset() {
      console.log("Reset Clicked!");
      setReset(true);
      setXIsNext(true);
      squares.fill(null);
   }

   let status;

   if (winner) {
      status = "winner: " + winner;
      console.log(winnigLines);
   } else if (!squares.includes(null)) {
      status = "Nobody won! Its a draw";
   } else {
      status = "Next move: " + (xIsNext ? "X" : "O");
   }

   const squareArrayList = [
      { divKey : "1", squareLine : [0, 1, 2] },
      { divKey : "2", squareLine : [3, 4, 5] },
      { divKey : "3", squareLine : [6, 7, 8] }
   ];
   let squareClass;
   //Arrow functions implicitly return the expression right after =>, so you didn’t need a return statement:
   //However, you must write return explicitly if your => is followed by a { curly brace!

   return (
      <>
         <h1>Tic-Tac-Toe</h1>
         <div className="status">{status}</div>
         <br />
         {/*Below lines is an example of Object destructuring */}
         {squareArrayList.map(({ divKey, squareLine }) =>
            <div key={divKey} className="board-row">
               {squareLine.map((squareBox) => {
                  squareClass = winnigLines.includes(squareBox) ? "winning-square" : "square"
                  return <Square key={squareBox} value={squares[squareBox]} onSquareClick={() => handleClick(squareBox)} className={squareClass} />
               })}
            </div>
         )}
         <br/>
         <div>
            <button onClick={handleReset}>Reset Game</button>
         </div>
      </>
   );
}

function Square({ value, onSquareClick, className}) {

   return <button className={ className} onClick={onSquareClick}>{value}</button>
}

function calculateWinner(squares) { 
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ];
   for (let i = 0; i < lines.length; i++) {
      //Below line is an example of array destructuring. Also this function is returing destructured array
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
         return [lines[i], squares[a]];
      }
   }
   return [[-1,-1,-1], false]
;
}

