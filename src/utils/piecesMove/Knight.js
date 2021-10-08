// find all possible moves for knight
const findSqs_4_Knight = (allPositions, square_id, turn) => {
    let opponentColor = "";
    // let ourColor = "";
    if (turn === 1) {
        opponentColor = "b";
        // ourColor = "w";
    }
    else {
        opponentColor = "w";
        // ourColor = "b";
    }

    // possibleMoves has all possible squares where knight can move to
    let possibleMoves = [];
    if (square_id === 19 || square_id === 20
        || square_id === 21 || square_id === 22
        || square_id === 27 || square_id === 28
        || square_id === 29 || square_id === 30
        || square_id === 35 || square_id === 36
        || square_id === 37 || square_id === 38
        || square_id === 43 || square_id === 44
        || square_id === 45 || square_id === 46) {
        possibleMoves.push(square_id - 17);
        possibleMoves.push(square_id - 15);
        possibleMoves.push(square_id + 17);
        possibleMoves.push(square_id + 15);
        possibleMoves.push(square_id - 6);
        possibleMoves.push(square_id + 10);
        possibleMoves.push(square_id - 10);
        possibleMoves.push(square_id + 6);
    }
    switch (square_id) {
        case 1: possibleMoves.push(11, 18); break;
        case 2: possibleMoves.push(17, 19, 12); break;
        case 3: possibleMoves.push(9, 13, 18, 20); break;
        case 4: possibleMoves.push(19, 21, 10, 14); break;
        case 5: possibleMoves.push(20, 22, 11, 15); break;
        case 6: possibleMoves.push(21, 23, 12, 16); break;
        case 7: possibleMoves.push(22, 24, 13); break;
        case 8: possibleMoves.push(14, 23); break;
        case 9: possibleMoves.push(3, 19, 26); break;
        case 10: possibleMoves.push(4, 20, 25, 27); break;
        case 11: possibleMoves.push(1, 5, 17, 21, 26, 28); break;
        case 12: possibleMoves.push(2, 6, 18, 22, 27, 29); break;
        case 13: possibleMoves.push(3, 7, 19, 23, 28, 30); break;
        case 14: possibleMoves.push(4, 8, 20, 24, 29, 31); break;
        case 15: possibleMoves.push(5, 21, 30, 32); break;
        case 16: possibleMoves.push(6, 22, 31); break;
        case 17: possibleMoves.push(2, 11, 34, 27); break;
        case 18: possibleMoves.push(1, 3, 33, 35, 12, 28); break;
        case 23: possibleMoves.push(6, 8, 38, 40, 13, 29); break;
        case 24: possibleMoves.push(7, 14, 30, 39); break;
        case 25: possibleMoves.push(10, 19, 35, 42); break;
        case 26: possibleMoves.push(9, 11, 20, 36, 41, 43); break;
        case 31: possibleMoves.push(14, 16, 46, 48, 21, 37); break;
        case 32: possibleMoves.push(15, 22, 38, 47); break;
        case 33: possibleMoves.push(18, 27, 43, 50); break;
        case 34: possibleMoves.push(17, 19, 28, 44, 49, 51); break;
        case 39: possibleMoves.push(22, 24, 54, 56, 29, 45); break;
        case 40: possibleMoves.push(23, 30, 46, 55); break;
        case 41: possibleMoves.push(26, 35, 51, 58); break;
        case 42: possibleMoves.push(25, 27, 36, 52, 57, 59); break;
        case 47: possibleMoves.push(30, 37, 53, 32, 62, 64); break;
        case 48: possibleMoves.push(31, 38, 54, 63); break;
        case 49: possibleMoves.push(34, 43, 59); break;
        case 50: possibleMoves.push(33, 35, 44, 60); break;
        case 51: possibleMoves.push(34, 36, 41, 57, 45, 61); break;
        case 52: possibleMoves.push(35, 37, 42, 58, 46, 62); break;
        case 53: possibleMoves.push(36, 38, 43, 59, 47, 63); break;
        case 54: possibleMoves.push(37, 39, 44, 60, 48, 64); break;
        case 55: possibleMoves.push(38, 40, 45, 61); break;
        case 56: possibleMoves.push(39, 46, 62); break;
        case 57: possibleMoves.push(42, 51); break;
        case 58: possibleMoves.push(41, 43, 52); break;
        case 59: possibleMoves.push(42, 44, 49, 53); break;
        case 60: possibleMoves.push(43, 45, 50, 54); break;
        case 61: possibleMoves.push(44, 46, 51, 55); break;
        case 62: possibleMoves.push(45, 47, 52, 56); break;
        case 63: possibleMoves.push(46, 48, 53); break;
        case 64: possibleMoves.push(47, 54); break;
        default: break;
    }

    let possibleMovesCopy = [...possibleMoves];
    possibleMoves = [];
    for (let ind = 0; ind < possibleMovesCopy.length; ind++) {
        let val = possibleMovesCopy[ind]
        if (allPositions[val] !== "") {
            if (allPositions[val][0] === opponentColor) {
                possibleMoves.push(val);
            }
        }
        else {
            possibleMoves.push(val);
        }
    }
    return possibleMoves;
}




export { findSqs_4_Knight };