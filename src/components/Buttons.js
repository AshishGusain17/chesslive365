import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import PositionContext from '../context/position/PositionContext';
import styles2 from '../css/button2.module.css';
import DrawOffer from './Alerts/DrawOffer';


export const Buttons = (props) => {
    const history = useHistory();
    const location = useLocation();
    const context = useContext(PositionContext);

    const {
        initPosition,
        initGlowSqs,
        initTurn,
        initPieceClicked,
        initEnpassant,
        initCurrPGN,
        initCastlePossible,


        updatePosition1,
        updateGlowSqs1,
        updateTurn1,
        updatePieceClicked1,
        updateEnpassant1,
        updatePGN1,
        updateCastlePossible1,

        gameEnd2, updateGameEnd2, drawOffer2, updateDrawOffer2
    } = context;



    const clearAlert = () => {
        props.nullifyAlert();
    }

    const handleReset = () => {
        updatePosition1(initPosition);
        updateGlowSqs1(initGlowSqs);
        updateTurn1(initTurn);
        updatePieceClicked1(initPieceClicked);
        updateEnpassant1(initEnpassant);
        updatePGN1(initCurrPGN);
        updateCastlePossible1(initCastlePossible);
        clearAlert();
    }

    const handleHome = async () => {
        clearAlert();
        await handleReset();
        history.push('/');
    }

    const handleNewGame = async () => {
        let game_number = await props.createNewGame();
        history.push(`/live/${game_number}`);
        clearAlert();
    };

    const handleDrawOffer = async() => {
        let ourColor = JSON.parse(localStorage.getItem('curr')).col;
        if (ourColor === 1) {
            let drOff = { ...drawOffer2 };
            drOff.white = 1;
            await updateDrawOffer2(drOff);
        }
        else {
            let drOff = { ...drawOffer2 };
            drOff.black = 1;
            await updateDrawOffer2(drOff);
        }
    }


    // gameEnd = 0   ------>   game is going on
    // gameEnd = 1   ------>   checkmate, white wins
    // gameEnd = 2   ------>   checkmate, black wins
    // gameEnd = 3   ------>   stalemate, white has no moves
    // gameEnd = 4   ------>   stalemate, black has no moves
    // gameEnd = 5   ------>   offer a draw accepted
    // gameEnd = 6   ------>   white resigns
    // gameEnd = 7   ------>   black resigns
    // gameEnd = 11  ------>   check to white    
    // gameEnd = 12  ------>   check to black
    // gameEnd = 13  ------>   draw offer rejected by white
    // gameEnd = 14  ------>   draw offer rejected by black
    const handleResign = async() => {
        let ourColor = JSON.parse(localStorage.getItem('curr')).col;
        if (ourColor === 1) {
            await updateGameEnd2(6);
        }
        else {
            await updateGameEnd2(7);
        }
    }




    const agreeDraw = async () => {
        props.alertCall('Game Over', 'Draw accepted', 60000);
        await updateDrawOffer2({ white: 0, black: 0 });
        await updateGameEnd2(5);
    }
    const disAgreeDraw = async () => {
        let ourColor = JSON.parse(localStorage.getItem('curr')).col;
        if (ourColor === 1) {
            console.log('Draw offer rejected by white');
            await props.update_GE_DO(13);
        }
        else {
            console.log('Draw offer rejected by black');
            await props.update_GE_DO(14);
        }
    }

    let thirdPerson = 1;
    if (localStorage.getItem('curr')) {
        const game_number_by_id = parseInt(location.pathname.substring(6, 20).trim());
        const game_number_saved = JSON.parse(localStorage.getItem('curr')).game_number;
        if (game_number_by_id === game_number_saved) {
            thirdPerson = 0;
        }
    }


    return (
        <>
            {location.pathname === '/' ?
                <div className={`${styles2.outerDiv} text-center`}>
                    <button className={styles2.button2} onClick={handleNewGame}>
                        Challenge A Friend
                    </button>
                    <button className={styles2.button2} onClick={props.reverseState}>
                        Reverse Board
                    </button>
                    <button className={styles2.button2} onClick={props.updateChessSet}>
                        {props.chessSet.name} Piece
                    </button>
                    <button className={styles2.button2} onClick={props.updateSqcol}>
                        Change Color
                    </button>
                    <button className={styles2.button2} onClick={handleReset}>
                        Reset Board
                    </button>
                </div>
                :
                <div >
                    <div className={`${styles2.outerDiv} text-center`}>
                        <button className={styles2.button2} onClick={handleHome}>
                            Home
                        </button>
                        <button className={styles2.button2} onClick={props.reverseState}>
                            Reverse
                        </button>
                        <button className={styles2.button2} onClick={props.updateChessSet}>
                            {props.chessSet.name} Piece
                        </button>
                        <button className={styles2.button2} onClick={props.updateSqcol}>
                            Change Color
                        </button>
                        {((gameEnd2 === 0 || gameEnd2 === 11 || gameEnd2 === 12 || gameEnd2 === 13 || gameEnd2 === 14)
                            && thirdPerson === 0) ?
                            (<>
                                <button className={styles2.button2} onClick={handleDrawOffer}>
                                    Offer a draw
                                </button>
                                <button className={styles2.button2} onClick={handleResign}>
                                    Resign
                                </button>
                            </>)
                            : null}
                    </div>
                    <DrawOffer agreeDraw={agreeDraw} disAgreeDraw={disAgreeDraw} />
                </div>

            }
        </>

    )
}
