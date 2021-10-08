// find all possible moves for bishops 
const findSqs_4_Bishop = (allPositions, square_id, turn) => {
    // let opponentColor = "";
    let ourColor = "";
    if (turn === 1) {
        // opponentColor = "b";
        ourColor = "w";
    }
    else {
        // opponentColor = "w";
        ourColor = "b";
    }

    // possibleMoves has all possible squares where a bishop can move to
    let possibleMoves = [];
    let val = square_id;
    for (let ind = 0; ind <= 9; ind++) {
        if (val % 8 === 0) {
            break;
        }
        else {
            val = val - 7;
            if (val <= 0) {
                break;
            }
            else {
                if (allPositions[val] !== "") {
                    if (allPositions[val][0] === ourColor) {
                        break;
                    }
                    else {
                        possibleMoves.push(val);
                        break;
                    }
                }
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
            val = val - 9;
            if (val <= 0) {
                break;
            }
            else {
                if (allPositions[val] !== "") {
                    if (allPositions[val][0] === ourColor) {
                        break;
                    }
                    else {
                        possibleMoves.push(val);
                        break;
                    }
                }
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
            val = val + 7;
            if (val > 64) {
                break;
            }
            else {
                if (allPositions[val] !== "") {
                    if (allPositions[val][0] === ourColor) {
                        break;
                    }
                    else {
                        possibleMoves.push(val);
                        break;
                    }
                }
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
            val = val + 9;
            if (val > 64) {
                break;
            }
            else {
                if (allPositions[val] !== "") {
                    if (allPositions[val][0] === ourColor) {
                        break;
                    }
                    else {
                        possibleMoves.push(val);
                        break;
                    }
                }
                possibleMoves.push(val);
            }
        }
    }

    return possibleMoves;
}





export { findSqs_4_Bishop }