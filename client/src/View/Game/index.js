import React, { useState } from 'react'
import JoinRoom from "./JoinRoom";
import GamePlayPage from "./GamePlayPage";
import { GameContext } from "./store/context";

export default function GamePage() {
    const [room, setRoom] = useState();

    return (
        <GameContext.Provider value={{room, setRoom}}>
            <JoinRoom />
        </GameContext.Provider>
    )
}
