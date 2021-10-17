import React, { useContext, useState } from 'react';
import PositionContext from '../context/position/PositionContext';
import Navbar from './Navbar';

import { checkKingSafety } from '../utils/kingSafety';
import { getUpdatedMoves } from '../utils/functools';
import { funcCheckOrNot } from '../utils/checkAndMate';
import { funcDraw_Stalemate } from '../utils/draw';
import { ChessBoard } from './ChessBoard';
import { ChessBoardReverse } from './ChessBoardReverse';


import { findSqs_4_BPawn, findSqs_4_WPawn } from '../utils/piecesMove/Pawn';
import { findSqs_4_Bishop } from '../utils/piecesMove/Bishop';
import { findSqs_4_Knight } from '../utils/piecesMove/Knight';
import { findSqs_4_King } from '../utils/piecesMove/King';
import { findSqs_4_Rook } from '../utils/piecesMove/Rook';


export default function Home(props) {
    const context = useContext(PositionContext);

    const {
        initGlowSqs,
        allPositions1, updatePosition1,
        glowSqs1, updateGlowSqs1,
        turn1, updateTurn1,
        pieceClicked1, updatePieceClicked1,
        enpassant1, updateEnpassant1,

        createNewGame
    } = context;


    const allPositions = allPositions1;
    const updatePosition = updatePosition1;
    const glowSqs = glowSqs1;
    const updateGlowSqs = updateGlowSqs1;
    const turn = turn1
    const updateTurn = updateTurn1
    const pieceClicked = pieceClicked1
    const updatePieceClicked = updatePieceClicked1
    const enpassant = enpassant1
    const updateEnpassant = updateEnpassant1





    const glowSquares = async (possibleMoves, glow) => {
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
            await updateGlowSqs(copyGlowSqs);
        }
    }





    const squareClicked = async (square_id) => {
        // user wants to make a move as he selects a square that was glowing
        if (glowSqs[square_id] === 1) {
            let opponentTurn;
            if (turn === 1) {
                opponentTurn = 0;
            }
            else {
                opponentTurn = 1;
            }

            // update moves in allPositionsCopy variable, which will be updated in state
            let allPositionsCopy = await getUpdatedMoves(allPositions, square_id, turn, pieceClicked)

            // checking enpassant to be active or not
            let enpassantObj = {}
            if (Math.abs(pieceClicked.sq - square_id) === 16 && pieceClicked.piece[1] === "p") {
                enpassantObj.active = 1;
                enpassantObj.sq = square_id;
            }
            else {
                enpassantObj.active = 0;
                enpassantObj.sq = -1;
            }
            await updateEnpassant(enpassantObj);
            await updatePosition(allPositionsCopy);
            await updateGlowSqs(initGlowSqs);


            // sending allPositionsCopy variable to all below functions as state takes time to update(async)
            if (turn === 1) {

                // you find all of your pieces moves, and then check whether opponent king is in any of those squares
                let checkFlag = await funcCheckOrNot(allPositionsCopy, turn);

                // you find all your opponent moves, if he has even one, then there is no stalemate
                let stalemateFlag = await funcDraw_Stalemate(allPositionsCopy, opponentTurn, enpassantObj);

                if (checkFlag === 1 && stalemateFlag === 1) {
                    props.alertCall('Checkmate', 'White wins');
                }
                else if (checkFlag === 1) {
                    props.alertCall('Check', 'to black');
                }
                else if (stalemateFlag === 1) {
                    props.alertCall('Stalemate', 'Black has no moves');
                };
            }
            else {
                // sending allPositionsCopy variable as state takes time to update(async)
                let checkFlag = await funcCheckOrNot(allPositionsCopy, turn);
                let stalemateFlag = await funcDraw_Stalemate(allPositionsCopy, opponentTurn, enpassantObj);

                if (checkFlag === 1 && stalemateFlag === 1) {
                    props.alertCall('Checkmate', 'Black wins');
                }
                else if (checkFlag === 1) {
                    props.alertCall('Check', 'to white');
                }
                else if (stalemateFlag === 1) {
                    props.alertCall('Stalemate', 'White has no moves');
                };
            }

            await updateTurn(opponentTurn);



            // funcDraw_50MoveRule();
            // funcDraw_3FoldRepetition();
            // funcDraw_NotEnoughMaterial();

        }

        // user wants to see all possible moves for that piece clicked
        else {
            // code for white's turn
            if (turn === 1) {
                // code if the piece is white pawn
                let piece = 'wp';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_WPawn(allPositions, square_id, enpassant);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }

                // code if the piece is white bishop
                piece = 'wb';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_Bishop(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }

                // code if the piece is white knight
                piece = 'wn';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_Knight(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }

                // code if the piece is white rook
                piece = 'wr';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_Rook(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }
                // code if the piece is white queen
                piece = 'wq';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_Rook(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    let glow = await glowSquares(possibleMoves, initGlowSqs);
                    possibleMoves = await findSqs_4_Bishop(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glow = await glowSquares(possibleMoves, glow);
                    await updateGlowSqs(glow);
                }

                // code if the piece is white king
                piece = 'wk';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_King(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }
            }
            else {
                // code if the piece is black pawn
                let piece = 'bp';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_BPawn(allPositions, square_id, enpassant);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }

                // code if the piece is black bishop
                piece = 'bb';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_Bishop(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }

                // code if the piece is black knight
                piece = 'bn';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_Knight(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }

                // code if the piece is black rook
                piece = 'br';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_Rook(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }

                // code if the piece is black queen
                piece = 'bq';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_Rook(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    let glow = await glowSquares(possibleMoves, initGlowSqs);
                    possibleMoves = await findSqs_4_Bishop(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glow = await glowSquares(possibleMoves, glow);
                    await updateGlowSqs(glow);
                }

                // code if the piece is black king
                piece = 'bk';
                if (allPositions[square_id] === piece) {
                    await updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = await findSqs_4_King(allPositions, square_id, turn);
                    possibleMoves = await checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    await glowSquares(possibleMoves);
                }
            }
        }
    }


    let initReverse1 = 1;
    const [reverse1, updateReverse1] = useState(initReverse1);
    const reverseState = () => {
        if (reverse1 === 1) {
            updateReverse1(0);
        }
        else {
            updateReverse1(1);
        }
    }


    return (
        <>
            <Navbar createNewGame={createNewGame} reverseState={reverseState} />
            {reverse1 ? (<ChessBoard home_1_or_live_2={1} squareClicked={squareClicked} />) :
                        <ChessBoardReverse home_1_or_live_2={1} squareClicked={squareClicked} />}
        </>
    )
}