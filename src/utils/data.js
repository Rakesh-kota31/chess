const algebraicNotation = {
    king: "K",
    queen: "Q",
    bishop: "B",
    horse: "N",
    rook: "R",
    pawn: ""
}

const Pieces = {
    "white_rook" : {
        type: "rook",
        color: "white",
        weight: 5,
    },
    "white_knight": {
        type: "knight",
        color: "white",
        weight: 3,
    },
    "white_bishop": {
        type: "bishop",
        color: "white",
        weight: 3,
    },
    "white_queen": {
        type: "queen",
        color: "white",
        weight: 9,
    },
    "white_king": {
        type: "king",
        color: "white",
        weight: 10,
    },
    "white_pawn": {
        type: "pawn",
        color: "white",
        weight: 1,
    },
    "black_rook": {
        type: "rook",
        color: "black",
        weight: 5,
    },
    "black_knight": {
        type: "knight",
        color: "black",
        weight: 3,
    },
    "black_bishop": {
        type: "bishop",
        color: "black",
        weight: 3
    },
    "black_queen": {
        type: "queen",
        color: "black",
        weight: 9
    },
    "black_king": {
        type: "king",
        color: "black",
        weight: 10,
    },
    "black_pawn": {
        type: "pawn",
        color: "black",
        weight: 1,
    }
}

const initialPositions = {
    "a1" : Pieces["white_rook"],
    "b1" : Pieces["white_knight"],
    "c1" : Pieces["white_bishop"],
    "d1" : Pieces["white_queen"],
    "e1" : Pieces["white_king"],
    "f1" : Pieces["white_bishop"],
    "g1" : Pieces["white_knight"],
    "h1" : Pieces["white_rook"],
    "a2" : Pieces["white_pawn"],
    "b2" : Pieces["white_pawn"],
    "c2" : Pieces["white_pawn"],
    "d2" : Pieces["white_pawn"],
    "e2" : Pieces["white_pawn"],
    "f2" : Pieces["white_pawn"],
    "g2" : Pieces["white_pawn"],
    "h2" : Pieces["white_pawn"],
    "a8" : Pieces["black_rook"],
    "b8" : Pieces["black_knight"],
    "c8" : Pieces["black_bishop"],
    "d8" : Pieces["black_queen"],
    "e8" : Pieces["black_king"],
    "f8" : Pieces["black_bishop"],
    "g8" : Pieces["black_knight"],
    "h8" : Pieces["black_rook"],
    "a7" : Pieces["black_pawn"],
    "b7" : Pieces["black_pawn"],
    "c7" : Pieces["black_pawn"],
    "d7" : Pieces["black_pawn"],
    "e7" : Pieces["black_pawn"],
    "f7" : Pieces["black_pawn"],
    "g7" : Pieces["black_pawn"],
    "h7" : Pieces["black_pawn"],
}

export const getRank = (row) => {
    return 8 - row;
}

export const getFile = (col) => {
    return String.fromCharCode(97 + col);
}

export class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.name = this.color + " " + this.type
        this.algebraicNotation = algebraicNotation[this.type];
        this.atInitialPosition = true;
        this.imagePath = this.color + "_" + this.type + ".png";
    }
}

class Cell {
    constructor(type, color, rank, file) {
        this.isEmpty = type === null;
        this.isHighlighted = false;
        this.isUnderAttack = false;
        this.rank = rank;
        this.file = file;
        this.piece = type === null ? null : new Piece(type, color);
        this.highlightImage = "highlight.svg";
        this.underAttackImage = "attack.svg";
    }
}

export const getBoard = () => {
    const board = []
    for(let i = 0; i < 8; i++) {
        let tempArr = []
        for (let j = 0; j < 8; j++) {
            let rank = getRank(i);
            let file = getFile(j);
            if (Object.hasOwn(initialPositions, file + rank)) {
                let { type, color } = initialPositions[file + rank];
                tempArr.push(new Cell(type, color, rank, file))
            } else {
                tempArr.push(new Cell(null, null, rank, file));
            }
        }
        board.push(tempArr)
    }
    return board;
}
