MainContainer:
    Data: 
        - State Variable: matchStatus
        - matchStatus: can be "not-started", "in-progress", "completed"
        - Methods to start and reset the match
    UI: 
        - Welcome Message
        - Buttons to start and reset the match
        - Conditional UI: To Render the board if match is in progress
        
Secondary Container:
    Props: matchStatus
    Data: 
        - State Variables: sideToMove, killedWhitePieces, killedWhitePieces ( maybe killedPieces, just one variable can be used)
        - Methods to update killedWhitePieces, killedBlackPieces, sideToMove
        - ( Needs to fix the killedPieces initial value)
    UI: 
        - Conditional UI
        - 3 Divs: White Info | Board | Black Info

PlayerDetails:
    Props: matchStatus, sideToMove, playerColor, killedPieces
    Data:
        - State Variable: playerTimer
        - Ref: playerRef
        - Methods: 
            - updateTime: When called, adds one second to current time
            - attachTimer: Attaches setInterval which executes the callback function to update time each second
            - detachTimer: detaches setInterval 
            - isTimerAttacked: To check whether timer is attacked or not
            - isMatchOn
            - isCurrentPlayersMove
        - useEffect:
            - Executes on change of matchStatus, sideToMove
        - (Needs to add condition that ends the match when timer runs out)
    UI: 
        - Player color or Name
        - Player Timer
        - Killed Pieces List

Board:
    Props: sideToMove, updateSideToMove, updateKilledBlackPieces, updateKilledWhitePieces, (Match status also needs to be passed)
    Data: 
        - State Variables: board, activePiece
            - Important: For Board Initialization, we are using lazy initialization.
            - useState(() => {return getBoard()} -> by doing this, the function will be executed only once.
            - If useState(getBoard()) is used, then function will be executed on every render even thought state variable will be initialized once
        - Methods:
    UI: 
        - 3 part: RowIndexContainer, Board, ColIndexContainer (RowIndexContainer and ColIndexContainer should be removed)
        - Div: board-container
            - Div: board-grid : map row
                - Div: board-row : map col
                    - Board Cell

BoardCell:
    Props: board, row_index, col_index, handleClick, sideToMove
    Data:
    UI:
        - This is very complex, needs to be changed or written efficiently

