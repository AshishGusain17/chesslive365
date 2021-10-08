// find all possible moves for white pawn 
const findSqs_4_WPawn = (allPositions, square_id, enpassant) => {
    // possibleMoves has all possible squares where white pawn can move to
    let possibleMoves = [];

    if (square_id >= 49) {
        possibleMoves.push(square_id - 8);
        possibleMoves.push(square_id - 16);
    }
    else {
        possibleMoves.push(square_id - 8);
    }

    let opponentColor = 'b';
    let ourColor = 'w';
    if (square_id % 8 === 1) {
        possibleMoves.push(square_id - 7);
    }
    else if (square_id % 8 === 0) {
        possibleMoves.push(square_id - 9);
    }
    else {
        possibleMoves.push(square_id - 9);
        possibleMoves.push(square_id - 7);
    }



    let sqToRemove = new Set();
    for (let ind = 0; ind < possibleMoves.length; ind++) {
        let sq = possibleMoves[ind];

        // possible move is out of the box
        if (sq < 1) {
            sqToRemove.add(sq)
        }
        // possible move is to take a piece in north-east direction(that square should have opponent piece)
        else if (Math.abs(sq - square_id) === 7) {
            if (allPositions[sq] === "" || allPositions[sq][0] === ourColor) {
                sqToRemove.add(sq);
            }
        }
        // possible move is to take a piece in north-west direction(that square should have opponent piece)
        else if (Math.abs(sq - square_id) === 9) {
            if (allPositions[sq] === "" || allPositions[sq][0] === ourColor) {
                sqToRemove.add(sq);
            }
        }
        // possible move is only if north direction square is empty for 1 step(that square should be empty)
        else if (Math.abs(sq - square_id) === 8) {
            if (allPositions[sq][0] === opponentColor || allPositions[sq][0] === ourColor) {
                sqToRemove.add(sq);
            }
        }
        // possible move is only if north direction squares are empty for 2 steps(those 2 squares should be empty)
        else if (Math.abs(sq - square_id) === 16) {
            if (allPositions[sq][0] === opponentColor || allPositions[sq][0] === ourColor
                || allPositions[sq + 8][0] === opponentColor || allPositions[sq + 8][0] === ourColor) {
                sqToRemove.add(sq);
            }
        }
    }

    for (let val of sqToRemove) {
        possibleMoves.splice(possibleMoves.indexOf(val), 1);
    }


    // enpassant check 
    if (enpassant.active === 1) {
        if (enpassant.sq === 25 && square_id === 26) {
            possibleMoves.push(enpassant.sq - 8);
        }
        else if (26 <= enpassant.sq && enpassant.sq <= 31 && Math.abs(square_id - enpassant.sq) === 1) {
            possibleMoves.push(enpassant.sq - 8);
        }
        else if (enpassant.sq === 32 && square_id === 31) {
            possibleMoves.push(enpassant.sq - 8);
        }
    }

    return possibleMoves;
}
















// find all possible squares where black pawn can move 
const findSqs_4_BPawn = (allPositions, square_id, enpassant) => {
    // possibleMoves has all possible squares where black pawn can move to
    let possibleMoves = [];

    if (square_id <= 16) {
        possibleMoves.push(square_id + 8);
        possibleMoves.push(square_id + 16);
    }
    else {
        possibleMoves.push(square_id + 8);
    }

    let opponentColor = 'w';
    let ourColor = 'b';
    if (square_id % 8 === 1) {
        possibleMoves.push(square_id + 9);
    }
    else if (square_id % 8 === 0) {
        possibleMoves.push(square_id + 7);
    }
    else {
        possibleMoves.push(square_id + 9);
        possibleMoves.push(square_id + 7);
    }

    let sqToRemove = new Set();
    for (let ind = 0; ind < possibleMoves.length; ind++) {
        let sq = possibleMoves[ind];
        // possible move is out of the box
        if (sq > 64) {
            sqToRemove.add(sq)
        }
        // possible move is to take a piece in south-east direction(that square should have opponent piece)
        else if (Math.abs(sq - square_id) === 9) {
            if (allPositions[sq] === "" || allPositions[sq][0] === ourColor) {
                sqToRemove.add(sq);
            }
        }
        // possible move is to take a piece in south-west direction(that square should have opponent piece)
        else if (Math.abs(sq - square_id) === 7) {
            if (allPositions[sq] === "" || allPositions[sq][0] === ourColor) {
                sqToRemove.add(sq);
            }
        }
        // possible move is only if north direction square is empty for 1 step(that square should be empty)
        else if (Math.abs(sq - square_id) === 8) {
            if (allPositions[sq][0] === opponentColor || allPositions[sq][0] === ourColor) {
                sqToRemove.add(sq);
            }
        }
        // possible move is only if north direction squares are empty for 2 steps(those 2 squares should be empty)
        else if (Math.abs(sq - square_id) === 16) {
            if (allPositions[sq][0] === opponentColor || allPositions[sq][0] === ourColor
                || allPositions[sq - 8][0] === opponentColor || allPositions[sq - 8][0] === ourColor) {
                sqToRemove.add(sq);
            }
        }
    }

    for (let val of sqToRemove) {
        possibleMoves.splice(possibleMoves.indexOf(val), 1);
    }

    // enpassant check 
    if (enpassant.active === 1) {
        if (enpassant.sq === 33 && square_id === 34) {
            possibleMoves.push(enpassant.sq + 8);
        }
        else if (34 <= enpassant.sq && enpassant.sq <= 39 && Math.abs(square_id - enpassant.sq) === 1) {
            possibleMoves.push(enpassant.sq + 8);
        }
        else if (enpassant.sq === 32 && square_id === 31) {
            possibleMoves.push(enpassant.sq + 8);
        }
    }
    return possibleMoves;
}





export { findSqs_4_WPawn, findSqs_4_BPawn }






