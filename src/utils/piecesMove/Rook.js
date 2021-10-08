// find all possible moves for rook
const findSqs_4_Rook = (allPositions, square_id, turn) => {
    let opponentColor = "";
    if (turn === 1) {
        opponentColor = "b";
    }
    else {
        opponentColor = "w";
    }

    // possibleMoves has all possible squares where rook can move to
    let possibleMoves = [];
    let val = square_id;
    for (let ind = 0; ind <= 9; ind++) {
        if (val >= 57 && val <= 64) {
            break;
        }
        else {
            val = val + 8;
            if (allPositions[val] !== "") {
                if (allPositions[val][0] === opponentColor) {
                    possibleMoves.push(val);
                    break;
                }
                else {
                    break;
                }
            }
            else {
                possibleMoves.push(val);
            }
        }
    }

    val = square_id;
    for (let ind = 0; ind <= 9; ind++) {
        if (val >= 1 && val <= 8) {
            break;
        }
        else {
            val = val - 8;
            if (allPositions[val] !== "") {
                if (allPositions[val][0] === opponentColor) {
                    possibleMoves.push(val);
                    break;
                }
                else {
                    break;
                }
            }
            else {
                possibleMoves.push(val);
            }
        }
    }

    val = square_id;
    for (let ind = 0; ind <= 9; ind++) {
        if (val % 8 === 0) {
            break;
        }
        else {
            val = val + 1;
            if (allPositions[val] !== "") {
                if (allPositions[val][0] === opponentColor) {
                    possibleMoves.push(val);
                    break;
                }
                else {
                    break;
                }
            }
            else {
                possibleMoves.push(val);
            }
        }
    }

    val = square_id;
    for (let ind = 0; ind <= 9; ind++) {
        if (val % 8 === 1) {
            break;
        }
        else {
            val = val - 1;
            if (allPositions[val] !== "") {
                if (allPositions[val][0] === opponentColor) {
                    possibleMoves.push(val);
                    break;
                }
                else {
                    break;
                }
            }
            else {
                possibleMoves.push(val);
            }
        }
    }

    return possibleMoves;


}






export { findSqs_4_Rook };