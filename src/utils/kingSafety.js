// this file may changes when you change castleCheck.js or when you change squareClicked() function

import { findBishopCheckMoves, findKingCheckMoves, findKnightCheckMoves, findPawnCheckMoves, findQueenCheckMoves, findRookCheckMoves, getUpdatedMoves, reversePositionObject } from "./functools";




// when you get all possible moves for a piece, check whether those moves are possible or not
// basically check whether your king is in check or not if that imaginary move is made
// IMPLEMENTATION: for all possible moves, make them and get the imaginary position and than check whether your king is in check or not 
const checkKingSafety = (allPositions, turn, pieceClicked, possibleMovesCopy) => {
    let possibleMoves = [];

    for (let ind = 0; ind < possibleMovesCopy.length; ind++) {
        let square_id = possibleMovesCopy[ind];
        // imaginary position obtained below in allPositionsCopy variable
        let allPositionsCopy = getUpdatedMoves(allPositions, square_id, turn, pieceClicked)
        let revPos = reversePositionObject(allPositionsCopy);

        let checkPos = new Set();
        let opponentTurn;
        let oppRookPos, oppBishopPos, oppQueenPos, oppKnightPos, oppKingPos, oppPawnPos;
        let ownKingPos;
        if (turn === 1) {
            opponentTurn = 0;
            oppRookPos = revPos['br'];
            oppBishopPos = revPos['bb'];
            oppQueenPos = revPos['bq'];
            oppKnightPos = revPos['bn'];
            oppKingPos = revPos['bk'];
            oppPawnPos = revPos['bp'];
            ownKingPos = revPos['wk'];
        }
        else {
            opponentTurn = 1;
            oppRookPos = revPos['wr'];
            oppBishopPos = revPos['wb'];
            oppQueenPos = revPos['wq'];
            oppKnightPos = revPos['wn'];
            oppKingPos = revPos['wk'];
            oppPawnPos = revPos['wp'];
            ownKingPos = revPos['bk'];
        }


        checkPos = findRookCheckMoves(oppRookPos, allPositionsCopy, opponentTurn, checkPos);
        checkPos = findBishopCheckMoves(oppBishopPos, allPositionsCopy, opponentTurn, checkPos);
        checkPos = findQueenCheckMoves(oppQueenPos, allPositionsCopy, opponentTurn, checkPos);
        checkPos = findKnightCheckMoves(oppKnightPos, allPositionsCopy, opponentTurn, checkPos);
        checkPos = findPawnCheckMoves(oppPawnPos, allPositionsCopy, opponentTurn, checkPos);
        checkPos = findKingCheckMoves(oppKingPos, allPositionsCopy, opponentTurn, checkPos);



        let flag = 0;
        for (let val of checkPos) {
            if (val === ownKingPos[0]) {
                flag = 1;
            }
        }
        if (flag === 0) {
            possibleMoves.push(square_id);
        }
    }

    return possibleMoves;
}

export { checkKingSafety }