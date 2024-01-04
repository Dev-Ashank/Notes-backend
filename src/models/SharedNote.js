const mongoose = require('mongoose');

const sharedNoteSchema = new mongoose.Schema({
    note: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
    },
    sharedWith: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const SharedNote = mongoose.model('SharedNote', sharedNoteSchema);

module.exports = SharedNote;
