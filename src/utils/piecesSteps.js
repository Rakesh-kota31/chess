export const steps = {
    king: [
        {
            "name": "left",
            "left": [[0, -1]]
        },
        {
            "name": "right",
            "right": [[0, 1]]
        },
        {
            "name": "top",
            "top": [[1, 0]]
        },
        {
            "name": "bottom",
            "bottom": [[-1, 0]]
        },
        {
            "name": "top-left",
            "top-left": [[-1, -1]]
        },
        {
            "name": "top-right",
            "top-right": [[-1, +1]]
        },
        {
            "name": "bottom-left",
            "bottom-left": [[+1, +1]]
        },
        {
            "name": "bottom-right",
            "bottom-right": [[+1, -1]]
        }
    ],
    queen: [
        {
            "name": "bottom",
            "bottom": [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]],
        },
        {
            "name": "top",
            "top": [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]
        },
        {
            "name": "left",
            "left": [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]
        },
        {
            "name": "right",
            "right": [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]]
        },
        {
            "name": "top-left",
            "top-left": [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]]
        },
        {
            "name": "top-right",
            "top-right": [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]]
        },
        {
            "name": "bottom-left",
            "bottom-left": [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]]
        },
        {
            "name": "bottom-right",
            "bottom-right": [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, -5], [-6, -6], [-7, -7]]
        }
    ],
    bishop: [
        {
            "name": "top-left",
            "top-left": [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]]
        },
        {
            "name": "top-right",
            "top-right": [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]]
        },
        {
            "name": "bottom-left",
            "bottom-left": [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]]
        },
        {
            "name": "bottom-right",
            "bottom-right": [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]]
        }
    ],
    knight: [
        {
            "name": "top-left1",
            "top-left1": [[1, -2]],
        },
        {
            "name": "top-left2",
            "top-left2": [[2, -1]],
        },
        {
            "name": "top-right2",
            "top-right2": [[2, 1]]
        },
        {
            "name": "top-right1",
            "top-right1": [[1, 2]]
        },
        {
            "name": "bottom-right1",
            "bottom-right1": [[-1, 2]]
        },
        {
            "name": "bottom-right2",
            "bottom-right2": [[-2, -1]]
        },
        {
            "name": "bottom-left2",
            "bottom-left2": [[-2, 1]]
        },
        {
            "name": "bottom-left1",
            "bottom-left1": [[-1, -2]]
        }
    ],
    rook: [
        {
            "name": "bottom",
            "bottom": [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]],
        },
        {
            "name": "top",
            "top": [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]
        },
        {
            "name": "left",
            "left": [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]
        },
        {
            "name": "right",
            "right": [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]]
        }
    ],
    pawn: {
        "white": {
            initialRow: 6,
            initialMoves: [[-1, 0], [-2, 0]],
            attackMoves: [[-1, -1], [-1, 1]],
            normalMoves: [[-1, 0]]
        },
        "black": {
            initialRow: 1,
            initialMoves: [[1, 0], [2, 0]],
            attackMoves: [[1, -1], [1, 1]],
            normalMoves: [[1, 0]]
        }
    }
}
