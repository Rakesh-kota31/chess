import React from 'react'
import {pieceImagePath} from "../utils/constants.js";

const BoardCell = (props) => {
    const {board, row_index, col_index, handleClick, sideToMove} = props;

    const cell = board[row_index][col_index];

    // console.log(row_index, col_index);
    // console.log(cell);
    return (
        <div
            className={
                cell.isEmpty
                    ? "board-cell"
                    : cell.isHighlighted || cell.piece.color === sideToMove || cell.isUnderAttack
                        ? "board-cell hover:cursor-pointer"
                        : "board-cell hover:cursor-not-allowed"
            }
            style={{
                gridRowStart: row_index+1,
                gridRowEnd: row_index+2,
                gridColumnStart: col_index+1,
                gridColumnEnd: col_index+1,
                backgroundColor: (row_index + col_index)%2 === 0 ? "#DFDADA" : "#38A7BD",
                border: cell.isUnderAttack
                    ? "2px solid red"
                    : "none",
                borderColor: cell.isUnderAttack
                    ? "red"
                    : "transparent",
            }}
            onClick={() => handleClick(row_index, col_index)}
        >
            {
                !cell.isEmpty && <img src={pieceImagePath + cell.piece.imagePath} alt="" />
            }
            <div className={"board-cell-inner"}>
                {
                    cell.isHighlighted && <img src={pieceImagePath + cell.highlightImage} alt="" />
                }
                {
                    cell.isUnderAttack && <img src={pieceImagePath + cell.underAttackImage} alt={""} />
                }
            </div>
        </div>
    )
}
export default BoardCell
