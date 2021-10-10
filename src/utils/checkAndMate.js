import { findBishopCheckMoves, findKingCheckMoves, findKnightCheckMoves, findPawnCheckMoves, findQueenCheckMoves, findRookCheckMoves, reversePositionObject } from "./functools";



// check whether as soon as the move is made, opponent is in check or not
const funcCheckOrNot = (allPositions, turn) => {
    let revPos = reversePositionObject(allPositions);

    let checkPos = new Set();
    let ownRookPos, ownBishopPos, ownQueenPos, ownKnightPos, ownKingPos, ownPawnPos;
    let oppKingPos;
    if (turn === 1) {
        ownRookPos = revPos['wr'];
        ownBishopPos = revPos['wb'];
        ownQueenPos = revPos['wq'];
        ownKnightPos = revPos['wn'];
        ownKingPos = revPos['wk'];
        ownPawnPos = revPos['wp'];
        oppKingPos = revPos['bk'];
    }
    else {
        ownRookPos = revPos['br'];
        ownBishopPos = revPos['bb'];
        ownQueenPos = revPos['bq'];
        ownKnightPos = revPos['bn'];
        ownKingPos = revPos['bk'];
        ownPawnPos = revPos['bp'];
        oppKingPos = revPos['wk'];
    }


    checkPos = findRookCheckMoves(ownRookPos, allPositions, turn, checkPos);
    checkPos = findBishopCheckMoves(ownBishopPos, allPositions, turn, checkPos);
    checkPos = findQueenCheckMoves(ownQueenPos, allPositions, turn, checkPos);
    checkPos = findKnightCheckMoves(ownKnightPos, allPositions, turn, checkPos);
    checkPos = findPawnCheckMoves(ownPawnPos, allPositions, turn, checkPos);
    checkPos = findKingCheckMoves(ownKingPos, allPositions, turn, checkPos);



    let flag = 0;
    let checkFlag = 1;
    for (let val of checkPos) {
        if (val === oppKingPos[0]) {
            flag = 1;
        }
    }
    if (flag === 0) {
        checkFlag = 0;
    }


    return checkFlag;
}




export { funcCheckOrNot }