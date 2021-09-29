const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

router.get('/getAllNotes', fetchuser, async (req, res) => {
    allNotes = await Notes.find({ userId: req.userId });
    res.send(allNotes);
})


router.post('/addNote', fetchuser, async (req, res) => {
    try {
        const { title, desc, tag } = req.body;
        console.log(title, desc,tag)
        const note = new Notes({
            userId: req.userId,
            title: title,
            desc: desc,
            tag: tag
        })

        const savedNote = await note.save();
        res.send(savedNote);

    } catch (err) {
        console.log(err)
        res.status(500).json({ "log": "error in /addnote endpoint" })
    }

})

router.put('/updateNote/:id', fetchuser, async (req, res) => {
    try {
        const { title, desc, tag } = req.body;
        const noteUpdateTo = {};
        if (title) { noteUpdateTo.title = title };
        if (desc) { noteUpdateTo.desc = desc };
        if (tag) { noteUpdateTo.tag = tag };

        // checking if note is present or not
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).json({ "log": "note not found" });
        }

        // checking if user logged in matched with note owner
        if (note.userId.toString() != req.userId) {
            res.status(401).json({ "log": "user does not matches with the note owner" });
        }

        //finally updating changes
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: noteUpdateTo }, { new: true });
        res.send(note);

    } catch (err) {
        console.log(err)
        res.status(500).json({ "log": "error in /updateNote endpoint" })
    }

})





router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {

        // checking if note is present or not
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).json({ "log": "note not found" });
        }

        // checking if user logged in matched with note owner
        if (note.userId.toString() != req.userId) {
            res.status(401).json({ "log": "user does not matches with the note owner" });
        }

        //finally updating changes
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "log": "note deleted", "note": note });

    } catch (err) {
        console.log(err)
        res.status(500).json({ "log": "error in /deleteNote endpoint" })
    }

})
module.exports = router;