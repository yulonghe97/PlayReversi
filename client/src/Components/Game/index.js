import React, { useState, useEffect } from "react";
import Board from "./Board";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./style/index.css";



export default function Game() {

  

  return (
    <>
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
    </>
  );
}
