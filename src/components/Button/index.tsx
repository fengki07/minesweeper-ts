import React from "react";
import { CellState, CellValue } from "../../types";
import "./button.scss";

interface Buttonprops {
  row: number;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
  col: number;
  state: CellState;
  value: CellValue;
}

const Button: React.FC<Buttonprops> = ({ row, col, onContext, onClick, state, value }) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } else if (value === CellValue.none) {
        return null;
      }

      return value;
    } else if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
           🇮🇩
        </span>
      );

    }  
    
    return null;
  }
  
  return <div className={`Button ${state === CellState.visible ? "visible" : "" } value-${value}`} 
    onClick={onClick(row, col)}
    onContextMenu={onContext(row, col)}
    >  
    {renderContent()}
    </div>
};

export default Button;