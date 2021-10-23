import { reversePositionObject } from "./functools";
import { checkKingSafety } from "./kingSafety";
import { findSqs_4_Bishop } from "./piecesMove/Bishop";
import { findSqs_4_King } from "./piecesMove/King";
import { findSqs_4_Knight } from "./piecesMove/Knight";
import { findSqs_4_BPawn, findSqs_4_WPawn } from "./piecesMove/Pawn";
import { findSqs_4_Rook } from "./piecesMove/Rook";




const funcDraw_Stalemate = (allPositions, opponentTurn, enpassant) => {
    let revPos = reversePositionObject(allPositions);

    let possibleMoves, piece;
    let stalemateFlag = 1;

    let oppRookPos, oppBishopPos, oppQueenPos, oppKnightPos, oppKingPos, oppPawnPos;
    if (opponentTurn === 1) {
        oppRookPos = revPos['wr'];
        oppBishopPos = revPos['wb'];
        oppQueenPos = revPos['wq'];
        oppKnightPos = revPos['wn'];
        oppKingPos = revPos['wk'];
        oppPawnPos = revPos['wp'];
    }
    else {
        oppRookPos = revPos['br'];
        oppBishopPos = revPos['bb'];
        oppQueenPos = revPos['bq'];
        oppKnightPos = revPos['bn'];
        oppKingPos = revPos['bk'];
        oppPawnPos = revPos['bp'];
    }


    if (opponentTurn === 1) { piece = 'wr' }
    else { piece = 'br' }
    for (let ind = 0; ind < oppRookPos.length; ind++) {
        let rookPos = oppRookPos[ind];
        possibleMoves = findSqs_4_Rook(allPositions, rookPos, opponentTurn);
        possibleMoves = checkKingSafety(allPositions, opponentTurn, { sq: rookPos, piece: piece }, possibleMoves);
        if (possibleMoves.length > 0) {
            stalemateFlag = 0;
            break;
        }
    }
    

    if (opponentTurn === 1) { piece = 'wb' }
    else { piece = 'bb' }
    for (let ind = 0; ind < oppBishopPos.length; ind++) {
        let bishopPos = oppBishopPos[ind];
        possibleMoves = findSqs_4_Bishop(allPositions, bishopPos, opponentTurn);
        possibleMoves = checkKingSafety(allPositions, opponentTurn, { sq: bishopPos, piece: piece }, possibleMoves);
        if (possibleMoves.length > 0) {
            stalemateFlag = 0;
            break;
        }
    }

    if (opponentTurn === 1) { piece = 'wq' }
    else { piece = 'bq' }
    for (let ind = 0; ind < oppQueenPos.length; ind++) {
        let queenPos = oppQueenPos[ind];
        let possibleMoves = findSqs_4_Rook(allPositions, queenPos, opponentTurn);
        possibleMoves = checkKingSafety(allPositions, opponentTurn, { sq: queenPos, piece: piece }, possibleMoves);
        if (possibleMoves.length > 0) {
            stalemateFlag = 0;
            break;
        }

        possibleMoves = findSqs_4_Bishop(allPositions, queenPos, opponentTurn);
        possibleMoves = checkKingSafety(allPositions, opponentTurn, { sq: queenPos, piece: piece }, possibleMoves);
        if (possibleMoves.length > 0) {
            stalemateFlag = 0;
            break;
        }
    }

    if (opponentTurn === 1) { piece = 'wn' }
    else { piece = 'bn' }
    for (let ind = 0; ind < oppKnightPos.length; ind++) {
        let knightPos = oppKnightPos[ind];
        possibleMoves = findSqs_4_Knight(allPositions, knightPos, opponentTurn);
        possibleMoves = checkKingSafety(allPositions, opponentTurn, { sq: knightPos, piece: piece }, possibleMoves);
        if (possibleMoves.length > 0) {
            stalemateFlag = 0;
            break;
        }
    }

    if (opponentTurn === 1) { piece = 'wk' }
    else { piece = 'bk' }
    for (let ind = 0; ind < oppKingPos.length; ind++) {
        let kingPos = oppKingPos[ind];
        possibleMoves = findSqs_4_King(allPositions, kingPos, opponentTurn,{ wkside: 0, wqside: 0, bkside: 0, bqside: 0});
        possibleMoves = checkKingSafety(allPositions, opponentTurn, { sq: kingPos, piece: piece }, possibleMoves);
        if (possibleMoves.length > 0) {
            stalemateFlag = 0;
            break;
        }
    }

    if (opponentTurn === 1) {
        let pawnPos;
        piece = 'wp'
        for (let ind = 0; ind < oppPawnPos.length; ind++) {
            pawnPos = oppPawnPos[ind];
            possibleMoves = findSqs_4_WPawn(allPositions, pawnPos, enpassant);
            possibleMoves = checkKingSafety(allPositions, opponentTurn, { sq: pawnPos, piece: piece }, possibleMoves);
            if (possibleMoves.length > 0) {
                stalemateFlag = 0;
                break;
            }
        }
    }
    else {
        let pawnPos;
        piece = 'bp'
        for (let ind = 0; ind < oppPawnPos.length; ind++) {
            pawnPos = oppPawnPos[ind];
            possibleMoves = findSqs_4_BPawn(allPositions, pawnPos, enpassant);
            possibleMoves = checkKingSafety(allPositions, opponentTurn, { sq: pawnPos, piece: piece }, possibleMoves);
            if (possibleMoves.length > 0) {
                stalemateFlag = 0;
                break;
            }
        }

    }


    return stalemateFlag;
}






const moves50Check = () => {
    console.log('inside func 50');
}



export { moves50Check, funcDraw_Stalemate }