import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "../../../context/GameContext";

export default function Square(props) {
  const [value, setValue] = useState(null);

  const { setLastMove, side } = useContext(GameContext);

  useEffect(() => {
    if (props.letter !== " ") {
      setValue(props.letter === "X" ? "⚫" : "⚪");
    }
  });

  const onClick = () => {
    setValue(side === "X" ? "⚫" : "⚪");
    console.log(`ID: ${props.value}`);
    setLastMove(props.value);
  };

  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}
