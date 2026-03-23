import {steps} from "./piecesSteps.js"
import {noLegalMoves} from "./noLegalMoves.js";
import {
    swapCells,
    putPieceAtPosition,
    removePieceFromPosition,
    removeFlags,
    createNewBoard,
    getCheckingColor,
    isInsideBoard
} from "./methods.js";
import {addAttackFlagsForCheck, isKingUnderCheck} from "./kingUnderCheck.js";
import {getFile} from "./data.js";

export const handle = ({
    board,
    rIndex,
    cIndex,
    sideToMove,
    updateSideToMove,
    activePiece,
    updateActivePiece,
    updateBoard,
    updateRemovedPieces, completeMatch, updateSteps, updatePrevBoards, prevSteps,
}) => {
    const cell = board[rIndex][cIndex];
    if (cell.isHighlighted) {
        // this piece is highlighted, move active piece to here
        const newBoard = createNewBoard(board); // first remove any highlight or attack flags from the board
        removeFlags(newBoard);
        const activePieceDetails = newBoard[activePiece.r][activePiece.c].piece;
        if (activePieceDetails.type === "king" && activePieceDetails.atInitialPosition) {
            if (sideToMove === "white") {
                // King Side Castling
                if (rIndex === 7 && cIndex === 6) {
                    // King Side Castling
                    const king = newBoard[7][4].piece;
                    const rook = newBoard[7][7].piece;
                    removePieceFromPosition(newBoard, 7, 4);
                    removePieceFromPosition(newBoard, 7, 7);
                    putPieceAtPosition(newBoard, 7, 6, king);
                    putPieceAtPosition(newBoard, 7, 5, rook);
                    king.atInitialPosition = false;
                    rook.atInitialPosition = false;
                    let stepNotation = "O-O";
                    checkGameStatus(newBoard, sideToMove, updateActivePiece, updateBoard, updateSideToMove, completeMatch, stepNotation, updateSteps, updatePrevBoards);
                    return;
                } else if (rIndex === 7 && cIndex === 2) {
                    const king = newBoard[7][4].piece;
                    const rook = newBoard[7][0].piece;
                    removePieceFromPosition(newBoard, 7, 4);
                    removePieceFromPosition(newBoard, 7, 0);
                    putPieceAtPosition(newBoard, 7, 2, king);
                    putPieceAtPosition(newBoard, 7, 3, rook);
                    king.atInitialPosition = false;
                    rook.atInitialPosition = false;
                    let stepNotation = "O-O-O";
                    checkGameStatus(newBoard, sideToMove, updateActivePiece, updateBoard, updateSideToMove, completeMatch, stepNotation, updateSteps, updatePrevBoards);
                    return;
                }
            } else {
                if (rIndex === 0 && cIndex === 6) {
                    // King Side Castling
                    const king = newBoard[0][4].piece;
                    const rook = newBoard[0][7].piece;
                    removePieceFromPosition(newBoard, 0, 4);
                    removePieceFromPosition(newBoard, 0, 7);
                    putPieceAtPosition(newBoard, 0, 6, king);
                    putPieceAtPosition(newBoard, 0, 5, rook);
                    king.atInitialPosition = false;
                    rook.atInitialPosition = false;
                    let stepNotation = "O-O";
                    checkGameStatus(newBoard, sideToMove, updateActivePiece, updateBoard, updateSideToMove, completeMatch, stepNotation, updateSteps, updatePrevBoards);
                    return;
                } else if (rIndex === 0 && cIndex === 2) {
                    const king = newBoard[0][4].piece;
                    const rook = newBoard[0][0].piece;
                    removePieceFromPosition(newBoard, 0, 4);
                    removePieceFromPosition(newBoard, 0, 0);
                    putPieceAtPosition(newBoard, 0, 2, king);
                    putPieceAtPosition(newBoard, 0, 3, rook);
                    king.atInitialPosition = false;
                    rook.atInitialPosition = false;
                    let stepNotation = "O-O-O";
                    checkGameStatus(newBoard, sideToMove, updateActivePiece, updateBoard, updateSideToMove, completeMatch, stepNotation, updateSteps, updatePrevBoards);
                    return;
                }
            }
        }
        let stepNotation = activePieceDetails.algebraicNotation + cell.file + cell.rank;
        swapCells(newBoard, rIndex, cIndex, activePiece);
        newBoard[rIndex][cIndex].piece.atInitialPosition = false;
        checkGameStatus(newBoard, sideToMove, updateActivePiece, updateBoard, updateSideToMove, completeMatch, stepNotation, updateSteps, updatePrevBoards);
    }
    else if (cell.isUnderAttack) {
        const {r, c} = activePiece; // active or selected piece's row and col number
        const killedPiece = board[rIndex][cIndex].piece;
        const newBoard = createNewBoard(board);
        const activePieceDetails = newBoard[r][c].piece;
        // en passant capture
        if (activePieceDetails.type === "pawn") {
            if (killedPiece.type === "pawn") {
                if (rIndex === r) {
                    removeFlags(newBoard);
                    removePieceFromPosition(newBoard, rIndex, cIndex);
                    let newRow = sideToMove === "white" ? rIndex-1 : rIndex+1;
                    // let newCol = cIndex;
                    putPieceAtPosition(newBoard, newRow, cIndex, activePieceDetails);
                    removePieceFromPosition(newBoard, r, c);
                    updateRemovedPieces(killedPiece);
                    newBoard[newRow][cIndex].piece.atInitialPosition = false;
                    let stepNotation = getFile(c) + "x" + getFile(cIndex) + (sideToMove === "white" ? "6" : "3");
                    checkGameStatus(newBoard, sideToMove, updateActivePiece, updateBoard, updateSideToMove, completeMatch, stepNotation, updateSteps, updatePrevBoards);
                    return;
                }
            }
        }

        let stepNotation = activePieceDetails.algebraicNotation + "x" + cell.file + cell.rank;
        if (newBoard[r][c].piece.type === "pawn") {
            stepNotation = newBoard[r][c].file + stepNotation;
        }
        removeFlags(newBoard);
        putPieceAtPosition(newBoard, rIndex, cIndex, newBoard[r][c].piece);
        removePieceFromPosition(newBoard, r, c);
        updateRemovedPieces(killedPiece);
        newBoard[rIndex][cIndex].piece.atInitialPosition = false;
        checkGameStatus(newBoard, sideToMove, updateActivePiece, updateBoard, updateSideToMove, completeMatch, stepNotation, updateSteps, updatePrevBoards);
    }
    else if (activePiece !== null && rIndex === activePiece.r && cIndex === activePiece.c) {
        const newBoard = createNewBoard(board);
        removeFlags(newBoard);
        updateBoard(newBoard);
        updateActivePiece(null);
    }
    else if (cell.isEmpty) {
        return null;
    }
    else if (cell.piece.color === sideToMove) {
        const piece = board[rIndex][cIndex].piece;
        const possibleSteps = steps[piece.type];
        const newBoard = createNewBoard(board);
        if (activePiece !== null) {
            removeFlags(newBoard);
            updateActivePiece(null);
        }
        if (piece.type === "pawn") {
            pawnMoveHighlight(newBoard, rIndex, cIndex, piece, 1, sideToMove);

            if (piece.atInitialPosition) {
                pawnMoveHighlight(newBoard, rIndex, cIndex, piece, 2, sideToMove);
            }
            // for attack positions
            if (piece.color === "white") {
                pawnMoveAttack(newBoard, rIndex, cIndex, -1, -1, sideToMove);
                pawnMoveAttack(newBoard, rIndex, cIndex, -1, +1, sideToMove);
            }
            else {
                pawnMoveAttack(newBoard, rIndex, cIndex, +1, +1, sideToMove);
                pawnMoveAttack(newBoard, rIndex, cIndex, +1, -1, sideToMove);
            }
            // Pawn promotion
            // En passant
            if (piece.type === "pawn") {
                if (sideToMove === "white") {
                    if (rIndex === 3) {
                        // whether opposite pawn at left
                        EnPassantCheck(newBoard, rIndex, cIndex, prevSteps, sideToMove, -1, "5");
                        EnPassantCheck(newBoard, rIndex, cIndex, prevSteps, sideToMove, +1, "5");
                    }
                } else {
                    if (rIndex === 4) {
                        EnPassantCheck(newBoard, rIndex, cIndex, prevSteps, sideToMove, -1, "4");
                        EnPassantCheck(newBoard, rIndex, cIndex, prevSteps, sideToMove, +1, "4");
                    }
                }
            }
        }
        else {
            // normal moves
            for (let i = 0; i < possibleSteps.length; i++) {
                const stepsData = possibleSteps[i];
                const directions = stepsData[stepsData["name"]]
                for (const [dr, dc] of directions) {
                    const newRow = rIndex + dr;
                    const newCol = cIndex + dc;

                    if (!isInsideBoard(newRow, newCol)) break;

                    const cell = newBoard[newRow][newCol];

                    if (cell.isEmpty) {
                        if (!willKingBeUnderCheck(newBoard, rIndex, cIndex, newRow, newCol, sideToMove)) {
                            cell.isHighlighted = true;
                        }
                    } else {
                        if (cell.piece.color !== sideToMove && !willKingBeUnderCheck(newBoard, rIndex, cIndex, newRow, newCol, sideToMove)) {
                            cell.isUnderAttack = true;
                        }
                        break;
                    }
                }
            }
            if (piece.type === "king") {
                if (sideToMove === "white") {
                    const cell = newBoard[7][4];
                    if (!cell.isEmpty) {
                        if (cell.piece.color === "white" && cell.piece.type === "king" && cell.piece.atInitialPosition) {
                            if (isKingSideCastlePossible(board, sideToMove)) {
                                newBoard[7][6].isHighlighted = true;
                            }
                            if (isQueenSideCastlePossible(board, sideToMove)) {
                                newBoard[7][2].isHighlighted = true;
                            }
                        }
                    }
                } else {
                    const cell = newBoard[0][4];
                    if (cell.piece.color === "black" && cell.piece.type === "king" && cell.piece.atInitialPosition) {
                        if (isKingSideCastlePossible(board, sideToMove)) {
                            newBoard[0][6].isHighlighted = true;
                        }
                        if (isQueenSideCastlePossible(board, sideToMove)) {
                            newBoard[0][2].isHighlighted = true;
                        }
                    }
                }
            }
        }
        updateBoard(newBoard);
        updateActivePiece({
            r: rIndex,
            c: cIndex
        });
    }
    else // not this color's turn
    {
        return null;
    }
}

