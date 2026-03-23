import React, {useState, useEffect} from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {handle} from "../utils/handleClick.js";
import BoardCell from "./BoardCell.jsx";
import RowIndexContainer from "./RowIndexContainer.jsx";
import ColIndexContainer from "./ColIndexContainer.jsx";
import {getBoard} from "../utils/data.js";

const Board = (props) => {
    const {updateSideToMove, sideToMove, updateKilledBlackPieces, updateKilledWhitePieces, completeMatch} = props;

    const [board, setBoard] = useState(() => {return getBoard()});
    const [prevBoards, setPrevBoards] = useState(() => {return [getBoard()]});
    const [steps, setSteps] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [index, setIndex] = useState(0)

    const handlePrevBoard = (value) => {
        let ind = index + value;
        if (ind < 0 || ind > prevBoards.length - 1) {
            return null;
        } else {
            setIndex(ind);
            setBoard(prevBoards[ind]);
        }
    }

    const updateSteps = (step) => {
        setSteps((prevSteps) => [...prevSteps, step]);
        // console.log(steps);
    }

    const updatePrevBoards = (newBoard) => {
        setPrevBoards((prev) => [...prev, newBoard]);
        setIndex(prev => prev + 1);
    }

    const updateBoard = (newBoard) => {
        setBoard(newBoard);
    }

    const updateRemovedPieces = (killedPiece) => {
        if (killedPiece.color === "white") {
            updateKilledWhitePieces(killedPiece);
        } else {
            updateKilledBlackPieces(killedPiece);
        }
    }

    const updateActivePiece = (data) => {
        setActivePiece(data);
    }

    const handleClick = (rIndex, cIndex) => {
        handle({
            board,
            rIndex,
            cIndex,
            sideToMove,
            updateSideToMove,
            activePiece,
            updateActivePiece,
            updateBoard,
            updateRemovedPieces,
            completeMatch,
            updateSteps,
            updatePrevBoards,
            prevSteps: steps
        })
    }

    useEffect(() => {
        console.log("Steps: ", steps);
    }, [steps])

    // console.log(board);

    return (
        <div>
            <div className={"prev-buttons-container flex justify-between mb-1"}>
                <button
                    className={"cursor-pointer border-gray-500 ml-10"}
                    onClick={() => handlePrevBoard(-1)}
                    disabled={index === 0}
                >
                    <ChevronLeft />
                </button>
                <button
                    className={"cursor-pointer border-gray-500 ml-10"}
                    onClick={() => handlePrevBoard(+1)}
                    disabled={index === prevBoards.length - 1}
                >
                    <ChevronRight />
                </button>
            </div>
            <div className={"flex justify-center"}>
                <RowIndexContainer board={board}/>
                <div className={"board-container"}>
                    <div className={"board-grid"}>
                        {
                            board.map((row, row_index) => (
                                <div className={"board-row"} key={row_index}>
                                    {
                                        row.map((cell, col_index) => (
                                            <BoardCell
                                                key={col_index}
                                                board={board}
                                                row_index={row_index}
                                                col_index={col_index}
                                                handleClick={handleClick}
                                                sideToMove={sideToMove}
                                            />
                                        ))
                                    }
                                </div>

                            ))
                        }
                    </div>
                    <ColIndexContainer board={board} />
                </div>
            </div>
        </div>
    )
}
export default Board