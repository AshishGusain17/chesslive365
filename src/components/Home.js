import React, { useContext } from 'react';

import PositionContext from '../context/position/PositionContext';
import styles from '../css/squares.module.css';
import { Square } from './Square';
// import {moves50Check} from '../utils/draw';


import { findSqs_4_BPawn, findSqs_4_WPawn } from '../utils/piecesMove/Pawn';
import { findSqs_4_Bishop } from '../utils/piecesMove/Bishop';
import { findSqs_4_Knight } from '../utils/piecesMove/Knight';
import { findSqs_4_King } from '../utils/piecesMove/King';
import { findSqs_4_Rook } from '../utils/piecesMove/Rook';
import { checkKingSafety } from '../utils/kingSafety';
import { getUpdatedMoves } from '../utils/functools';





export default function Home() {
    const context = useContext(PositionContext);
    const { allPositions, updatePosition,
        initGlowSqs, glowSqs, updateGlowSqs,
        turn, updateTurn,
        pieceClicked, updatePieceClicked,
        enpassant, updateEnpassant,
    } = context;



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





    const squareClicked = (square_id) => {
        // user wants to make a move as he selects a square that was glowing
        if (glowSqs[square_id] === 1) {

            // update moves in allPositionsCopy variable, which will be updated in state
            let allPositionsCopy = getUpdatedMoves(allPositions, square_id, turn, pieceClicked)

            // checking enpassant to be active or not
            if (Math.abs(pieceClicked.sq - square_id) === 16 && pieceClicked.piece[1] === "p") {
                updateEnpassant({ active: 1, sq: square_id });
            }
            else {
                updateEnpassant({ active: 0, sq: -1 });
            }

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
                    let possibleMoves = findSqs_4_WPawn(allPositions, square_id, enpassant);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
                }

                // code if the piece is white bishop
                piece = 'wb';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_Bishop(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
                }

                // code if the piece is white knight
                piece = 'wn';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_Knight(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
                }

                // code if the piece is white rook
                piece = 'wr';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_Rook(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
                }
                // code if the piece is white queen
                piece = 'wq';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_Rook(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    let glow = glowSquares(possibleMoves, initGlowSqs);
                    possibleMoves = findSqs_4_Bishop(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glow = glowSquares(possibleMoves, glow);
                    updateGlowSqs(glow);
                }

                // code if the piece is white king
                piece = 'wk';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_King(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
                }
            }
            else {
                // code if the piece is black pawn
                let piece = 'bp';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_BPawn(allPositions, square_id, enpassant);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
                }

                // code if the piece is black bishop
                piece = 'bb';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_Bishop(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
                }

                // code if the piece is black knight
                piece = 'bn';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_Knight(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
                }
                
                // code if the piece is black rook
                piece = 'br';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_Rook(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
                }

                // code if the piece is black queen
                piece = 'bq';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_Rook(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    let glow = glowSquares(possibleMoves, initGlowSqs);
                    possibleMoves = findSqs_4_Bishop(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glow = glowSquares(possibleMoves, glow);
                    updateGlowSqs(glow);
                }

                // code if the piece is black king
                piece = 'bk';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ sq: square_id, piece: piece });
                    let possibleMoves = findSqs_4_King(allPositions, square_id, turn);
                    possibleMoves = checkKingSafety(allPositions, turn, { sq: square_id, piece: piece }, possibleMoves);
                    glowSquares(possibleMoves);
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