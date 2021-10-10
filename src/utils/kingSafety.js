// this file may changes when you change castleCheck.js or when you change squareClicked() function

import { getUpdatedMoves, reversePositionObject } from "./functools";
import { findSqs_4_Bishop } from "./piecesMove/Bishop";
import { findSqs_4_King } from "./piecesMove/King";
import { findSqs_4_Knight } from "./piecesMove/Knight";
import { findSqs_4_Rook } from "./piecesMove/Rook";




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
        let oppPiecePossibleMoves, ownKingPos;
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



        oppRookPos.forEach(rookPos => {
            oppPiecePossibleMoves = findSqs_4_Rook(allPositionsCopy, rookPos, opponentTurn);
            oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) })
        });
        // console.log(checkPos);


        oppBishopPos.forEach((bishopPos) => {
            oppPiecePossibleMoves = findSqs_4_Bishop(allPositionsCopy, bishopPos, opponentTurn);
            oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
        });
        // console.log(checkPos);


        oppQueenPos.forEach((queenPos) => {
            oppPiecePossibleMoves = findSqs_4_Rook(allPositionsCopy, queenPos, opponentTurn);
            oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
            oppPiecePossibleMoves = findSqs_4_Bishop(allPositionsCopy, queenPos, opponentTurn);
            oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
        });
        // console.log(checkPos);


        oppKnightPos.forEach((knightPos) => {
            oppPiecePossibleMoves = findSqs_4_Knight(allPositionsCopy, knightPos, opponentTurn)
            oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
        })
        // console.log(checkPos);


        oppPawnPos.forEach((pawnPos) => {
            if (opponentTurn === 0) {
                if ((pawnPos - 1) % 8 === 0) {
                    checkPos.add(pawnPos + 9);
                }
                else if (pawnPos % 8 === 0) {
                    checkPos.add(pawnPos + 7);
                }
                else {
                    checkPos.add(pawnPos + 9);
                    checkPos.add(pawnPos + 7);
                }
            }
            else {
                if ((pawnPos - 1) % 8 === 0) {
                    checkPos.add(pawnPos - 7);
                }
                else if (pawnPos % 8 === 0) {
                    checkPos.add(pawnPos - 9);
                }
                else {
                    checkPos.add(pawnPos - 9);
                    checkPos.add(pawnPos - 7);
                }
            }
        });
        // console.log(checkPos);


        oppKingPos.forEach((kingPos) => {
            oppPiecePossibleMoves = findSqs_4_King(allPositionsCopy, kingPos, opponentTurn);
            oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
        });
        // console.log(checkPos);


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