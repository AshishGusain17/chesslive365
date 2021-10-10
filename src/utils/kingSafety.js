// this file may changes when you change castleCheck.js or when you change squareClicked() function

import { reversePositionObject } from "./functools";
import { findSqs_4_Bishop } from "./piecesMove/Bishop";
import { findSqs_4_King } from "./piecesMove/King";
import { findSqs_4_Knight } from "./piecesMove/Knight";
import { findSqs_4_Rook } from "./piecesMove/Rook";


// function where we imaginary make the move and send back the imaginary position obtained
const getAllPositionsCopy = (allPositions, turn, pieceClicked, square_id) => {
    let allPositionsCopy = { ...allPositions };

    // if it's a pawn and moving diagonally and in a empty square, than enpassant has happened
    if (pieceClicked.piece[1] === "p" && Math.abs(pieceClicked.sq - square_id) !== 8 && allPositionsCopy[square_id] === "") {
        if (turn === 1) {
            allPositionsCopy[square_id + 8] = "";
        }
        else {
            allPositionsCopy[square_id - 8] = "";
        }
    }

    // castling logic implemented here
    if (pieceClicked.piece === 'wk' && square_id === 59 && allPositions[61] === 'wk' && allPositions['57'] === 'wr') {
        allPositionsCopy[60] = 'wr';
        allPositionsCopy[57] = '';
    }
    else if (pieceClicked.piece === 'wk' && square_id === 63 && allPositions[61] === 'wk' && allPositions['64'] === 'wr') {
        allPositionsCopy[62] = 'wr';
        allPositionsCopy[64] = '';
    }
    else if (pieceClicked.piece === 'bk' && square_id === 3 && allPositions[5] === 'bk' && allPositions['1'] === 'br') {
        allPositionsCopy[4] = 'br';
        allPositionsCopy[1] = '';
    }
    else if (pieceClicked.piece === 'bk' && square_id === 7 && allPositions[5] === 'bk' && allPositions['8'] === 'br') {
        allPositionsCopy[6] = 'br';
        allPositionsCopy[8] = '';
    }

    allPositionsCopy[pieceClicked.sq] = "";
    // promotion of pawn checked
    // as of now, all pawns are getting promoted to queen, promotion to other pieces logic to be implemented later
    if (pieceClicked.piece === 'wp' && square_id <= 8 && square_id >= 1) {
        allPositionsCopy[square_id] = 'wq';
    }
    else if (pieceClicked.piece === 'bp' && square_id <= 64 && square_id >= 57) {
        allPositionsCopy[square_id] = 'bq';
    }
    else {
        allPositionsCopy[square_id] = pieceClicked.piece;
    }

    return allPositionsCopy;
}





// when you get all possible moves for a piece, check whether those moves are possible or not
// basically check whether your king is in check or not if that imaginary move is made
// IMPLEMENTATION: for all possible moves, make them and get the imaginary position and than check whether your king is in check or not 
const checkKingSafety = (allPositions, turn, pieceClicked, possibleMovesCopy) => {
    let possibleMoves = [];

    for (let ind = 0; ind < possibleMovesCopy.length; ind++) {
        let square_id = possibleMovesCopy[ind];
        // imaginary position obtained below in allPositionsCopy variable
        let allPositionsCopy = getAllPositionsCopy(allPositions, turn, pieceClicked, square_id)
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