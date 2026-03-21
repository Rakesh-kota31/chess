
Game Started ->

Timers needs to be initialized →
    
    White's timer needs to be started,
    White's chance to move ->
        White selects one of it's piece to move ->
            When white selects a piece, we need to check what type of piece is it:
            King:   
                1) Normal moves and needs to check if castling chance is there or not
            Pawn:   
                1) if it is at initial square, then it can move 2 places forward, else 1 place forward
                2) Attack positions, which are diagonal positions
                3) Pawn promotion: if pawn reached opponent's end, then need to show option to select a piece from Queen, Bishop, Horse or Rook
                4) En passant:
                    - if in earlier move, opponent moved their pawn 2 places forward
                    - and landed beside our pawn,
                    - if both of the above conditions are true, then highlight en passant optio
            Remaining pieces: Normal moves only
            
            - We know which piece and possible attacking or moving positions, now show only those positions
            - which won't put our king under check or checkmate if moved
            - How to do that?   
            - For every possible moving position or direction of selected piece, move that piece there
            - and run isKingUnderCheck function:
            - if it returns True, then we cannot move our piece in that direction
            - else we can move selected piece 
            - optimizations, we will do later
            
            Now white has moved it's piece, so resume white's timer and start black's timer
            
    Now Black's chance to move,
    But before this, we need to check 3 conditions or cases,
    
    if black king is under check or not
        -> is under check
            -> need to check if this is checkmate
                -> checkmate logic, i still haven't thought
                    -> if yes, then white wins
                    -> if no, black con only move pieces to positions which will defend his king
        -> No king is not under check
        -> needs to check if this is stalemate
            -> if yes, them game is draw
            -> no, then black can move any pieces
    
    Other possible outcomes are also present, but for now, let's just stick with these? like Threefold repetition
    
    Now black needs to move
    same again like white:
    can we just create 1 function for both White and Black?
    Let's just build the function?




















