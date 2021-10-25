const express = require('express');
const router = express.Router();
const liveGames = require('../models/liveGames');
const gameNumber = require('../models/gameNumber');




router.post('/newgame', async (req, res) => {
    try {
        const { game_number, user_count, allPositions2, glowSqs2, turn2, pieceClicked2, enpassant2, currPGN2, castlePossible2, drawOffer2, gameEnd2 } = req.body;

        const game = new liveGames({
            game_number: game_number,
            user_count: user_count,
            allPositions2: allPositions2,
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
            res.send({ "success": 1, "liveGame": liveGameArr[0] });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ "success": 0, "log": "error in /getgame endpoint" })
    }
})



router.put('/updategame', async (req, res) => {
    try {
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

            // making changes in object to be updated
            liveGame[fieldName1] = val1;
            liveGame[fieldName2] = val2;
            liveGame[fieldName3] = val3;
        }
        else if (numFieldsToUpdate === 1) {
            fieldName = req.body.fieldName;
            val = req.body.val;
            liveGame[fieldName] = val;
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