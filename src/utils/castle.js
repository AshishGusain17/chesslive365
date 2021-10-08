//check whether king and rook have not moved throughout the game.....logic left to implement
//check king is not in check


import { reversePositionObject } from "./functools";

const castleCheck = (allPositions, turn) => {
    //castle possiblity for white king
    if (turn === 1) {
        //queen side castle
        if (allPositions[61] === 'wk' && allPositions[57] === 'wr') {

            let revPos = reversePositionObject(allPositions);
            let kingPos = revPos['wk'][0];
            if (revPos['br'].length === 2) {
                let rook1Pos = revPos['br'][0];
                if ((Math.abs(rook1Pos) - kingPos) % 8 === 0) {
                    if (rook1Pos > kingPos) {

                    }
                    else {

                    }
                }
                let rook2Pos = revPos['br'][1];
            }

        }
        //king side castle
        else if (allPositions[61] === 'wk' && allPositions[64] === 'wr') {

        }
    }
    //castle possiblity for black king
    else {

    }
}

export { castleCheck }