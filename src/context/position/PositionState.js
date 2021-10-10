import { useState } from "react";
import PositionContext from "./PositionContext";

const PositionState = (props) => {
    // const HOST = process.env.REACT_APP_BACKEND_HOST;

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
    const [allPositions, updatePosition] = useState(initPosition);


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

    const [glowSqs, updateGlowSqs] = useState(initGlowSqs)

    const [turn, updateTurn] = useState(1);

    const [pieceClicked, updatePieceClicked] = useState({ sq: 0, piece: "" });

    const [enpassant, updateEnpassant] = useState({ active: 0, sq: -1 })

    const [currPGN, updatePGN] = useState("");



    return (
        <PositionContext.Provider value={{
            allPositions, updatePosition,
            initGlowSqs, glowSqs, updateGlowSqs,
            turn, updateTurn,
            pieceClicked, updatePieceClicked,
            enpassant, updateEnpassant,
            currPGN, updatePGN
        }}>
            {props.children}
        </PositionContext.Provider>
    );
};

export default PositionState;
