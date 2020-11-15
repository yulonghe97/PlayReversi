import React from "react";
import Square from "../Square";

export default function Row(props) {
  const letter = String.fromCharCode(65 + props.row);

  return (
    <div className="board-row">
      {props.board.map((e, i) => {
        return <Square value={`${letter}${i + 1}`} letter={e} />;
      })}
    </div>
  );
}
