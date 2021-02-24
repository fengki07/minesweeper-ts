import React, { useState } from "react";
import { GenerateCells } from "../../utils";
import NumberDisplay from "../NumberDisplay";
import Button from "../Button"
import "./App.scss";
import { Cell, CellState } from "../../types";



const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(GenerateCells());

  const renderCells = () : React.ReactNode => {
    return cells.map((row, rowIndex) =>
    row.map((cell, colIndex) =>
     <Button key={`${rowIndex}-${colIndex}`} state={cell. state} value={cell. value} row={rowIndex} col={colIndex} />)
    )
  };
    
  return (                          
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
          <span role="img" aria-label="face">
            😸
          </span>
         </div>
         <NumberDisplay value={0} />
      </div>
      <div className="Body">{renderCells()}</div>

    </div>
  );
};

export default App;
