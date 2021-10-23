import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import PositionContext from '../context/position/PositionContext';
import styles2 from '../css/button2.module.css';


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
        updateCastlePossible1
    } = context;
    const handleReset = () => {
        updatePosition1(initPosition);
        updateGlowSqs1(initGlowSqs);
        updateTurn1(initTurn);
        updatePieceClicked1(initPieceClicked);
        updateEnpassant1(initEnpassant);
        updatePGN1(initCurrPGN);
        updateCastlePossible1(initCastlePossible);
    }

    const handleHome = () => {
        history.push('/');
    }

    const handleNewGame = async () => {
        let game_number = await props.createNewGame();
        history.push(`/live/${game_number}`);
    };



    return (
        <div className={`${styles2.outerDiv} text-center`}>
            {location.pathname === '/' ?
                <>
                    <button className={styles2.button2} onClick={handleNewGame}>
                        Challenge A Friend
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
                    <button className={styles2.button2} onClick={handleReset}>
                        Reset Board
                    </button>
                </>
                : <>
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
                </>
            }
        </div>
    )
}
