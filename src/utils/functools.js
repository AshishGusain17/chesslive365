import { findSqs_4_Bishop } from "./piecesMove/Bishop";
import { findSqs_4_King } from "./piecesMove/King";
import { findSqs_4_Knight } from "./piecesMove/Knight";
import { findSqs_4_BPawn, findSqs_4_WPawn } from "./piecesMove/Pawn";
import { findSqs_4_Rook } from "./piecesMove/Rook";






// convert allPositions object from (square: piece) ---> (piece: square)
const reversePositionObject = (pos) => {
    let revPos = { 'br': [], 'wr': [], 'bb': [], 'wb': [], 'bq': [], 'wq': [], 'bn': [], 'wn': [], 'bp': [], 'wp': [], 'bk': [], 'wk': [] };
    for (const [key, value] of Object.entries(pos)) {
        if (value !== "") {
            revPos[value].push(parseInt(key));
        }
    }
    return revPos;
}

















const getUpdatedMoves = (allPositions, square_id, turn, pieceClicked) => {
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






















const findRookCheckMoves = (oppRookPos, allPositionsCopy, opponentTurn, checkPos) => {
    let oppPiecePossibleMoves;
    oppRookPos.forEach(rookPos => {
        oppPiecePossibleMoves = findSqs_4_Rook(allPositionsCopy, rookPos, opponentTurn);
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) })
    });
    // console.log(checkPos);
    return checkPos;
}

const findBishopCheckMoves = (oppBishopPos, allPositionsCopy, opponentTurn, checkPos) => {
    let oppPiecePossibleMoves;
    oppBishopPos.forEach((bishopPos) => {
        oppPiecePossibleMoves = findSqs_4_Bishop(allPositionsCopy, bishopPos, opponentTurn);
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
    });
    // console.log(checkPos);
    return checkPos;
}

const findQueenCheckMoves = (oppQueenPos, allPositionsCopy, opponentTurn, checkPos) => {
    let oppPiecePossibleMoves;
    oppQueenPos.forEach((queenPos) => {
        oppPiecePossibleMoves = findSqs_4_Rook(allPositionsCopy, queenPos, opponentTurn);
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
        oppPiecePossibleMoves = findSqs_4_Bishop(allPositionsCopy, queenPos, opponentTurn);
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
    });
    // console.log(checkPos);
    return checkPos;
}

const findKnightCheckMoves = (oppKnightPos, allPositionsCopy, opponentTurn, checkPos) => {
    let oppPiecePossibleMoves;
    oppKnightPos.forEach((knightPos) => {
        oppPiecePossibleMoves = findSqs_4_Knight(allPositionsCopy, knightPos, opponentTurn)
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
    })
    // console.log(checkPos);
    return checkPos;
}




const findKingCheckMoves = (oppKingPos, allPositionsCopy, opponentTurn, checkPos) => {
    let oppPiecePossibleMoves;
    oppKingPos.forEach((kingPos) => {
        oppPiecePossibleMoves = findSqs_4_King(allPositionsCopy, kingPos, opponentTurn);
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
    });
    // console.log(checkPos);
    return checkPos;
}


// function which find all the squares where opponent king can't move with repect to all pawns
const findPawnCheckMoves = (oppPawnPos, allPositionsCopy, opponentTurn, checkPos) => {
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
    return checkPos;
}



// function which finds all the squares where all the pawns can make a move
const findPawnAllPossibleMoves = (oppPawnPos, allPositionsCopy, opponentTurn, checkPos, enpassant) => {
    let oppPiecePossibleMoves;
    oppPawnPos.forEach((pawnPos) => {
        if(opponentTurn===0){
            oppPiecePossibleMoves = findSqs_4_BPawn(allPositionsCopy, pawnPos, enpassant);
        }
        else{
            oppPiecePossibleMoves = findSqs_4_WPawn(allPositionsCopy, pawnPos, enpassant);
        }
        oppPiecePossibleMoves.forEach((ele) => { checkPos.add(ele) });
    });
    // console.log(checkPos);
    return checkPos;
}











export {
    reversePositionObject,
    getUpdatedMoves,
    findRookCheckMoves,
    findBishopCheckMoves,
    findQueenCheckMoves,
    findKnightCheckMoves,
    findPawnCheckMoves,
    findKingCheckMoves,
    findPawnAllPossibleMoves
}
