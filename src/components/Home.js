import React, { useContext } from 'react';

import PositionContext from '../context/position/PositionContext';
import styles from '../css/squares.module.css';
import { Square } from './Square';
// import {moves50Check} from '../utils/draw';
import { castleCheck } from '../utils/castle';

export default function Home(props) {
    const context = useContext(PositionContext);
    const { allPositions, updatePosition,
        initGlowSqs, glowSqs, updateGlowSqs,
        turn, updateTurn,
        pieceClicked, updatePieceClicked,
        enpassant, updateEnpassant,
    } = context;


    // const getCurrPosition = () => {
    //     var singleArray = [];
    //     for (let ind = 1; ind <= 64; ind++) {
    //         singleArray.push(allPositions[ind]);
    //     }
    //     let currPosition = []
    //     let currRow = []
    //     for (let ind = 0; ind < 64; ind++) {
    //         currRow.push(singleArray[ind]);
    //         if (ind % 8 === 7 && currRow.length !== 0) {
    //             currPosition.push(currRow);
    //             currRow = [];
    //         }
    //     }
    //     return currPosition;
    // }

    const glowSquares = (possibleMoves, glow) => {
        // for queen(since it includes moves of bishop and rook) 
        // 2 function one by one gets executed for moves of queen, so copyGlow has to be returned
        if (glow) {
            let copyGlow = { ...glow };
            for (let ind = 0; ind < possibleMoves.length; ind++) {
                copyGlow[possibleMoves[ind]] = 1;
            }
            return copyGlow;
        }
        // for all pieces other than queen
        else {
            const copyGlowSqs = { ...initGlowSqs };
            for (let ind = 0; ind < possibleMoves.length; ind++) {
                copyGlowSqs[possibleMoves[ind]] = 1;
            }
            updateGlowSqs(copyGlowSqs);
        }
    }





    // const checkKingSafety = (piece, square_id, possibleMoves) => {
    //     console.log(piece, square_id, possibleMoves);
    //     let possibleMovesCopy = [...possibleMoves];
    //     possibleMoves = [];
    //     for (let ind = 0; ind < possibleMovesCopy.length; ind++) {
    //         let currMove = possibleMovesCopy[ind];
    //         let allPositionsCopy = { ...allPositions };
    //         let checkOrNot = false;

    //         // if it's a pawn and moving diagonally and in a empty square, than enpassant has happened
    //         if (piece[1] === "p" && Math.abs(currMove - square_id) !== 8 && allPositionsCopy[square_id] === "") {
    //             if (turn === 1) {
    //                 allPositionsCopy[square_id + 8] = "";
    //             }
    //             else {
    //                 allPositionsCopy[square_id - 8] = "";
    //             }
    //         }
    //         allPositionsCopy[square_id] = "";
    //         allPositionsCopy[currMove] = piece;

    //         // finding if in this particular position(allPositionsCopy), whether the king is in check or not
    //         if (turn === 1) {
    //             let revPos = reversePositionObject(allPositionsCopy);
    //             let kingPos = revPos['wk'][0];
    //             if(revPos['br'].length===2){
    //                 let rook1Pos = revPos['br'][0];
    //                 if((Math.abs(rook1Pos)-kingPos)%8===0){
    //                     if(rook1Pos>kingPos){

    //                     }
    //                     else{

    //                     }
    //                 }
    //                 let rook2Pos = revPos['br'][1];
    //             }
    //             else if(revPos['br'].length===1){
    //                 let rook1Pos = revPos['br'][0];

    //             }
    //         }
    //     }
    // }




    // find all possible moves for white pawn 
    const findSqs_4_WPawn = (square_id) => {
        // possibleMoves has all possible squares where white pawn can move to
        let possibleMoves = [];

        if (square_id >= 49) {
            possibleMoves.push(square_id - 8);
            possibleMoves.push(square_id - 16);
        }
        else {
            possibleMoves.push(square_id - 8);
        }

        let opponentColor = 'b';
        let ourColor = 'w';
        if (square_id % 8 === 1) {
            possibleMoves.push(square_id - 7);
        }
        else if (square_id % 8 === 0) {
            possibleMoves.push(square_id - 9);
        }
        else {
            possibleMoves.push(square_id - 9);
            possibleMoves.push(square_id - 7);
        }



        let sqToRemove = new Set();
        for (let ind = 0; ind < possibleMoves.length; ind++) {
            let sq = possibleMoves[ind];

            // possible move is out of the box
            if (sq < 1) {
                sqToRemove.add(sq)
            }
            // possible move is to take a piece in north-east direction(that square should have opponent piece)
            else if (Math.abs(sq - square_id) === 7) {
                if (allPositions[sq] === "" || allPositions[sq][0] === ourColor) {
                    sqToRemove.add(sq);
                }
            }
            // possible move is to take a piece in north-west direction(that square should have opponent piece)
            else if (Math.abs(sq - square_id) === 9) {
                if (allPositions[sq] === "" || allPositions[sq][0] === ourColor) {
                    sqToRemove.add(sq);
                }
            }
            // possible move is only if north direction square is empty for 1 step(that square should be empty)
            else if (Math.abs(sq - square_id) === 8) {
                if (allPositions[sq][0] === opponentColor || allPositions[sq][0] === ourColor) {
                    sqToRemove.add(sq);
                }
            }
            // possible move is only if north direction squares are empty for 2 steps(those 2 squares should be empty)
            else if (Math.abs(sq - square_id) === 16) {
                if (allPositions[sq][0] === opponentColor || allPositions[sq][0] === ourColor
                    || allPositions[sq + 8][0] === opponentColor || allPositions[sq + 8][0] === ourColor) {
                    sqToRemove.add(sq);
                }
            }
        }

        for (let val of sqToRemove) {
            possibleMoves.splice(possibleMoves.indexOf(val), 1);
        }


        // enpassant check 
        if (enpassant.active === 1) {
            if (enpassant.sq === 25 && square_id === 26) {
                possibleMoves.push(enpassant.sq - 8);
            }
            else if (26 <= enpassant.sq && enpassant.sq <= 31 && Math.abs(square_id - enpassant.sq) === 1) {
                possibleMoves.push(enpassant.sq - 8);
            }
            else if (enpassant.sq === 32 && square_id === 31) {
                possibleMoves.push(enpassant.sq - 8);
            }
        }

        glowSquares(possibleMoves);
    }

    

    // find all possible squares where black pawn can move 
    const findSqs_4_BPawn = (square_id) => {
        // possibleMoves has all possible squares where black pawn can move to
        let possibleMoves = [];

        if (square_id <= 16) {
            possibleMoves.push(square_id + 8);
            possibleMoves.push(square_id + 16);
        }
        else {
            possibleMoves.push(square_id + 8);
        }

        let opponentColor = 'w';
        let ourColor = 'b';
        if (square_id % 8 === 1) {
            possibleMoves.push(square_id + 9);
        }
        else if (square_id % 8 === 0) {
            possibleMoves.push(square_id + 7);
        }
        else {
            possibleMoves.push(square_id + 9);
            possibleMoves.push(square_id + 7);
        }

        let sqToRemove = new Set();
        for (let ind = 0; ind < possibleMoves.length; ind++) {
            let sq = possibleMoves[ind];
            // possible move is out of the box
            if (sq > 64) {
                sqToRemove.add(sq)
            }
            // possible move is to take a piece in south-east direction(that square should have opponent piece)
            else if (Math.abs(sq - square_id) === 9) {
                if (allPositions[sq] === "" || allPositions[sq][0] === ourColor) {
                    sqToRemove.add(sq);
                }
            }
            // possible move is to take a piece in south-west direction(that square should have opponent piece)
            else if (Math.abs(sq - square_id) === 7) {
                if (allPositions[sq] === "" || allPositions[sq][0] === ourColor) {
                    sqToRemove.add(sq);
                }
            }
            // possible move is only if north direction square is empty for 1 step(that square should be empty)
            else if (Math.abs(sq - square_id) === 8) {
                if (allPositions[sq][0] === opponentColor || allPositions[sq][0] === ourColor) {
                    sqToRemove.add(sq);
                }
            }
            // possible move is only if north direction squares are empty for 2 steps(those 2 squares should be empty)
            else if (Math.abs(sq - square_id) === 16) {
                if (allPositions[sq][0] === opponentColor || allPositions[sq][0] === ourColor
                    || allPositions[sq - 8][0] === opponentColor || allPositions[sq - 8][0] === ourColor) {
                    sqToRemove.add(sq);
                }
            }
        }

        for (let val of sqToRemove) {
            possibleMoves.splice(possibleMoves.indexOf(val), 1);
        }

        // enpassant check 
        if (enpassant.active === 1) {
            if (enpassant.sq === 33 && square_id === 34) {
                possibleMoves.push(enpassant.sq + 8);
            }
            else if (34 <= enpassant.sq && enpassant.sq <= 39 && Math.abs(square_id - enpassant.sq) === 1) {
                possibleMoves.push(enpassant.sq + 8);
            }
            else if (enpassant.sq === 32 && square_id === 31) {
                possibleMoves.push(enpassant.sq + 8);
            }
        }
        glowSquares(possibleMoves);
    }










    // find all possible moves for bishops 
    const findSqs_4_Bishop = (square_id, turn, glow_2) => {
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
        return glowSquares(possibleMoves, glow_2);
    }






    //find all possible moves for knight
    const findSqs_4_Knight = (square_id, turn) => {
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
        glowSquares(possibleMoves);
    }



    //find all possible moves for rook
    const findSqs_4_Rook = (square_id, turn, glow_1) => {
        let opponentColor = "";
        if (turn === 1) {
            opponentColor = "b";
        }
        else {
            opponentColor = "w";
        }

        // possibleMoves has all possible squares where rook can move to
        let possibleMoves = [];
        let val = square_id;
        for (let ind = 0; ind <= 9; ind++) {
            if (val >= 57 && val <= 64) {
                break;
            }
            else {
                val = val + 8;
                if (allPositions[val] !== "") {
                    if (allPositions[val][0] === opponentColor) {
                        possibleMoves.push(val);
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
                    possibleMoves.push(val);
                }
            }
        }

        val = square_id;
        for (let ind = 0; ind <= 9; ind++) {
            if (val >= 1 && val <= 8) {
                break;
            }
            else {
                val = val - 8;
                if (allPositions[val] !== "") {
                    if (allPositions[val][0] === opponentColor) {
                        possibleMoves.push(val);
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
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
                val = val + 1;
                if (allPositions[val] !== "") {
                    if (allPositions[val][0] === opponentColor) {
                        possibleMoves.push(val);
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
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
                val = val - 1;
                if (allPositions[val] !== "") {
                    if (allPositions[val][0] === opponentColor) {
                        possibleMoves.push(val);
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
                    possibleMoves.push(val);
                }
            }
        }
        return glowSquares(possibleMoves, glow_1);
    }







    //find all possible moves for king
    const findSqs_4_King = (square_id, turn) => {
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
        castleCheck(allPositions, turn);
        glowSquares(possibleMoves)
    }

    const squareClicked = (square_id) => {
        // user wants to make a move as he selects a square that was glowing
        if (glowSqs[square_id] === 1) {
            let allPositionsCopy = { ...allPositions };

            // checking enpassant to be active or not
            if (Math.abs(pieceClicked.sq - square_id) === 16 && pieceClicked.piece[1] === "p") {
                updateEnpassant({ active: 1, sq: square_id });
            }
            else {
                updateEnpassant({ active: 0, sq: -1 });
            }
            // if it's a pawn and moving diagonally and in a empty square, than enpassant has happened
            if (pieceClicked.piece[1] === "p" && Math.abs(pieceClicked.sq - square_id) !== 8 && allPositionsCopy[square_id] === "") {
                if (turn === 1) {
                    allPositionsCopy[square_id + 8] = "";
                }
                else {
                    allPositionsCopy[square_id - 8] = "";
                }

            }
            allPositionsCopy[pieceClicked.sq] = "";
            allPositionsCopy[square_id] = pieceClicked.piece;
            updatePosition(allPositionsCopy);
            updateGlowSqs(initGlowSqs);

            //checking whether 50 moves without pawn move or piece take has happened
            // moves50Check(allPositionsCopy);

            if (turn === 1) {
                updateTurn(0);
            }
            else {
                updateTurn(1);
            }
        }

        // user wants to see all possible moves for that piece clicked
        else {
            // code for white's turn
            if (turn === 1) {
                // code if the piece is white pawn
                let piece = 'wp';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_WPawn(square_id);
                }

                // code if the piece is white bishop
                piece = 'wb';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_Bishop(square_id, turn);
                }

                // code if the piece is white knight
                piece = 'wn';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_Knight(square_id, turn);
                }

                // code if the piece is white rook
                piece = 'wr';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_Rook(square_id, turn);
                }
                // code if the piece is white queen
                piece = 'wq';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let glow_1 = initGlowSqs;
                    let glow_2 = findSqs_4_Rook(square_id, turn, glow_1);
                    let glow = findSqs_4_Bishop(square_id, turn, glow_2);
                    updateGlowSqs(glow);
                }

                // code if the piece is white king
                piece = 'wk';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_King(square_id, turn);
                }
            }
            else {
                // code if the piece is black pawn
                let piece = 'bp';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_BPawn(square_id);
                }

                // code if the piece is black bishop
                piece = 'bb';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_Bishop(square_id, turn);
                }

                // code if the piece is black knight
                piece = 'bn';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_Knight(square_id, turn);
                }
                // code if the piece is black rook
                piece = 'br';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_Rook(square_id, turn);
                }

                // code if the piece is black queen
                piece = 'bq';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let glow_1 = initGlowSqs;
                    let glow_2 = findSqs_4_Rook(square_id, turn, glow_1);
                    let glow = findSqs_4_Bishop(square_id, turn, glow_2);
                    updateGlowSqs(glow);
                }

                // code if the piece is black king
                piece = 'bk';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    findSqs_4_King(square_id, turn);
                }
            }

        }

    }



    return (
        < div className="flex-container1">
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={1} squareClicked={squareClicked} />
                <Square ind={2} squareClicked={squareClicked} />
                <Square ind={3} squareClicked={squareClicked} />
                <Square ind={4} squareClicked={squareClicked} />
                <Square ind={5} squareClicked={squareClicked} />
                <Square ind={6} squareClicked={squareClicked} />
                <Square ind={7} squareClicked={squareClicked} />
                <Square ind={8} squareClicked={squareClicked} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={9} squareClicked={squareClicked} />
                <Square ind={10} squareClicked={squareClicked} />
                <Square ind={11} squareClicked={squareClicked} />
                <Square ind={12} squareClicked={squareClicked} />
                <Square ind={13} squareClicked={squareClicked} />
                <Square ind={14} squareClicked={squareClicked} />
                <Square ind={15} squareClicked={squareClicked} />
                <Square ind={16} squareClicked={squareClicked} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={17} squareClicked={squareClicked} />
                <Square ind={18} squareClicked={squareClicked} />
                <Square ind={19} squareClicked={squareClicked} />
                <Square ind={20} squareClicked={squareClicked} />
                <Square ind={21} squareClicked={squareClicked} />
                <Square ind={22} squareClicked={squareClicked} />
                <Square ind={23} squareClicked={squareClicked} />
                <Square ind={24} squareClicked={squareClicked} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={25} squareClicked={squareClicked} />
                <Square ind={26} squareClicked={squareClicked} />
                <Square ind={27} squareClicked={squareClicked} />
                <Square ind={28} squareClicked={squareClicked} />
                <Square ind={29} squareClicked={squareClicked} />
                <Square ind={30} squareClicked={squareClicked} />
                <Square ind={31} squareClicked={squareClicked} />
                <Square ind={32} squareClicked={squareClicked} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={33} squareClicked={squareClicked} />
                <Square ind={34} squareClicked={squareClicked} />
                <Square ind={35} squareClicked={squareClicked} />
                <Square ind={36} squareClicked={squareClicked} />
                <Square ind={37} squareClicked={squareClicked} />
                <Square ind={38} squareClicked={squareClicked} />
                <Square ind={39} squareClicked={squareClicked} />
                <Square ind={40} squareClicked={squareClicked} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={41} squareClicked={squareClicked} />
                <Square ind={42} squareClicked={squareClicked} />
                <Square ind={43} squareClicked={squareClicked} />
                <Square ind={44} squareClicked={squareClicked} />
                <Square ind={45} squareClicked={squareClicked} />
                <Square ind={46} squareClicked={squareClicked} />
                <Square ind={47} squareClicked={squareClicked} />
                <Square ind={48} squareClicked={squareClicked} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={49} squareClicked={squareClicked} />
                <Square ind={50} squareClicked={squareClicked} />
                <Square ind={51} squareClicked={squareClicked} />
                <Square ind={52} squareClicked={squareClicked} />
                <Square ind={53} squareClicked={squareClicked} />
                <Square ind={54} squareClicked={squareClicked} />
                <Square ind={55} squareClicked={squareClicked} />
                <Square ind={56} squareClicked={squareClicked} />
            </div>
            <div className={`flex-container2 ${styles.wrappper}`}>
                <Square ind={57} squareClicked={squareClicked} />
                <Square ind={58} squareClicked={squareClicked} />
                <Square ind={59} squareClicked={squareClicked} />
                <Square ind={60} squareClicked={squareClicked} />
                <Square ind={61} squareClicked={squareClicked} />
                <Square ind={62} squareClicked={squareClicked} />
                <Square ind={63} squareClicked={squareClicked} />
                <Square ind={64} squareClicked={squareClicked} />
            </div>

        </div>

    )
}