const EnPassantCheck = (board, rIndex, cIndex, prevSteps, sideToMove, value, rank) => {
    if (cIndex + value >= 0 && cIndex + value < 8 && !board[rIndex][cIndex + value].isEmpty && board[rIndex][cIndex+ value].piece.type === "pawn" && board[rIndex][cIndex+ value].piece.color !== sideToMove) {
        if (prevSteps.length !== 0 && prevSteps[prevSteps.length - 1] === getFile(cIndex + value) + rank ) {
            // pass
            const tempBoard = createNewBoard(board);
            removeFlags(tempBoard);
            removePieceFromPosition(tempBoard, rIndex, cIndex+value);
            putPieceAtPosition(tempBoard, rIndex + sideToMove === "white" ? -1 : 1, cIndex+value, tempBoard[rIndex][cIndex].piece);
            removePieceFromPosition(tempBoard, rIndex, cIndex);
            if (!isKingUnderCheck(tempBoard, sideToMove)) {
                board[rIndex][cIndex+value].isUnderAttack = true;
            }
        }
    }
}


const isKingSideCastlePossible = (board, sideToMove) => {
    if (sideToMove === "white") {
        if (board[7][5].isEmpty) {
            if (board[7][6].isEmpty) {
                if (!board[7][7].isEmpty) {
                    const piece = board[7][7].piece;
                    if (piece.type === "rook" && piece.color === "white" && piece.atInitialPosition) {
                        const newBoard = createBoardAndAddFlags(board, sideToMove);
                        if (!newBoard[7][4].isUnderAttack && !newBoard[7][5].isUnderAttack && !newBoard[7][6].isUnderAttack && !newBoard[7][7].isUnderAttack) {
                            return true;
                        }
                    }
                }
            }
        }
    } else {
        if (board[0][5].isEmpty) {
            if (board[0][6].isEmpty) {
                if (!board[0][7].isEmpty) {
                    const piece = board[0][7].piece;
                    if (piece.type === "rook" && piece.color === "black" && piece.atInitialPosition) {
                        const newBoard = createBoardAndAddFlags(board, sideToMove);
                        if (!newBoard[0][4].isUnderAttack && !newBoard[0][5].isUnderAttack && !newBoard[0][6].isUnderAttack && !newBoard[0][7].isUnderAttack) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

const isQueenSideCastlePossible = (board, sideToMove) => {
    if (sideToMove === "white") {
        if (board[7][3].isEmpty) {
            if (board[7][2].isEmpty) {
                if (board[7][1].isEmpty) {
                    if (!board[7][0].isEmpty) {
                        const piece = board[7][0].piece;
                        if (piece.type === "rook" && piece.color === "white" && piece.atInitialPosition) {
                            const newBoard = createBoardAndAddFlags(board, sideToMove);
                            if (!newBoard[7][4].isUnderAttack && !newBoard[7][3].isUnderAttack && !newBoard[7][2].isUnderAttack && !newBoard[7][1].isUnderAttack && !newBoard[7][0].isUnderAttack) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (board[0][3].isEmpty) {
            if (board[0][2].isEmpty) {
                if (board[0][1].isEmpty) {
                    if (!board[0][0].isEmpty) {
                        const piece = board[0][0].piece;
                        if (piece.type === "rook" && piece.color === "black" && piece.atInitialPosition) {
                            const newBoard = createBoardAndAddFlags(board, sideToMove);
                            if (!newBoard[0][4].isUnderAttack && !newBoard[0][3].isUnderAttack && !newBoard[0][2].isUnderAttack && !newBoard[0][1].isUnderAttack && !newBoard[0][0].isUnderAttack) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

const createBoardAndAddFlags = (board, sideToMove) => {
    const newBoard = createNewBoard(board);
    removeFlags(newBoard);
    for (let rIndex = 0; rIndex < 8; rIndex++) {
        for (let cIndex = 0; cIndex < 8; cIndex++) {
            const cell = newBoard[rIndex][cIndex];
            if (!cell.isEmpty && cell.piece.color !== sideToMove) {
                addAttackFlagsForCheck(newBoard, rIndex, cIndex, sideToMove);
            }
        }
    }
    return newBoard;
}

const pawnMoveHighlight = (board, rIndex, cIndex, piece, value, sideToMove) => {
    let addValue = value;
    if (piece.color === "white") {
        addValue = -value;
    }
    const newRow = rIndex + addValue;
    const newCol = cIndex;

    if (isInsideBoard(newRow, newCol)) {
        if (board[newRow][newCol].isEmpty ) {
            if (!willKingBeUnderCheck(board, rIndex, cIndex, newRow, newCol, sideToMove))
                board[newRow][newCol].isHighlighted = true;
        }
    }
}

const pawnMoveAttack = (board, rIndex, cIndex, rValue, cValue, sideToMove) => {
    const newRow = rIndex + rValue
    const newCol = cIndex + cValue;

    if (isInsideBoard(newRow, newCol)) {
        if (!board[newRow][newCol].isEmpty && board[newRow][newCol].piece.color !== sideToMove) {
            if (!willKingBeUnderCheck(board, rIndex, cIndex, newRow, newCol, sideToMove))
                board[newRow][newCol].isUnderAttack = true;
        }
    }
}

const willKingBeUnderCheck = (board, rIndex, cIndex, r, c, sideToMove) => {
    const newBoard = createNewBoard(board);
    removeFlags(newBoard);
    putPieceAtPosition(newBoard, r, c, newBoard[rIndex][cIndex].piece)
    removePieceFromPosition(newBoard, rIndex, cIndex);
    return isKingUnderCheck(newBoard, sideToMove);
}

const checkGameStatus = (board, sideToMove, updateActivePiece, updateBoard, updateSideToMove, completeMatch, stepNotation, updateSteps, updatePrevBoards) => {
    const checkingColor = getCheckingColor(sideToMove);

    if (isKingUnderCheck(board, checkingColor)) {
        const checkmate = noLegalMoves(board, checkingColor);
        if (checkmate) {
            stepNotation += "#"
            completeMatch(getCheckingColor(checkingColor));
        } else {
            // update side to move
            stepNotation += "+"
            updateActivePiece(null);
            updateBoard(board);
            updateSideToMove();
            updatePrevBoards(board);
            // timers logic etc
        }
        updateSteps(stepNotation);
    } else if (noLegalMoves(board, checkingColor)) {
        completeMatch(getCheckingColor("Draw by Stalemate"));
    } else {
        updateActivePiece(null);
        updateBoard(board);
        updateSideToMove();
        updateSteps(stepNotation);
        updatePrevBoards(board);
    }
}
