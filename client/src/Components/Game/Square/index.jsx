import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "../../../View/Game/store/context";

export default function Square(props) {
  const [value, setValue] = useState(null);

  const { setLastMove } = useContext(GameContext);

  useEffect(() => {
    if (props.letter !== ' ') {
      setValue(props.letter === "X" ? "⚫" : "⚪");
    }
  });

  const onClick = () => {
    setValue("⚫");
    console.log(`ID: ${props.value}`);
    setLastMove(props.value);
  };

  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}
