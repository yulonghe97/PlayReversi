import React, { useContext, useEffect } from "react";
import Row from "./Row";
import { Grow } from "@material-ui/core";
import { GameContext } from "../../../View/Game/store/context";

export default function Board() {
  const { board, setBoard } = useContext(GameContext);

  return (
    <>
      {/* <div className="status">{status}</div> */}
      {board.map((e, i) => {
        if (i % 8 === 0) {
          return <Row row={i / 8} board={board.slice(i, i + 8)} />;
        }
      })}
    </>
  );
}
