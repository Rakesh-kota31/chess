import {createNewBoard, getCheckingColor, isInsideBoard, removeFlags} from "./methods.js";
import {steps} from "./piecesSteps.js";

export const isKingUnderCheck = (board, checkingColor) => {
    // console.log("King Under Check")
    // console.log(`Checking whether ${checkingColor} King is under check`);
    const newBoard = createNewBoard(board);
    removeFlags(newBoard);
    for (let rIndex = 0; rIndex < 8; rIndex++) {
        for (let cIndex = 0; cIndex < 8; cIndex++) {
            const cell = newBoard[rIndex][cIndex];
            if (!cell.isEmpty && cell.piece.color !== checkingColor) {
                addAttackFlagsForCheck(newBoard, rIndex, cIndex, checkingColor);
            }
        }
    }
    const [r, c] = findKing(newBoard, checkingColor);
    //console.log(`Coordinates of ${checkingColor} is ${r}, ${c}`);
    // console.log(r, c);
    // console.log(newBoard[r][c]);
    return newBoard[r][c].isUnderAttack;
}

const findKing = (board, checkingColor) => {
    // console.log("findKing")
    // console.log(checkingColor);
    for (let i = 0; i < 8; i++){
        for ( let j = 0; j < 8; j++){
            if (!board[i][j].isEmpty) {
                if (board[i][j].piece.type === "king"){
                    // console.log("King");
                    if (board[i][j].piece.color === checkingColor) {
                        // console.log("found King")
                        return [i, j];
                    }
                }
            }
        }
    }
}

export const addAttackFlagsForCheck = (board, rIndex, cIndex, checkingColor) => {
    // console.log("add Attack Flags For Check");
    // console.log(`Adding attack flags for piece ${board[rIndex][cIndex].piece.name}`);
    const piece = board[rIndex][cIndex].piece;
    let possibleSteps = null;
    if (piece.type === "pawn") {
        // console.log(steps["pawn"]);
        // console.log(steps["pawn"]["white"]);
        // console.log(checkingColor);
        possibleSteps = steps["pawn"][getCheckingColor(checkingColor)].attackMoves;
    } else {
        possibleSteps = steps[piece.type];
    }

    for (let i = 0; i < possibleSteps.length; i++) {
        const stepsData = possibleSteps[i];
        let directions = stepsData[stepsData["name"]];
        if (piece.type === "pawn") {
            directions = possibleSteps;
        }
        for (const [dr, dc] of directions) {
            const newRow = rIndex + dr;
            const newCol = cIndex + dc;

            if (!isInsideBoard(newRow, newCol)) break;

            const cell = board[newRow][newCol];

            if (cell.isEmpty) {
                cell.isUnderAttack = true;
            } else if (cell.piece.color === checkingColor) {
                cell.isUnderAttack = true;
                break;
            } else {
                break;
            }
        }
    }
}