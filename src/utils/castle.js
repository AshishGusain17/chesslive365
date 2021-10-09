// check whether king and rook have not moved throughout the game.....logic left to implement


import { findSqs_4_Bishop } from './piecesMove/Bishop';
import { findSqs_4_Knight } from './piecesMove/Knight';
import { findSqs_4_Rook } from './piecesMove/Rook';

import { reversePositionObject } from "./functools";





const validCastle = (allPositions, oppPawnPos, oppKingPos, checkPos, kingPawnChecks, emptySq, checkSq) => {
    let flag = 1;

    //check whether these positions in emptySq are all empty or not
    for (let ind = 0; ind < emptySq.length; ind++) {
        let ele = emptySq[ind];
        if (allPositions[ele] !== '') {
            flag = 0;
        }
    };

    // check whether opponent's rook, bishop, king, knight are blocking our king or squares where our king can move
    for (let val of checkPos) {
        for (let ind = 0; ind < checkSq.length; ind++) {
            let ele = checkSq[ind];
            if (val === ele) {
                flag = 0;
            }
        }
    }

    // check whether opponent's pawn is blocking our king or squares where our king can move
    for (let ind1 = 0; ind1 < oppPawnPos.length; ind1++) {
        let pawnPos = oppPawnPos[ind1];
        for (let ind2 = 0; ind2 < kingPawnChecks.length; ind2++) {
            let ele = kingPawnChecks[ind2];
            if (pawnPos === ele) {
                flag = 0;
            }
        }
    }

    // check whether opponent's king is blocking our king or squares where our king can move
    for (let ind1 = 0; ind1 < oppKingPos.length; ind1++) {
        let kingPos = oppKingPos[ind1];
        for (let ind2 = 0; ind2 < kingPawnChecks.length; ind2++) {
            let ele = kingPawnChecks[ind2];
            if (kingPos === ele) {
                flag = 0;
            }
        }
    }

    return flag
}




const castleCheck = (allPositions, turn) => {
    let revPos = reversePositionObject(allPositions);
    // console.log(revPos);

    let checkPos = new Set();

    let queenSideCastleFlag = 1;
    let kingSideCastleFlag = 1;
    let opponentTurn = -1;
    let oppRookPos, oppBishopPos, oppQueenPos, oppKnightPos, oppKingPos, oppPawnPos;
    let oppPiecePossibleMoves;
    if (turn === 1) {
        opponentTurn = 0;
        oppRookPos = revPos['br'];
        oppBishopPos = revPos['bb'];
        oppQueenPos = revPos['bq'];
        oppKnightPos = revPos['bn'];
        oppKingPos = revPos['bk'];
        oppPawnPos = revPos['bp'];
    }
    else {
        opponentTurn = 1;
        oppRookPos = revPos['wr'];
        oppBishopPos = revPos['wb'];
        oppQueenPos = revPos['wq'];
        oppKnightPos = revPos['wn'];
        oppKingPos = revPos['wk'];
        oppPawnPos = revPos['wp'];
    }



    oppRookPos.forEach(rookPos => {
        oppPiecePossibleMoves = findSqs_4_Rook(allPositions, rookPos, opponentTurn);
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) })
    });
    // console.log(checkPos);


    oppBishopPos.forEach((bishopPos) => {
        oppPiecePossibleMoves = findSqs_4_Bishop(allPositions, bishopPos, opponentTurn);
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
    });
    // console.log(checkPos);


    oppQueenPos.forEach((queenPos) => {
        oppPiecePossibleMoves = findSqs_4_Rook(allPositions, queenPos, opponentTurn);
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
        oppPiecePossibleMoves = findSqs_4_Bishop(allPositions, queenPos, opponentTurn);
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
    });
    // console.log(checkPos);


    oppKnightPos.forEach((knightPos) => {
        oppPiecePossibleMoves = findSqs_4_Knight(allPositions, knightPos, opponentTurn)
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
    })
    // console.log(checkPos);



    // WHAT BELOW VARIABLE DENOTES:
    // emptySq ---> which squares should be empty during castle
    // checkSq ---> which squares should not be in check during castle 
    // checkPos ---> squares where opponent's rook, bishop, king, knight can attack
    // kingPawnChecks ---> which squares where opponent's king and pawn should not be there during castle  


    //castle possiblity for white king
    if (turn === 1) {
        //queen side castle
        if (allPositions[61] === 'wk' && allPositions[57] === 'wr') {
            let emptySq = [58, 59, 60];
            let checkSq = [59, 60, 61];
            let kingPawnChecks = [50, 51, 52, 53, 54];
            queenSideCastleFlag = validCastle(allPositions, oppPawnPos, oppKingPos, checkPos, kingPawnChecks, emptySq, checkSq);
        }
        else {
            queenSideCastleFlag = 0;
        }
        //king side castle
        if (allPositions[61] === 'wk' && allPositions[64] === 'wr') {
            let emptySq = [62, 63];
            let checkSq = [61, 62, 63];
            let kingPawnChecks = [52, 53, 54, 55, 56];
            kingSideCastleFlag = validCastle(allPositions, oppPawnPos, oppKingPos, checkPos, kingPawnChecks, emptySq, checkSq);
        }
        else {
            kingSideCastleFlag = 0;
        }
    }

    //castle possiblity for black king 
    else {
        // queen side castle
        if (allPositions[5] === 'bk' && allPositions[1] === 'br') {
            let emptySq = [2, 3, 4];
            let checkSq = [3, 4, 5];
            let kingPawnChecks = [10, 11, 12, 13, 14];
            queenSideCastleFlag = validCastle(allPositions, oppPawnPos, oppKingPos, checkPos, kingPawnChecks, emptySq, checkSq);
        }
        else {
            queenSideCastleFlag = 0;
        }
        //king side castle
        if (allPositions[5] === 'bk' && allPositions[8] === 'br') {
            let emptySq = [6, 7];
            let checkSq = [5, 6, 7];
            let kingPawnChecks = [12, 13, 14, 15, 16];
            kingSideCastleFlag = validCastle(allPositions, oppPawnPos, oppKingPos, checkPos, kingPawnChecks, emptySq, checkSq);
        }
        else {
            kingSideCastleFlag = 0;
        }
    }

    return { queenSideCastleFlag, kingSideCastleFlag }
}

export { castleCheck }

