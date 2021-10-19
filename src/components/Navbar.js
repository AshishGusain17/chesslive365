import React from 'react';
import {
    Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import reverseStyles from '../css/reverse.module.css';
import stylesChessSet from '../css/chessSet.module.css';


export default function Navbar(props) {
    const location = useLocation();
    const history = useHistory();

    const handleNewGame = async () => {
        let game_number = await props.createNewGame();
        history.push(`/live/${game_number}`);
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Chesslive365</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/live' ? 'active' : ''}`} to="/live" onClick={handleNewGame}>New game</Link>
                        </li>

                        <input type="checkbox" id="toggle" className={reverseStyles.toggleCheckbox} />
                        <label htmlFor="toggle" className={reverseStyles.toggleLabel} onClick={props.reverseState} >
                            <span className={reverseStyles.toggleLabelBackground}></span>
                        </label>

                        <input type="checkbox" id="toggle2" className={stylesChessSet.toggleCheckbox2} />
                        <label htmlFor="toggle2" className={stylesChessSet.toggleLabel2} onClick={props.updateChessSet} >
                            <span className={stylesChessSet.toggleLabelBackground2}></span>
                        </label>
                        
                    </ul>
                </div>


            </div>
        </nav>
    )
}
