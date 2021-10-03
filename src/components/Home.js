import React, { useContext } from 'react';

import PositionContext from '../context/position/PositionContext';
import styles from '../css/squares.module.css';
import { Square } from './Square';

export default function Home(props) {
    const context = useContext(PositionContext);
    const { allPositions, updatePosition,
        initGlowSqs, glowSqs, updateGlowSqs,
        turn, updateTurn,
        pieceClicked, updatePieceClicked,
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

    const glowSquares = (possibleMoves) => {
        const copyGlowSqs = { ...initGlowSqs };
        for (let ind = 0; ind < possibleMoves.length; ind++) {
            copyGlowSqs[possibleMoves[ind]] = 1;
        }
        updateGlowSqs(copyGlowSqs);
    }


    const findPawnSquares = async (square_id, turn) => {
        // possibleMoves has all possible squares where a pawn can move to
        let possibleMoves = [];

        //for white pawn
        if (turn === 1) {
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
        }
        // for black pawn
        else {
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
        }

        glowSquares(possibleMoves);

        // enpasssant logic left
        // king check is still left(checkKingSafety function to implement)
    }




    const squareClicked = (square_id) => {
        // user wants to make a move as he selects a square that was glowing
        if (glowSqs[square_id] === 1) {
            // 
            let allPositionsCopy = { ...allPositions };
            allPositionsCopy[pieceClicked.num] = "";
            allPositionsCopy[square_id] = pieceClicked.piece;
            updatePosition(allPositionsCopy);
            updateGlowSqs(initGlowSqs);
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
                // code if the piece is pawn
                let piece = 'wp';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ num: square_id, piece: piece });
                    findPawnSquares(square_id, turn);
                }

            }
            else {
                // code if the piece is pawn
                let piece = 'bp';
                if (allPositions[square_id] === piece) {
                    updatePieceClicked({ num: square_id, piece: piece });
                    findPawnSquares(square_id, turn);
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