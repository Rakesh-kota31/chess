import React from 'react'
import {useState, useRef, useEffect} from 'react';
import {initialTimer, pieceImagePath} from "../utils/constants.js";

const PlayerDetails = (props) => {
    const { matchStatus, sideToMove, playerColor, killedPieces, completeMatch } = props;

    const [playerTimer, setPlayerTimer] = useState(initialTimer);
    const playerRef = useRef(null);

    const updateTime = (prev) => {
        let minutes = parseInt(prev[0]);
        let seconds = parseInt(prev[1]);

        if (seconds === 0) {
            minutes = minutes - 1;
            seconds = 60;
        }

        seconds -= 1

        let m = minutes.toString().padStart(2, "0");
        let s = seconds.toString().padStart(2, "0");

        return [m, s]
    }

    const attachTimer = () => {
        playerRef.current = setInterval(() => {
            setPlayerTimer(prev => updateTime(prev));
        }, 1000)
    }

    const detachTimer = () => {
        if (isTimerAttached()) {
            clearInterval(playerRef.current);
            playerRef.current = null;
        }
    }

    const isTimerAttached = () => {
        return playerRef.current !== null
    }

    const isMatchOn = () => {
        return matchStatus === "in-progress"
    }

    const isCurrentPlayersMove = () => {
        return sideToMove === playerColor
    }

    const didTimeRunOut = () => {
        return playerTimer[0] === "00" && playerTimer[1] === "00";
    }

    useEffect(() => {
       if(isMatchOn())
       {
           if (isCurrentPlayersMove())
           {
               if (!isTimerAttached())
               {
                   attachTimer();
               }
           }
           else
           {
               detachTimer();
           }
       }
       else {
           detachTimer();
       }
       return () => {
           detachTimer();
       }
    }, [matchStatus, sideToMove]);

    useEffect(() => {
        if (didTimeRunOut()) {
            completeMatch(playerColor === "white" ? "black" : "white");
            detachTimer();
        }
    })

    return (
        <div className={"player-content"}>
            <h1 className="player-title">Player {playerColor}</h1>
            <div className={"player-timer-section"}>
                <p>Timer: {playerTimer[0]}:{playerTimer[1]}</p>
            </div>
            <div className={"killed-pieces-section"}>
                {
                    killedPieces.length !== 0 && killedPieces.map((piece, index) => (
                        <img key={index} src={pieceImagePath + piece.imagePath} alt={piece.name} className={"killed-piece"}/>
                    ))
                }
            </div>
        </div>
    )
}
export default PlayerDetails
