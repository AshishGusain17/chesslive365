import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import PositionContext from '../../context/position/PositionContext';
import drawStyles from '../../css/drawOffer.module.css';

export default function DrawOffer(props) {
    const context = useContext(PositionContext);
    const location = useLocation();

    const {
        drawOffer2
    } = context;
    let drawOffer = drawOffer2;


    let thirdPerson = 1;
    if (localStorage.getItem('curr')) {
        const game_number_by_id = parseInt(location.pathname.substring(6, 20).trim());
        const game_number_saved = JSON.parse(localStorage.getItem('curr')).game_number;
        if (game_number_by_id === game_number_saved) {
            thirdPerson = 0; 
        }
    }
    

    let ourColor = 2;
    if (localStorage.getItem('curr')) {
        ourColor = JSON.parse(localStorage.getItem('curr')).col;
    }
    if ((ourColor === 1 && drawOffer.black === 1 && thirdPerson === 0)
        || (ourColor === 0 && drawOffer.white === 1 && thirdPerson === 0)) {
        // if ((ourColor === 1)
        // || (ourColor === 0 )) {
        return (
            <>
                <div className={drawStyles.alertStyle}>
                    <span className={drawStyles.spanStyle}>Opponent offered a draw</span>
                    <button className={drawStyles.buttonStyle} onClick={props.disAgreeDraw} >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='37'
                            height='37'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='red'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            style={{ minWidth: 24 }}
                        >
                            <line x1='18' y1='6' x2='6' y2='18' />
                            <line x1='6' y1='6' x2='18' y2='18' />
                        </svg>
                    </button>

                    <button className={drawStyles.buttonStyle} onClick={props.agreeDraw} >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='32'
                            height='32'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='#31B404'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            style={{ minWidth: 24 }}
                        >
                            <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                            <polyline points='22 4 12 14.01 9 11.01' />
                        </svg>
                    </button>
                </div>
            </>
        )
    }
    else {
        return null;
    }
}

