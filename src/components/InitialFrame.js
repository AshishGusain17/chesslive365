import React, { useContext } from 'react'
import { useLocation } from 'react-router'
import Home from './Home';
import Navbar from './Navbar';
import PositionContext from '../context/position/PositionContext';

export const InitialFrame = (props) => {
    let location = useLocation();

    const context = useContext(PositionContext);
    const {
        allPositions1, updatePosition1,
        glowSqs1, updateGlowSqs1,
        turn1, updateTurn1,
        pieceClicked1, updatePieceClicked1,
        enpassant1, updateEnpassant1,
        currPGN1, updatePGN1,

        allPositions2, updatePosition2,
        glowSqs2, updateGlowSqs2,
        turn2, updateTurn2,
        pieceClicked2, updatePieceClicked2,
        enpassant2, updateEnpassant2,
        currPGN2, updatePGN2,

        createNewGame
    } = context;


    return (
        <>
            <Navbar createNewGame={createNewGame} />
            {location.pathname === '/live' ?
                (<Home home_1_or_live_2={2}
                    alertCall={props.alertCall}
                    allPositions={allPositions2}
                    updatePosition={updatePosition2}
                    glowSqs={glowSqs2}
                    updateGlowSqs={updateGlowSqs2}
                    turn={turn2}
                    updateTurn={updateTurn2}
                    pieceClicked={pieceClicked2}
                    updatePieceClicked={updatePieceClicked2}
                    enpassant={enpassant2}
                    updateEnpassant={updateEnpassant2}
                    currPGN={currPGN1}
                    updatePGN={updatePGN1}
                />) :

                (<Home home_1_or_live_2={1}
                    alertCall={props.alertCall}
                    allPositions={allPositions1}
                    updatePosition={updatePosition1}
                    glowSqs={glowSqs1}
                    updateGlowSqs={updateGlowSqs1}
                    turn={turn1}
                    updateTurn={updateTurn1}
                    pieceClicked={pieceClicked1}
                    updatePieceClicked={updatePieceClicked1}
                    enpassant={enpassant1}
                    updateEnpassant={updateEnpassant1}
                    currPGN={currPGN2}
                    updatePGN={updatePGN2}
                />)
            }
        </>
    )
}
