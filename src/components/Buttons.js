import React from 'react';
import { useHistory } from 'react-router';
import styles2 from '../css/button2.module.css';


export const Buttons = (props) => {
    const history = useHistory();

    const handleHome = () => {
        history.push('/');
    }

    const handleNewGame = async () => {
        let game_number = await props.createNewGame();
        history.push(`/live/${game_number}`);
    };

    return (
        <div className={styles2.outerDiv}>

            <button className={styles2.button2} onClick={handleHome}>
                Home
            </button>

            <button className={styles2.button2} onClick={handleNewGame}>
                New Game
            </button>

            <button className={styles2.button2} onClick={props.reverseState}>
                Reverse
            </button>

            <button className={styles2.button2} onClick={props.updateChessSet}>
                {props.chessSet.name} Board
            </button>

        </div>
    )
}
