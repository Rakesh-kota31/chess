import {steps} from "./piecesSteps.js";
import {putPieceAtPosition, removePieceFromPosition, createNewBoard, isInsideBoard, removeFlags} from "./methods.js";
import {isKingUnderCheck} from "./kingUnderCheck.js";
import {getFile} from "./data.js";

export const noLegalMoves = (board, checkingColor, prevSteps) => {
    const newBoard = createNewBoard(board);
    // no flags will be there
    // console.log("isCheckmate function called")  ;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = newBoard[i][j];
            if (!cell.isEmpty) {
                if (cell.piece.color === checkingColor) {
                    // for this piece
                    if(fun(newBoard, i, j, checkingColor, prevSteps)) {
                        // console.log(i, j, "Saved");
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

// this function "fun" returns whether piece at (i, j) prevents check
const fun = (board, rIndex, cIndex, checkingColor, prevSteps) => {
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

        if (piece.type === "pawn") {
            if (checkingColor === "white") {
                if (rIndex === 3) {
                    // whether opposite pawn at left
                    EnPassantCheck(newBoard, rIndex, cIndex, prevSteps, checkingColor, -1, "5");
                    EnPassantCheck(newBoard, rIndex, cIndex, prevSteps, checkingColor, +1, "5");
                }
            } else {
                if (rIndex === 4) {
                    EnPassantCheck(newBoard, rIndex, cIndex, prevSteps, checkingColor, -1, "4");
                    EnPassantCheck(newBoard, rIndex, cIndex, prevSteps, checkingColor, +1, "4");
                }
            }
        }

    } else {
        for (let i = 0; i < possibleSteps.length; i++) {
            const stepsData = possibleSteps[i];
            const directions = stepsData[stepsData["name"]]
            for (const [dr, dc] of directions) {
                const newRow = rIndex + dr;
                const newCol = cIndex + dc;

                if (!isInsideBoard(newRow, newCol)) break;

                if (!newBoard[newRow][newCol].isEmpty) {
                    if (newBoard[newRow][newCol].piece.color !== checkingColor) {
                        if (fun1(newBoard, rIndex, cIndex, newRow, newCol, checkingColor)) return true;
                    }
                    break;
                } else {
                    if (fun1(newBoard, rIndex, cIndex, newRow, newCol, checkingColor)) return true;
                }

                if (fun1(newBoard, rIndex, cIndex, newRow, newCol, checkingColor)) return true;
            }
        }
    }
    return false;
}

const EnPassantCheck = (board, rIndex, cIndex, prevSteps, checkingColor, value, rank) => {
    if (cIndex + value >= 0 && cIndex + value < 8 && !board[rIndex][cIndex + value].isEmpty && board[rIndex][cIndex+ value].piece.type === "pawn" && board[rIndex][cIndex+ value].piece.color !== checkingColor) {
        if (prevSteps.length !== 0 && prevSteps[prevSteps.length - 1] === getFile(cIndex + value) + rank ) {
            // pass
            const tempBoard = createNewBoard(board);
            removeFlags(tempBoard);
            removePieceFromPosition(tempBoard, rIndex, cIndex+value);
            putPieceAtPosition(tempBoard, rIndex + checkingColor === "white" ? -1 : 1, cIndex+value, tempBoard[rIndex][cIndex].piece);
            removePieceFromPosition(tempBoard, rIndex, cIndex);
            return !isKingUnderCheck(tempBoard, checkingColor)
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

    if (board[newRow][newCol].isEmpty) {
        const newBoard = createNewBoard(board);
        putPieceAtPosition(newBoard, newRow, newCol, newBoard[rIndex][cIndex].piece)
        removePieceFromPosition(newBoard, rIndex, cIndex);
        return !isKingUnderCheck(newBoard, checkingColor);
    }

    return false;
}

export const pawnAttack = (board, rIndex, cIndex, r, c, checkingColor) => {
    if (!isInsideBoard(r, c)) {
        return false
    }

    if (!board[r][c].isEmpty && board[r][c].piece.color !== checkingColor && board[r][c].piece.type !== "king") {
        const newBoard = createNewBoard(board);
        removePieceFromPosition(newBoard, r, c);
        putPieceAtPosition(newBoard, r, c, newBoard[rIndex][cIndex].piece)
        removePieceFromPosition(newBoard, rIndex, cIndex);

        return !isKingUnderCheck(newBoard, checkingColor);
    }

    return false;
}
// this function moves piece at (r1, c1) to (r2, c2) if (r2, c2) is empty or piece at (r2, c2) is opposite color & not King
export const fun1 = (board, r1, c1, r2, c2, checkingColor) => {
    if (!board[r2][c2].isEmpty && board[r2][c2].piece.color === checkingColor) {
        return false;
    }

    if (!board[r2][c2].isEmpty && board[r2][c2].piece.color !== checkingColor && board[r2][c2].piece.type === "king") {
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
}