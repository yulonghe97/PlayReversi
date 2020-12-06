import React, { useState, useEffect, useContext } from "react";
import { useSpring, animated as a } from "react-spring";
import { GameContext } from "../../../context/GameContext";
import ReactCardFlip from "react-card-flip";
import "./chess.css";

export default function Chess(props) {
  const [turn, setTurn] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const { game } = useContext(GameContext);

  useEffect(() => {
    if (game.flippedCells.includes(props.value)) {
      setFlipped(true);
    }
  }, [game]);

  function chess(letter, side) {
    switch (letter) {
      case "X":
        return side === "front" ? <>⚫</> : <>⚪</>;
      case "O":
        return side === "front" ? <>⚪</> : <>⚫</>;
      default:
        return <></>;
    }
  }

  return (
    <>
    {flipped ? (
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <div>{chess(props.letter, "front")}</div>
        <div>{chess(props.letter, "back")}</div>
      </ReactCardFlip>
    ) : (
      <>{chess(props.letter, "front")}</>
    )}
    </>
  );
}
