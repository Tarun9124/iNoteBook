const Notes = require('../models/Notes');
const asyncHandler = require('express-async-handler');

//GET /api/notes/fetchallnotes
const fetchAllNotes = asyncHandler(async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//POST /api/notes/addnote
const addNote = asyncHandler(async (req, res) => {
    try {
        const { title, description, tag } = req.body; //destructuring

        //Validation
        if (!title || !description) {
            res.status(400).json({ error: "All Fields are must be Required!!" });
        }

        //add note
        const saveNotes = await Notes.create({
            title,
            description,
            tag,
            user: req.user.id
        })

        res.json(saveNotes);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//POST /api/notes/removenote
const removeNote = asyncHandler(async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Not Found!!" });

        if (note.user.toString() !== req.user.id) return res.status(401).json({ error: "Not Allowed!!" });

        const remove = await Notes.findByIdAndRemove(req.params.id);
        res.json({ "message": "Note Removed Successfully!" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//POST /api/notes/updatenote
const updateNote = asyncHandler(async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Not Found!!" });

        if (note.user.toString() !== req.user.id) return res.status(401).json({ error: "Not Allowed!!" });

        const update = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(update);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
})

module.exports = { fetchAllNotes, addNote, removeNote, updateNote };
