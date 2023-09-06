const express = require('express');
const { fetchAllNotes, addNote, removeNote, updateNote } = require('../controllers/notesControl');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();

router
    .get('/fetchallnotes', fetchUser, fetchAllNotes)
router
    .post('/addnote', fetchUser, addNote)
router
    .delete('/removenote/:id', fetchUser, removeNote)
router
    .put('/updatenote/:id', fetchUser, updateNote)

module.exports = router;