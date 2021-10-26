import React from 'react';
import {
    Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import reverseStyles from '../css/reverse.module.css';
import { Connect } from './Followups/Connect';


export default function Navbar(props) {
    const location = useLocation();
    const history = useHistory();

    const handleNewGame = async () => {
        let game_number = await props.createNewGame();
        history.push(`/live/${game_number}`);
    };


    let thirdPerson = 1;
    if (localStorage.getItem('curr')) {
        const game_number_by_id = parseInt(location.pathname.substring(6, 20).trim());
        const game_number_saved = JSON.parse(localStorage.getItem('curr')).game_number;
        if (game_number_by_id === game_number_saved) {
            thirdPerson = 0;
        }
    }
    else {
        thirdPerson = 0;
    }

    let ourColorValue; 
    if (localStorage.getItem('curr')) {
        let ourColor = JSON.parse(localStorage.getItem('curr')).col;
        if(ourColor === 1){
            ourColorValue = "White";
        }
        else{
            ourColorValue = "Black";
        }
    }



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Chesslive365</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {location.pathname === '/' ?
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/live' ? 'active' : ''}`} to="/live" onClick={handleNewGame}>Challenge A Friend</Link>
                            </li> :
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} to="/">Home</Link>
                                </li>
                                <li className="nav-item nav-link" >
                                    {thirdPerson === 1 ? 'You are watching a live game' : `You have ${ourColorValue} pieces`}
                                </li>
                            </>

                        }


                        <li className="nav-item nav-link" onClick={props.updateChessSet}>
                            {props.chessSet.name} Pieces
                        </li>

                        <li className="nav-item nav-link" >
                            {props.turn === 1 ? "White" : "Black"} to Move
                        </li>

                        <input type="checkbox" id="toggle" className={reverseStyles.toggleCheckbox} />
                        <label htmlFor="toggle" className={reverseStyles.toggleLabel} onClick={props.reverseState} >
                            <span className={reverseStyles.toggleLabelBackground}></span>
                        </label>

                        <li className="navbar-nav me-auto mb-2 mb-lg-0" >
                            <Connect />
                        </li>

                    </ul>
                </div>


            </div>
        </nav>
    )
}
