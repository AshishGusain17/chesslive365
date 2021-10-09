import { castleCheck } from '../castle';

//find all possible moves for king
const findSqs_4_King = (allPositions, square_id, turn) => {
    let opponentColor = "";
    if (turn === 1) {
        opponentColor = "b";
    }
    else {
        opponentColor = "w";
    }

    // possibleMoves has all possible squares where king can move to
    let possibleMoves = [];

    switch (square_id) {
        case 1: possibleMoves.push(2, 9, 10); break;
        case 2: possibleMoves.push(1, 3, 9, 10, 11); break;
        case 3: possibleMoves.push(2, 4, 10, 11, 12); break;
        case 4: possibleMoves.push(3, 5, 11, 12, 13); break;
        case 5: possibleMoves.push(4, 6, 12, 13, 14); break;
        case 6: possibleMoves.push(5, 7, 13, 14, 15); break;
        case 7: possibleMoves.push(6, 8, 14, 15, 16); break;
        case 8: possibleMoves.push(7, 15, 16); break;
        case 9: possibleMoves.push(1, 2, 10, 17, 18); break;
        case 16: possibleMoves.push(7, 8, 15, 23, 24); break;
        case 17: possibleMoves.push(9, 10, 18, 25, 26); break;
        case 24: possibleMoves.push(15, 16, 23, 31, 32); break;
        case 25: possibleMoves.push(17, 18, 26, 33, 34); break;
        case 32: possibleMoves.push(23, 24, 31, 39, 40); break;
        case 33: possibleMoves.push(25, 26, 34, 41, 42); break;
        case 40: possibleMoves.push(31, 32, 39, 47, 48); break;
        case 41: possibleMoves.push(33, 34, 42, 49, 50); break;
        case 48: possibleMoves.push(39, 40, 47, 55, 56); break;
        case 49: possibleMoves.push(41, 42, 50, 57, 58); break;
        case 56: possibleMoves.push(47, 48, 55, 63, 64); break;
        case 57: possibleMoves.push(49, 50, 58); break;
        case 58: possibleMoves.push(57, 49, 50, 51, 59); break;
        case 59: possibleMoves.push(58, 50, 51, 52, 60); break;
        case 60: possibleMoves.push(59, 51, 52, 53, 61); break;
        case 61: possibleMoves.push(60, 52, 53, 54, 62); break;
        case 62: possibleMoves.push(61, 53, 54, 55, 63); break;
        case 63: possibleMoves.push(62, 54, 55, 56, 64); break;
        case 64: possibleMoves.push(63, 55, 56); break;
        default: possibleMoves.push(square_id - 9, square_id - 8, square_id - 7,
            square_id - 1, square_id + 1,
            square_id + 7, square_id + 8, square_id + 9); break;
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

    let {queenSideCastleFlag, kingSideCastleFlag} = castleCheck(allPositions, turn);
    // console.log('queen side: ',queenSideCastleFlag);
    // console.log('king side: ', kingSideCastleFlag);
    return possibleMoves;
}


export { findSqs_4_King }; 