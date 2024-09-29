import { useState } from "react";
import PositionContext from "./PositionContext";

const PositionState = (props) => {
    // const HOST = process.env.REACT_APP_BACKEND_LOCALHOST;
    const HOST = process.env.REACT_APP_BACKEND_HOST;

    let initPosition = {
        1: "br", 2: "bn", 3: "bb", 4: "bq", 5: "bk", 6: "bb", 7: "bn", 8: "br",
        9: "bp", 10: "bp", 11: "bp", 12: "bp", 13: "bp", 14: "bp", 15: "bp", 16: "bp",
        17: "", 18: "", 19: "", 20: "", 21: "", 22: "", 23: "", 24: "",
        25: "", 26: "", 27: "", 28: "", 29: "", 30: "", 31: "", 32: "",
        33: "", 34: "", 35: "", 36: "", 37: "", 38: "", 39: "", 40: "",
        41: "", 42: "", 43: "", 44: "", 45: "", 46: "", 47: "", 48: "",
        49: "wp", 50: "wp", 51: "wp", 52: "wp", 53: "wp", 54: "wp", 55: "wp", 56: "wp",
        57: "wr", 58: "wn", 59: "wb", 60: "wq", 61: "wk", 62: "wb", 63: "wn", 64: "wr"
    };

    let initGlowSqs = {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0,
        9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0,
        17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0,
        25: 0, 26: 0, 27: 0, 28: 0, 29: 0, 30: 0, 31: 0, 32: 0,
        33: 0, 34: 0, 35: 0, 36: 0, 37: 0, 38: 0, 39: 0, 40: 0,
        41: 0, 42: 0, 43: 0, 44: 0, 45: 0, 46: 0, 47: 0, 48: 0,
        49: 0, 50: 0, 51: 0, 52: 0, 53: 0, 54: 0, 55: 0, 56: 0,
        57: 0, 58: 0, 59: 0, 60: 0, 61: 0, 62: 0, 63: 0, 64: 0
    };

    let initTurn = 1;
    let initPieceClicked = { sq: 0, piece: "" };
    let initEnpassant = { active: 0, sq: -1 };
    let initCurrPGN = "";
    let initCastlePossible = { wkside: 1, wqside: 1, bkside: 1, bqside: 1 };
    let initDrawOffer = { white: 0, black: 0 };
    let initGameEnd = 0;



    const [allPositions1, updatePosition1] = useState(initPosition);

    const [glowSqs1, updateGlowSqs1] = useState(initGlowSqs)

    const [turn1, updateTurn1] = useState(initTurn);

    const [pieceClicked1, updatePieceClicked1] = useState(initPieceClicked);

    const [enpassant1, updateEnpassant1] = useState(initEnpassant);

    const [currPGN1, updatePGN1] = useState(initCurrPGN);

    const [castlePossible1, updateCastlePossible1] = useState(initCastlePossible);



    // AP: allPositions2
    // T: turn2
    // EP: enpassant2
    // CP: castlePossible2
    // DO: drawOffer2
    // GE: gameEnd
    const [allPositions2, updatePosition2_setState] = useState(initPosition);

    const [glowSqs2, updateGlowSqs2_setState] = useState(initGlowSqs)

    const [turn2, updateTurn2_setState] = useState(initTurn);

    const [pieceClicked2, updatePieceClicked2_setState] = useState(initPieceClicked);

    const [enpassant2, updateEnpassant2_setState] = useState(initEnpassant);

    const [currPGN2, updatePGN2_setState] = useState(initCurrPGN);

    const [castlePossible2, updateCastlePossible2_setState] = useState(initCastlePossible);

    const [drawOffer2, updateDrawOffer2_setState] = useState(initDrawOffer);

    const [gameEnd2, updateGameEnd2_setState] = useState(initGameEnd);
    // gameEnd = 0   ------>   game is going on
    // gameEnd = 1   ------>   checkmate, white wins
    // gameEnd = 2   ------>   checkmate, black wins
    // gameEnd = 3   ------>   stalemate, white has no moves
    // gameEnd = 4   ------>   stalemate, black has no moves
    // gameEnd = 5   ------>   offer a draw accepted
    // gameEnd = 6   ------>   white resigns
    // gameEnd = 7   ------>   black resigns
    // gameEnd = 8   ------>   draw, 3 fold-repetition
    // gameEnd = 9   ------>   draw, 50 move rule
    // gameEnd = 10  ------>   draw, Insufficient Material 
    // gameEnd = 11  ------>   check to white    
    // gameEnd = 12  ------>   check to black
    // gameEnd = 13  ------>   draw offer rejected by white
    // gameEnd = 14  ------>   draw offer rejected by black



    const updateField = async (fieldName, val) => {
        const game_id = JSON.parse(localStorage.getItem('curr')).game_id;
        let response = await fetch(`${HOST}/api/chess/updategame`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game_id": game_id, fieldName: fieldName, val: val, varToUpdate: "all"
            })
        });
        // below if is just so that I don't get any warning like 'response' is assigned a value but never used
        if (response) {
            //pass;
        }
        // const res_json = await response.json();
        // console.log(fieldName, res_json);
    }


    // updating gameEnd, enpassant and all positions
    // draw is actually updated after each move to initialDrawOffer
    const update_GE_EP_DO_AP = async (gameEndVal, enpassantObj, allPositionsCopy) => {
        updateGameEnd2_setState(gameEndVal);
        updatePosition2_setState(allPositionsCopy);
        updateEnpassant2_setState(enpassantObj);
        updateDrawOffer2_setState(initDrawOffer);

        const game_id = JSON.parse(localStorage.getItem('curr')).game_id;
        let response = await fetch(`${HOST}/api/chess/updategame`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game_id": game_id,
                "gameEnd2": gameEndVal,
                "enpassant2": enpassantObj,
                "drawOffer2": initDrawOffer,
                "allPositions2": allPositionsCopy,
                varToUpdate: "GE_EP_DO_AP"
            })
        });
        // below if is just so that I don't get any warning like 'response' is assigned a value but never used
        if (response) {
            //pass;
        }
        // const res_json = await response.json();
        // console.log(fieldName, res_json);
    }




    // whenever a draw offer is rejected
    const update_GE_DO = async (gameEndVal) => {
        const game_id = JSON.parse(localStorage.getItem('curr')).game_id;
        await fetch(`${HOST}/api/chess/updategame`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game_id": game_id,
                "gameEnd2": gameEndVal,
                "drawOffer2": initDrawOffer,
                varToUpdate: "GE_DO"
            })
        });
        updateGameEnd2_setState(gameEndVal);
        updateDrawOffer2_setState(initDrawOffer);
    }




    const updatePosition2 = async (val) => {
        await updateField("drawOffer2", initDrawOffer)
        updateDrawOffer2_setState(initDrawOffer);
        await updateField("allPositions2", val)
        updatePosition2_setState(val);
    }

    const updateGlowSqs2 = async (val) => {
        // await updateField("glowSqs2", val)
        updateGlowSqs2_setState(val);
    }

    const updateTurn2 = async (val) => {
        await updateField("turn2", val)
        updateTurn2_setState(val);
    }

    const updatePieceClicked2 = async (val) => {
        // await updateField("pieceClicked2", val)
        updatePieceClicked2_setState(val);
    }

    const updateEnpassant2 = async (val) => {
        await updateField("enpassant2", val)
        updateEnpassant2_setState(val);
    }

    const updatePGN2 = async (val) => {
        await updateField("currPGN2", val)
        updatePGN2_setState(val);
    }

    const updateCastlePossible2 = async (val) => {
        await updateField("castlePossible2", val)
        updateCastlePossible2_setState(val);
    }

    const updateDrawOffer2 = async (val) => {
        await updateField("drawOffer2", val)
        updateDrawOffer2_setState(val);
    }

    const updateGameEnd2 = async (val) => {
        await updateField("gameEnd2", val)
        updateGameEnd2_setState(val);
    }



    // game_number_by_id: from URL
    // game_number_saved: saved in local storage  
    const getLiveGame = async (game_number_by_id) => {
        const response = await fetch(`${HOST}/api/chess/getgame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game_number": game_number_by_id
            })
        });
        console.log("response from /getgame: ", response);

        let res_json = await response.json();
        if (res_json.success) {
            console.log("res_json.success");
            res_json = res_json.liveGame;
            // update position only if it's opponent's turn
            if (localStorage.getItem('curr')) {
                if (turn2 !== JSON.parse(localStorage.getItem('curr')).col) {
                    updatePosition2_setState(res_json.allPositions2);
                }
            }
            else{
                updatePosition2_setState(res_json.allPositions2);
            }
            // updateGlowSqs2_setState(res_json.glowSqs2);
            updateTurn2_setState(res_json.turn2);
            // updatePieceClicked2_setState(res_json.pieceClicked2);
            updateEnpassant2_setState(res_json.enpassant2);
            updatePGN2_setState(res_json.currPGN2);
            updateCastlePossible2_setState(res_json.castlePossible2);
            updateDrawOffer2_setState(res_json.drawOffer2);
            updateGameEnd2_setState(res_json.gameEnd2)
            return 1;
        }
        else {
            return 0;
        }
    }



    const createNewGame = async () => {
        const game_number = Math.floor((Math.random() * 10000000) + 1);
        const response = await fetch(`${HOST}/api/chess/newgame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game_number": game_number, "user_count": 1, "allPositions2": initPosition,
                "glowSqs2": initGlowSqs, "turn2": initTurn, "pieceClicked2": initPieceClicked,
                "enpassant2": initEnpassant, "currPGN2": initCurrPGN, "castlePossible2": initCastlePossible,
                "drawOffer2": initDrawOffer, "gameEnd2": initGameEnd
            })
        });

        updatePosition2_setState(initPosition);
        updateGlowSqs2_setState(initGlowSqs);
        updateTurn2_setState(initTurn);
        updatePieceClicked2_setState(initPieceClicked);
        updateEnpassant2_setState(initEnpassant);
        updatePGN2_setState(initCurrPGN);
        updateCastlePossible2_setState(initCastlePossible);
        updateDrawOffer2_setState(initDrawOffer);
        updateGameEnd2_setState(initGameEnd);

        const res_json = await response.json();
        // console.log(res_json);
        const currObj = {
            'game_id': res_json,
            'game_number': game_number,
            'col': 1
        }
        localStorage.setItem('curr', JSON.stringify(currObj));
        return game_number;
    };



    // game_number_by_id: from URL
    // game_number_saved: saved in local storage  
    const confirm2ndPlayer = async (game_number_by_id, game_number_saved) => {
        // console.log(game_number_by_id, game_number_saved)
        const response = await fetch(`${HOST}/api/chess/get2ndplayer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game_number_by_id": game_number_by_id, "game_number_saved": game_number_saved
            })
        });
        const res_json = await response.json();
        // console.log(res_json);
        if (res_json.success === 1) {
            const currObj = {
                'game_id': res_json.game_id,
                'game_number': parseInt(res_json.game_number),
                'col': 0
            }
            localStorage.setItem('curr', JSON.stringify(currObj));
        }
    }


    return (
        <PositionContext.Provider value={{
            initPosition,
            initGlowSqs,
            initTurn,
            initPieceClicked,
            initEnpassant,
            initCurrPGN,
            initCastlePossible,

            allPositions1, updatePosition1,
            glowSqs1, updateGlowSqs1,
            turn1, updateTurn1,
            pieceClicked1, updatePieceClicked1,
            enpassant1, updateEnpassant1,
            currPGN1, updatePGN1,
            castlePossible1, updateCastlePossible1,

            allPositions2, updatePosition2,
            glowSqs2, updateGlowSqs2,
            turn2, updateTurn2,
            pieceClicked2, updatePieceClicked2,
            enpassant2, updateEnpassant2,
            currPGN2, updatePGN2,
            castlePossible2, updateCastlePossible2,
            drawOffer2, updateDrawOffer2,
            gameEnd2, updateGameEnd2,

            createNewGame, getLiveGame, confirm2ndPlayer,

            update_GE_EP_DO_AP, update_GE_DO
        }}>
            {props.children}
        </PositionContext.Provider>
    );
};

export default PositionState;
