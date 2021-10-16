const express = require('express');
const router = express.Router();
const liveGames = require('../models/liveGames');


router.post('/getgame', async (req, res) => {
    try {
        liveGame = await liveGames.findById(req.body.game_id);
        res.send(liveGame);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ "log": "error in /getgame endpoint" })
    }
})


router.post('/newgame', async (req, res) => {
    try {
        const { game_id, user_count, allPositions2, glowSqs2, turn2, pieceClicked2, enpassant2, currPGN2 } = req.body;

        const game = new liveGames({
            game_id: game_id,
            user_count: user_count,
            allPositions2: allPositions2,
            glowSqs2: glowSqs2,
            turn2: turn2,
            pieceClicked2: pieceClicked2,
            enpassant2: enpassant2,
            currPGN2: currPGN2
        })
        const liveGame = await game.save();
        res.send(liveGame._id);

    } catch (err) {
        console.log(err)
        res.status(500).json({ "log": "error in /newgame endpoint" })
    }
})


router.put('/updategame', async (req, res) => {
    try {
        const { game_id, fieldName, val } = req.body;

        // checking if live game is present or not
        let liveGame = await liveGames.findById(game_id);
        if (!liveGame) {
            res.status(404).json({ "log": "live game not found" });
        }

        // making changes in object to be updated
        liveGame[fieldName] = val;

        // finally updating changes in database
        updatedGame = await liveGames.findByIdAndUpdate(game_id, { $set: liveGame }, { new: true });
        res.send(updatedGame);
    } catch (err) {
        console.log(err)
        res.status(500).json({ "log": "error in /updategame endpoint" })
    }

})





module.exports = router;