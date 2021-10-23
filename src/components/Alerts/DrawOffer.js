import React, { useContext } from 'react';
import PositionContext from '../../context/position/PositionContext';

export default function DrawOffer(props) {
    const context = useContext(PositionContext);
    const {
        drawOffer2
    } = context;
    let drawOffer = drawOffer2;


    const alertStyle = {
        backgroundColor: '#198754',
        color: 'white',
        textTransform: 'uppercase',
        borderRadius: '3px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
        fontFamily: 'Arial',
        width: '300px',
        height: '57px',
        boxSizing: 'border-box',
        margin: '0 auto',
        position: 'fixed',
        left: '0',
        right: '0',
    }
    const buttonStyle = {
        cursor: 'pointer',
        color: '#FFFFFF',
        paddingTop: "2px"
    }
    const spanStyle = {
        fontWeight: "900px",
        color: "#fff700",
        fontSize: "15px"
    }

    let ourColor = JSON.parse(localStorage.getItem('curr')).col;
    if ((ourColor === 1 && drawOffer.black === 1)
        || (ourColor === 0 && drawOffer.white === 1)) {
        return (
            <>
                <div style={{ ...alertStyle }}>
                    <span style={{ ...spanStyle }}>Opponent offered a draw</span>
                    <button onClick={props.disAgreeDraw} style={buttonStyle}>
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

                    <button style={buttonStyle} onClick={props.agreeDraw} >
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
                </div>)
            </>
        )
    }
    else {
        return null;
    }
}

