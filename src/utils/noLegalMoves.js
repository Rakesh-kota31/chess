import {steps} from "./piecesSteps.js";
import {putPieceAtPosition, removePieceFromPosition, createNewBoard, isInsideBoard} from "./methods.js";
import {isKingUnderCheck} from "./kingUnderCheck.js";

export const noLegalMoves = (board, checkingColor) => {
    // is this checkmate for checkingColor
    // what needs to be done is - for every checkingColor piece, move it and then
    const newBoard = createNewBoard(board);
    // no flags will be there
    // console.log("isCheckmate function called")  ;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = newBoard[i][j];
            if (!cell.isEmpty) {
                if (cell.piece.color === checkingColor) {
                    // for this piece
                    if(fun(newBoard, i, j, checkingColor)){
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

// this function "fun" returns whether piece at (i, j) prevents check
const fun = (board, rIndex, cIndex, checkingColor) => {
    const piece = board[rIndex][cIndex].piece;
    const possibleSteps = steps[piece.type];
    const newBoard = createNewBoard(board);
    if (piece.type === "pawn") {
        if (movePawn(newBoard, rIndex, cIndex, 1, checkingColor)) return true;

        if (piece.atInitialPosition) {
            if (movePawn(newBoard, rIndex, cIndex, 2, checkingColor)) return true;
        }

        if (checkingColor === "white") {
            if (pawnAttack(newBoard, rIndex, cIndex, rIndex-1, cIndex-1, checkingColor)) return true;
            if (pawnAttack(newBoard, rIndex, cIndex, rIndex-1, cIndex+1, checkingColor)) return true;
        } else {
            if (pawnAttack(newBoard, rIndex, cIndex, rIndex+1, cIndex+1, checkingColor)) return true;
            if (pawnAttack(newBoard, rIndex, cIndex, rIndex+1, cIndex-1, checkingColor)) return true;
        }
    } else {
        for (let i = 0; i < possibleSteps.length; i++) {
            const stepsData = possibleSteps[i];
            const directions = stepsData[stepsData["name"]]
            for (const [dr, dc] of directions) {
                const newRow = rIndex + dr;
                const newCol = cIndex + dc;

                if (!isInsideBoard(newRow, newCol)) break;

                if (fun1(newBoard, rIndex, cIndex, newRow, newCol, checkingColor)) return true;
            }
        }
    }
    return false;
}

export const movePawn = (board, rIndex, cIndex, value, checkingColor) => {
    let addValue = value;
    if (checkingColor === "white") {
        addValue = -value;
    }
    const newRow = rIndex + addValue;
    const newCol = cIndex;

    if (!isInsideBoard(newRow, newCol)) {return false}

    return fun1(board, rIndex, cIndex, newRow, newCol, checkingColor);
}

export const pawnAttack = (board, rIndex, cIndex, r, c, checkingColor) => {
    if (!isInsideBoard(r, c)) {return false}

    return fun1(board, rIndex, cIndex, r, c, checkingColor);
}

// this function moves piece at (r1, c1) to (r2, c2) if (r2, c2) is empty or piece at (r2, c2) is opposite color & not King
export const fun1 = (board, r1, c1, r2, c2, checkingColor) => {
    if (!board[r2][c2].isEmpty && board[r2][c2].piece.color === checkingColor) {
        return false;
    }

    if (!board[r2][c2].isEmpty && board[r2][c2].piece.color !== checkingColor && board[r2][c2].piece.type === "King") {
        return false;
    }

    // move (r1, c1) to (r2, c2)
    const newBoard = createNewBoard(board);
    if (!newBoard[r2][c2].isEmpty){
        removePieceFromPosition(newBoard, r2, c2);
    }
    putPieceAtPosition(newBoard, r2, c2, board[r1][c1].piece);
    removePieceFromPosition(newBoard, r1, c1);

    return !isKingUnderCheck(newBoard, checkingColor);
    // return !isKingUnderCheck(newBoard, getCheckingColor(checkingColor));
}