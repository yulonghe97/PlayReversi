import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "../../../context/GameContext";
import Chess from "../Chess";

export default function Square(props) {
  const [value, setValue] = useState(null);
  const [instruction, setInstruction] = useState(false);

  const { setLastMove, availableMoves } = useContext(GameContext);

  useEffect(() => {
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
          <Chess letter={props.letter} value={props.value} />
        </button>
      ) : (
        <button className="square" onClick={onClick}>
          <Chess letter={props.letter} value={props.value} />
        </button>
      )}
    </>
  );
}
