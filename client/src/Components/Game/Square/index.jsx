import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "../../../context/GameContext";

export default function Square(props) {
  const [value, setValue] = useState(null);
  const [instruction, setInstruction] = useState(false);

  const { setLastMove, availableMoves } = useContext(GameContext);

  useEffect(() => {
    if (props.letter !== " ") {
      setValue(props.letter === "X" ? "⚫" : "⚪");
    }
    if (availableMoves.includes(props.value)) {
      setInstruction(true);
    }else{
      setInstruction(false);
    }
  });

  const onClick = () => {
    console.log(`ID: ${props.value}`);
    setLastMove(props.value);
  };

  return (
    <>
      {instruction ? (
        <button className="square-ava" onClick={onClick}>
          {value}
        </button>
      ) : (
        <button className="square" onClick={onClick}>
          {value}
        </button>
      )}
    </>
  );
}
