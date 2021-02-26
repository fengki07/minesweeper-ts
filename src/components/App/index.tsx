import React, { useEffect, useState } from "react";
import { Generatecells, openMultipleCells } from "../../utils";
import NumberDisplay from "../NumberDisplay";
import Button from "../Button"
import "./App.scss";
import { Cell, CellState, CellValue, Face } from "../../types";



const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(Generatecells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);

  useEffect(() => {
    const handleMouseDown = () => {
      setFace(Face.oh);

    }
    const handleMouseup = () => {
      setFace(Face.smile)
    }
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseup);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseup);
    }
  }, []);
  useEffect(() => {
    if (live) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);
  const handleCellClick = (rowParam: number, colParam: number) => (): void => {

    if (!live) {
      setLive(true);
    }
    const currentCell = cells[rowParam][colParam];
    let newCell = cells.slice();

    if (
      [CellState.flagged, CellState.visible].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {

    } else if (currentCell.value === CellValue.none) {
      newCell = openMultipleCells(newCell, rowParam, colParam);
      setCells(newCell);
    } else {
      newCell[rowParam][colParam].state = CellState.visible;
      setCells(newCell);
    }
  };

  const handleCellContext = (
    rowParam: number,
    colParam: number
  ) => function (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    e.preventDefault();

    if (!live) {
      return;
    }

    const currentCells = cells.slice();
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.open) {
      currentCells[rowParam][colParam].state = CellState.flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currentCells[rowParam][colParam].state = CellState.open;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    };

  };

  const handleFaceClick = (): void => {
    if (live && time < 999) {
      setLive(false);
      setTime(0);
      setCells(Generatecells());
    }
  }

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        <Button
          key={`${rowIndex}-${colIndex}`}
          onClick={handleCellClick}
          onContext={handleCellContext}
          state={cell.state}
          value={cell.value}
          row={rowIndex}
          col={colIndex} />)
    )
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={bombCounter} />
        <div className="Face" onClick={handleFaceClick}>
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>

    </div>
  );
};

export default App;
