import { useState } from "react";
import PositionContext from "./PositionContext";

const PositionState = (props) => {
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




    const [allPositions1, updatePosition1] = useState(initPosition);

    const [glowSqs1, updateGlowSqs1] = useState(initGlowSqs)

    const [turn1, updateTurn1] = useState(initTurn);

    const [pieceClicked1, updatePieceClicked1] = useState(initPieceClicked);

    const [enpassant1, updateEnpassant1] = useState(initEnpassant);

    const [currPGN1, updatePGN1] = useState(initCurrPGN);



    const [allPositions2, updatePosition2_setState] = useState(initPosition);

    const [glowSqs2, updateGlowSqs2_setState] = useState(initGlowSqs)

    const [turn2, updateTurn2_setState] = useState(initTurn);

    const [pieceClicked2, updatePieceClicked2_setState] = useState(initPieceClicked);

    const [enpassant2, updateEnpassant2_setState] = useState(initEnpassant);

    const [currPGN2, updatePGN2_setState] = useState(initCurrPGN);


    const updateField = async (fieldName, val) => {
        const game_id = localStorage.getItem('game_id');
        let response = await fetch(`${HOST}/api/chess/updategame`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game_id": game_id, fieldName: fieldName, val: val
            })
        });
        // below if is just so that I don't get any warning like 'response' is assigned a value but never used
        if (response) {
            //pass;
        }
        // const res_json = await response.json();
        // console.log(fieldName, res_json);
    }
    const updatePosition2 = async (val) => {
        await updateField("allPositions2", val)
        updatePosition2_setState(val);
    }

    const updateGlowSqs2 = async (val) => {
        await updateField("glowSqs2", val)
        updateGlowSqs2_setState(val);
    }

    const updateTurn2 = async (val) => {
        await updateField("turn2", val)
        updateTurn2_setState(val);
    }

    const updatePieceClicked2 = async (val) => {
        await updateField("pieceClicked2", val)
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


    const getLiveGame = async () => {
        const game_id = localStorage.getItem('game_id');
        const response = await fetch(`${HOST}/api/chess/getgame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game_id": game_id
            })
        });

        const res_json = await response.json();
        // console.log(res_json);

        updatePosition2_setState(res_json.allPositions2);
        updateGlowSqs2_setState(res_json.glowSqs2);
        updateTurn2_setState(res_json.turn2);
        updatePieceClicked2_setState(res_json.pieceClicked2);
        updateEnpassant2_setState(res_json.enpassant2);
        updatePGN2_setState(res_json.currPGN2);
    }


    const createNewGame = async () => {
        const game_id = Math.floor((Math.random() * 100000) + 1);
        const response = await fetch(`${HOST}/api/chess/newgame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game_id": game_id, "user_count": 1, "allPositions2": initPosition,
                "glowSqs2": initGlowSqs, "turn2": initTurn, "pieceClicked2": initPieceClicked,
                "enpassant2": initEnpassant, "currPGN2": initCurrPGN
            })
        });

        updatePosition2_setState(initPosition);
        updateGlowSqs2_setState(initGlowSqs);
        updateTurn2_setState(initTurn);
        updatePieceClicked2_setState(initPieceClicked);
        updateEnpassant2_setState(initEnpassant);
        updatePGN2_setState(initCurrPGN);

        const res_json = await response.json();
        // console.log(res_json);
        localStorage.setItem('game_id', res_json);
    };



    return (
        <PositionContext.Provider value={{
            initPosition,
            initGlowSqs,
            initTurn,
            initPieceClicked,
            initEnpassant,
            initCurrPGN,

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

            createNewGame, getLiveGame
        }}>
            {props.children}
        </PositionContext.Provider>
    );
};

export default PositionState;
