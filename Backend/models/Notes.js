const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General",
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('notes', NotesSchema);