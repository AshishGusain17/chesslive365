const express = require('express');
const router = express.Router();
const liveGames = require('../models/liveGames');
const drawVerify = require('../utils/drawVerify');
const gameInfoAlerts = require('../models/gameInfoAlerts');



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
        })
        const liveGame = await game.save();

        const game_info = new gameInfoAlerts({
            game_number: game_number,
            game_id: liveGame._id,
            drawOffer2: drawOffer2,
            gameEnd2: gameEnd2
        })
        await game_info.save();

        res.send(liveGame._id);

    } catch (err) {
        console.log(err)
        res.status(500).json({ "success": 0, "log": "error in /newgame endpoint" })
    }
})







router.post('/getgame', async (req, res) => {
    console.log("router.post(getgame");
    try {
        let liveGameArr = await liveGames.find({ game_number: req.body.game_number }).sort('-datetime');
        if (liveGameArr.length === 0) {
            console.log("router.post(getgame length 0 ");
            res.json({ "success": 0, "log": "no such game in database" });
        }
        else {
            console.log("router.post(getgame length not 0 ");
            // if in the rarest case, 2 games have same game_number within 6 hours, so get the latest one
            let firstLiveGame = liveGameArr[0];
            let liveGame = JSON.parse(JSON.stringify(firstLiveGame));

            // liveGame['allPositions2'] is an array of objects, we will send only the last value of this array back
            let lastPos = liveGame['allPositions2'];
            lastPos = lastPos[lastPos.length - 1];

            // update allPositions2 with only the last value
            liveGame['allPositions2'] = lastPos;


            // get gameInfoAlerts for this particular game
            let gameInfoAlertsArr = await gameInfoAlerts.find({ game_id: liveGame._id });
            let game_info = gameInfoAlertsArr[0];
            // adding drawOffer2 & gameEnd2 from gameInfoAlerts collection to this final object, that will be sent back
            liveGame['drawOffer2'] = game_info['drawOffer2'];
            liveGame['gameEnd2'] = game_info['gameEnd2'];

            console.log("router.post getgame", liveGame);

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
        let varToUpdate = req.body.varToUpdate;
        let fieldName, val;
        let gameInfoAlertsArr, game_info;

        // checking if live game is present or not
        let liveGame = await liveGames.findById(game_id);
        if (!liveGame) {
            res.json({ "log": "live game not found" });
        }
        else {
            gameInfoAlertsArr = await gameInfoAlerts.find({ game_id: liveGame._id });
            game_info = gameInfoAlertsArr[0];
        }

        if (varToUpdate === "GE_EP_DO_AP") {
            game_info["gameEnd2"] = req.body.gameEnd2;           // making changes in object to be updated
            game_info["drawOffer2"] = req.body.drawOffer2;          // making changes in object to be updated 

            liveGame["enpassant2"] = req.body.enpassant2;           // making changes in object to be updated
            liveGame["allPositions2"].push(req.body.allPositions2);         // making changes in object to be updated

            // 3 fold repetitions
            flagDraw = drawVerify.check3Fold(liveGame["allPositions2"]);
            if (flagDraw === 1) {
                liveGame["gameEnd2"] = 8;           // making changes in object to be updated
            }

            // finally updating changes in database
            updatedGame = await liveGames.findByIdAndUpdate(game_id, { $set: liveGame }, { new: true });
            await gameInfoAlerts.findByIdAndUpdate(game_info._id, { $set: game_info }, { new: true });
            res.send({ "success": 1 });
        }

        else if (varToUpdate === "GE_DO") {
            game_info["gameEnd2"] = req.body.gameEnd2;
            game_info["drawOffer2"] = req.body.drawOffer2;

            // finally updating changes in database
            await gameInfoAlerts.findByIdAndUpdate(game_info._id, { $set: game_info }, { new: true });
            res.send({ "success": 1 });
        }

        else if (varToUpdate === "all") {
            fieldName = req.body.fieldName;
            val = req.body.val;
            if (fieldName === 'allPositions2') {
                res.send({ "success": 1 });
            }
            else if (fieldName === "drawOffer2" || fieldName === "gameEnd2") {
                game_info[fieldName] = val;          // making changes in object to be updated

                // finally updating changes in database
                await gameInfoAlerts.findByIdAndUpdate(game_info._id, { $set: game_info }, { new: true });
                res.send({ "success": 1 });
            }
            else {
                liveGame[fieldName] = val;          // making changes in object to be updated

                // finally updating changes in database
                updatedGame = await liveGames.findByIdAndUpdate(game_id, { $set: liveGame }, { new: true });
                res.send({ "success": 1 });
            }

        }
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