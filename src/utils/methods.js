export const swapCells = (board, rIndex, cIndex, activePiece) => {
    // console.log("SwapCells")
    const {r, c} = activePiece; // now, need to move activePiece to this position
    const temp = board[r][c].piece;
    removePieceFromPosition(board, r, c);
    putPieceAtPosition(board, rIndex, cIndex, temp);
}

export const putPieceAtPosition = (board, rIndex, cIndex, piece) => {
    // console.log(rIndex, cIndex, piece);
    if (board[rIndex][cIndex].isEmpty) {
        board[rIndex][cIndex].isEmpty = false;
    }
    board[rIndex][cIndex].piece = piece;
}

export const removePieceFromPosition = (board, r, c) => {
    // console.log("Remove Piece from Position")
    board[r][c].piece = null;
    board[r][c].isEmpty = true;
}

export const removeFlags = (board) => {
    // console.log("Remove Flags")
    board.map((row) => {
        row.map((cell) => {
            cell.isHighlighted = false;
            cell.isUnderAttack = false;
        })
    })
}

export const createNewBoard = (board) => {
    // console.log("Create Board")
    return board.map(row =>
        row.map(cell => ({
            ...cell,
            piece: cell.piece ? { ...cell.piece } : null
        }))
    );
}

export const getCheckingColor = (sideToMove) => {
    // console.log("getCheckingColor")
    return sideToMove === "white" ? "black" : "white"
}

export const isInsideBoard = (row, col) => {
    // console.log("isInsideBoard")
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}