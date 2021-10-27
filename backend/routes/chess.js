const express = require('express');
const router = express.Router();
const liveGames = require('../models/liveGames');
const gameNumber = require('../models/gameNumber');
const drawVerify = require('../utils/drawVerify');

// use this function whenever making any changes in data structure
// router.get('/bb', async (req, res) => {
//     let game_id = '61792459007c0c08913c6c28'
//     let initPosition = {
//         1: "br", 2: "bn", 3: "bb", 4: "bq", 5: "bk", 6: "bb", 7: "bn", 8: "br",
//         9: "bp", 10: "bp", 11: "bp", 12: "bp", 13: "bp", 14: "bp", 15: "bp", 16: "bp",
//         17: "", 18: "", 19: "", 20: "", 21: "", 22: "", 23: "", 24: "",
//         25: "", 26: "", 27: "", 28: "", 29: "", 30: "", 31: "", 32: "",
//         33: "", 34: "", 35: "", 36: "", 37: "", 38: "", 39: "", 40: "",
//         41: "bbbb", 42: "", 43: "", 44: "", 45: "", 46: "", 47: "", 48: "",
//         49: "wp", 50: "wp", 51: "wp", 52: "wp", 53: "wp", 54: "wp", 55: "wp", 56: "wp",
//         57: "wr", 58: "wn", 59: "wb", 60: "wq", 61: "wk", 62: "wb", 63: "wn", 64: "wr"
//     };

//     // checking if live game is present or not
//     let liveGame = await liveGames.findById(game_id);
//     if (!liveGame) {
//         res.send({ "log": "live game not found" });
//     }

//     liveGame['arr'].push(initPosition)

//     // finally updating changes in database
//     updatedGame = await liveGames.findByIdAndUpdate(game_id, { $set: liveGame }, { new: true });
//     res.send(updatedGame);
// })




router.post('/newgame', async (req, res) => {
    try {
        const { game_number, user_count, allPositions2, glowSqs2, turn2, pieceClicked2, enpassant2, currPGN2, castlePossible2, drawOffer2, gameEnd2 } = req.body;

        const game = new liveGames({
            game_number: game_number,
            user_count: user_count,
            allPositions2: [allPositions2],
            glowSqs2: glowSqs2,
            turn2: turn2,
            pieceClicked2: pieceClicked2,
            enpassant2: enpassant2,
            currPGN2: currPGN2,
            castlePossible2: castlePossible2,
            drawOffer2: drawOffer2,
            gameEnd2: gameEnd2
        })
        const liveGame = await game.save();
        res.send(liveGame._id);

    } catch (err) {
        console.log(err)
        res.status(500).json({ "success": 0, "log": "error in /newgame endpoint" })
    }
})







router.post('/getgame', async (req, res) => {
    try {
        let liveGameArr = await liveGames.find({ game_number: req.body.game_number }).sort('-datetime');
        if (liveGameArr.length === 0) {
            res.json({ "success": 0, "log": "no such game in database" });
        }
        else {
            // if in the rarest case, 2 games have same numbers within 6 hours, so get the latest one
            let firstLiveGame = liveGameArr[0];
            let liveGame = JSON.parse(JSON.stringify(firstLiveGame));

            // liveGame['allPositions2'] is an array of objects, we will send only the last value of this array back
            let lastPos = liveGame['allPositions2'];
            lastPos = lastPos[lastPos.length - 1];

            // update allPositions2 with only the last value
            liveGame['allPositions2'] = lastPos;
            res.send({ "success": 1, "liveGame": liveGame });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ "success": 0, "log": "error in /getgame endpoint" })
    }
})






router.put('/updategame', async (req, res) => {
    try {
        let flagDraw;
        let game_id = req.body.game_id;
        let numFieldsToUpdate = req.body.numFieldsToUpdate;
        let fieldName, val, fieldName1, val1, fieldName2, val2, fieldName3, val3;

        // checking if live game is present or not
        let liveGame = await liveGames.findById(game_id);
        if (!liveGame) {
            res.json({ "log": "live game not found" });
        }

        if (numFieldsToUpdate === 3) {
            fieldName1 = req.body.fieldName1;
            val1 = req.body.val1;
            fieldName2 = req.body.fieldName2;
            val2 = req.body.val2;
            fieldName3 = req.body.fieldName3;
            val3 = req.body.val3;

            
            liveGame[fieldName1] = val1;            // making changes in object to be updated
            liveGame[fieldName2] = val2;            // making changes in object to be updated
            if (fieldName3 === 'allPositions2') {
                liveGame[fieldName3].push(val3);            // making changes in object to be updated
                flagDraw = drawVerify.check3Fold(liveGame[fieldName3]);
                if (flagDraw === 1) {
                    // 3 fold repetitions
                    liveGame["gameEnd2"] = 8;           // making changes in object to be updated
                }
            }
        }
        else if (numFieldsToUpdate === 1) {
            fieldName = req.body.fieldName;
            val = req.body.val;
            if (fieldName === 'allPositions2') {
                liveGame[fieldName].push(val);          // making changes in object to be updated
                flagDraw = drawVerify.check3Fold(liveGame[fieldName]);
                // 3 fold repetitions
                if (flagDraw === 1) {
                    liveGame["gameEnd2"] = 8;           // making changes in object to be updated
                }
            }
            else {
                liveGame[fieldName] = val;          // making changes in object to be updated
            }
        }

        // finally updating changes in database
        updatedGame = await liveGames.findByIdAndUpdate(game_id, { $set: liveGame }, { new: true });
        res.send(updatedGame);
    } catch (err) {
        console.log(err)
        res.status(500).json({ "success": 0, "log": "error in /updategame endpoint" })
    }

})






router.put('/get2ndplayer', async (req, res) => {
    try {
        const { game_number_by_id, game_number_saved } = req.body;

        // checking if the particular game_number is present or not
        let liveGameArr = await liveGames.find({ game_number: game_number_by_id }).sort('-datetime');;
        if (liveGameArr.length === 0) {
            res.json({ "success": 0, "log": "Live game not found" });
        }
        else {
            let liveGame = liveGameArr[0];
            if (game_number_saved === game_number_by_id) {
                res.json({ "success": 0, "log": "You are one of the 2 players playing this game." });
            }
            else {
                if (liveGame.user_count === 1) {
                    liveGame["user_count"] = 2;
                    // finally updating user_count in database for that particular game
                    updatedGame = await liveGames.findByIdAndUpdate(liveGame._id, { $set: liveGame }, { new: true });
                    res.json({ "success": 1, "game_id": liveGame._id, "game_number": game_number_by_id });
                }
                else {
                    res.json({ "success": 0, "log": "2 players are already playing this game. You can only spectate." });
                }
            }

        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "success": 0, "log": "error in /get2ndplayer endpoint" })
    }
})


module.exports = router;