import React, { useContext, useEffect, useRef, useState } from 'react';
import PositionContext from '../context/position/PositionContext';
import Navbar from './Navbar';

import { checkKingSafety } from '../utils/kingSafety';
import { getUpdatedMoves } from '../utils/functools';
import { funcCheckOrNot } from '../utils/checkAndMate';
import { funcDraw_Stalemate } from '../utils/draw';
import { ChessBoard } from './ChessBoard';


import { findSqs_4_BPawn, findSqs_4_WPawn } from '../utils/piecesMove/Pawn';
import { findSqs_4_Bishop } from '../utils/piecesMove/Bishop';
import { findSqs_4_Knight } from '../utils/piecesMove/Knight';
import { findSqs_4_King } from '../utils/piecesMove/King';
import { findSqs_4_Rook } from '../utils/piecesMove/Rook';
import { useHistory, useLocation } from 'react-router';
import { ChessBoardReverse } from './ChessBoardReverse';
import { Buttons } from './Buttons';


export default function Live(props) {
    const context = useContext(PositionContext);
    const history = useHistory();

    const {
        initGlowSqs,
        allPositions2, updatePosition2,
        glowSqs2, updateGlowSqs2,
        turn2, updateTurn2,
        pieceClicked2, updatePieceClicked2,
        enpassant2, updateEnpassant2,

        createNewGame, getLiveGame, confirm2ndPlayer
    } = context;


    const allPositions = allPositions2;
    const updatePosition = updatePosition2;
    const glowSqs = glowSqs2;
    const updateGlowSqs = updateGlowSqs2;
    const turn = turn2;
    const updateTurn = updateTurn2;
    const pieceClicked = pieceClicked2;
    const updatePieceClicked = updatePieceClicked2;
    const enpassant = enpassant2;
    const updateEnpassant = updateEnpassant2;




    let location = useLocation();
    useEffect(() => {
        async function performLiveCall() {
            if (location.pathname === '/live') {
                history.push('/');
            }
            else if (location.pathname.length > 5 && location.pathname.substring(0, 6) === '/live/') {
                let flag = await getLiveGame(location.pathname.substring(6, 20));
                // if the url game_number provided does not exists in the database.....means there is no such live game
                if (!flag) {
                    history.push('/');
                }
                else {
                    if (localStorage.getItem('curr')) {
                        const game_number_by_id = parseInt(location.pathname.substring(6, 20).trim());
                        const game_number_saved = JSON.parse(localStorage.getItem('curr')).game_number;
                        await confirm2ndPlayer(game_number_by_id, game_number_saved);
                    }
                    else {
                        // IF WE ARE FIRST TIME VISITING SITE, AND STORAGE IS CLEAN:
                        // since it is checked at the backend and confirmed whether you are the creator of this game,
                        // so to prove that wrong, we are passing a random data
                        let random_number = 121212121221212121212;
                        await confirm2ndPlayer(location.pathname.substring(6, 20), random_number);
                    }
                }
            }
            else {
                history.push('/');
            }
        }
        performLiveCall();
        // eslint-disable-next-line
    }, [])






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



    function useInterval(callback, delay) {
        const savedCallback = useRef();
        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }



    const squareClickedColor = (square_id) => {
        let flagMatch = 0;
        if (localStorage.getItem('curr')) {
            const game_number_by_id = parseInt(location.pathname.substring(6, 20).trim());
            const game_number_saved = JSON.parse(localStorage.getItem('curr')).game_number;
            if (game_number_by_id === game_number_saved) {
                flagMatch = 1;
            }
            // console.log("flagMatch: ",flagMatch);
            console.log("Move: ", turn);
            console.log("You: ", JSON.parse(localStorage.getItem('curr')).col);
            if (turn === parseInt(JSON.parse(localStorage.getItem('curr')).col) && flagMatch === 1) {
                squareClicked(square_id);
            }
        }
    }



    let [count, setCount] = useState(0);
    useInterval(async () => {
        let flag = await getLiveGame(location.pathname.substring(6, 20));
        if (!flag) {
            history.push('/');
        }
        // console.log(count);
        setCount(count + 1);
    }, 500);


    const [reverse2, updateReverse2] = useState(1);
    const reverseState = () => {
        if (reverse2 === 1) {
            updateReverse2(0);
        }
        else {
            updateReverse2(1);
        }
    }


    let initChessSet2 = { ind: 3, name: 'Marble' };
    const [chessSet2, setchessSet2] = useState(initChessSet2);
    const updateChessSet = () => {
        switch (chessSet2.ind) {
            case 1: return setchessSet2({ ind: 2, name: 'Graffiti' });
            case 2: return setchessSet2({ ind: 3, name: 'Marble' });
            case 3: return setchessSet2({ ind: 4, name: 'Metal' });
            case 4: return setchessSet2({ ind: 5, name: 'Neo' });
            case 5: return setchessSet2({ ind: 1, name: 'Gothic' });
            default: return;
        }
    }

    let initSqCol2 = 1;
    const [sqCol2, setSqCol2] = useState(initSqCol2);
    const updateSqcol = () => {
        switch (sqCol2) {
            case 1: return setSqCol2(2);
            case 2: return setSqCol2(3);
            case 3: return setSqCol2(4);
            case 4: return setSqCol2(5);
            case 5: return setSqCol2(1);
            default: return;
        }
    }
    return (
        <>
            <Navbar createNewGame={createNewGame} reverseState={reverseState} updateChessSet={updateChessSet} chessSet={chessSet2} />

            {reverse2 ? (<ChessBoard home_1_or_live_2={2} squareClicked={squareClickedColor} chessSet={chessSet2} sqCol={sqCol2} />) :
                <ChessBoardReverse home_1_or_live_2={2} squareClicked={squareClickedColor} chessSet={chessSet2} sqCol={sqCol2} />}

            <Buttons createNewGame={createNewGame} reverseState={reverseState}
                updateChessSet={updateChessSet} chessSet={chessSet2}
                updateSqcol={updateSqcol} />
        </>
    )

}