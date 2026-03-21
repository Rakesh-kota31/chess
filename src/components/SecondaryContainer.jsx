import React, {useEffect, useState} from 'react'
import PlayerDetails from "./PlayerDetails.jsx";
import Board from "./Board.jsx";

const SecondaryContainer = (props) => {
    const {matchStatus, completeMatch} = props;

    const [sideToMove, setSideToMove] = useState("white");
    const [killedWhitePieces, setKilledWhitePieces] = useState(() => {return []});
    const [killedBlackPieces, setKilledBlackPieces] = useState(() => {return []});

    const updateSideToMove = () => {
        // console.log("updateSideToMove");
        sideToMove === "white" ? setSideToMove("black") : setSideToMove("white");
    }

    const updateKilledBlackPieces = (piece) => {
        if (matchStatus === "in-progress") {
            let newState = [...killedBlackPieces]
            newState.push(piece)
            newState.sort((piece1, piece2) => piece2.weight - piece1.weight);
            setKilledBlackPieces(newState);
        } else {
            setKilledBlackPieces([]);
        }
    }

    const updateKilledWhitePieces = (piece) => {
        if (matchStatus === "in-progress") {
            // let newState = [...killedWhitePieces]
            // newState.push(piece);
            // newState.sort((piece1, piece2) => piece2.weight - piece1.weight);
            // setKilledWhitePieces(newState);
            setKilledWhitePieces(prev =>
                [...prev, piece].sort((a, b) => b.weight - a.weight)
            );
        } else {
            setKilledWhitePieces([]);
        }
    }

    if (matchStatus !== "in-progress") {
        // setKilledBlackPieces([]);
        // setKilledWhitePieces([]);
        return (
            <div className="mt-2">
                Click Start match.
            </div>
        )
    }

    return (
        <div className={"info-container"}>
            {
                matchStatus === "in-progress" &&
                <div className={"player-white"}>
                    <PlayerDetails
                        matchStatus={matchStatus}
                        sideToMove={sideToMove}
                        playerColor={"white"}
                        killedPieces={killedBlackPieces}
                        completeMatch={completeMatch}
                    />
                </div>
            }
            <Board
                sideToMove={sideToMove}
                updateSideToMove={updateSideToMove}
                updateKilledWhitePieces={updateKilledWhitePieces}
                updateKilledBlackPieces={updateKilledBlackPieces}
                completeMatch={completeMatch}
            />
            {
                matchStatus === "in-progress" &&
                <div className={"player-black"}>
                    <PlayerDetails
                        matchStatus={matchStatus}
                        sideToMove={sideToMove}
                        playerColor={"black"}
                        killedPieces={killedWhitePieces}
                        completeMatch={completeMatch}
                    />
                </div>
            }
        </div>
    )
}
export default SecondaryContainer
