
how to represent the board cell? 
what properties it should have?
should board and piece data be separated?
what are the properties only specific to a cell?
    - cursor pointer or click can only be enabled for squares which contains a piece in it
        - in cells with pieces too,
            - when it's white's move, we can only click on white's pieces
            - when it's black's move, click or pointer should only be enabled for black pieces
            - Additional conditions, we can click on any highlighted square,
    - okay, write these in flow,
    
board is rendered →    
    for each cell, we need to style cursor pointer
    → Empty cell ⇒ no piece is present, cell is not highlighted or under attack

highlighted and under attack maybe cell level?

cell: {
    isEmpty: true or false => whether cell has any piece or not,
    isHighlighted: true or false => this cell is highlighted because some piece is active or clicked and that active
                                    piece can move to this square,
    isUnderAttack: true or false => true when cell is highlighted, cell contains piece which has different color from
                                    activePiece's color,
    rank: between 1 and 8, representing chess board cell's rank,
    file: between a and h, representing chess board cell's file,
    piece: null or Object of piece
}

what else do we need? At present only this maybe.

piece: {
    color: white or black,
    type: king or queen or bishop or horse or rook,
    name: color + type, do I need this in future?,
    algebraicNotation: algebraicNotation type
    atInitialPosition: true or false -> needed for special movements like en passant, castling and pawn 2 steps forward move
    initialSquare: a8 or b1 etc -> do I need this in future?
}

algebraicNotation: {
    king: "K",
    queen: "Q",
    bishop: "B",
    horse: "N",
    rook: "R"
    pawn: ""
}

How to initialize the board?
A function which returns initialized board.
2D array only. but how to build each cell? with this much data?
It will look messy and repetitive. 



-----------------------
                // !cell.isEmpty
                //     ? cell.name !== "highlight"
                //         ? (board[row_index][col_index].isUnderAttack)
                //             ? "board-cell hover:cursor-pointer"
                //             : (board[row_index][col_index].color === sideToMove)
                //                 ? "board-cell hover:cursor-pointer"
                //                 : "board-cell hover:cursor-not-allowed"
                //         : "board-cell hover:cursor-pointer"
                //     : "board-cell"