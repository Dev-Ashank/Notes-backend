// controllers/noteController.js

const { log } = require('winston');
const logger = require('../../logger');
const Note = require('../models/Note');
const SharedNote = require('../models/SharedNote');
const User = require('../models/User');

// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;

        const newNote = new Note({
            title,
            content,
            user: userId,
        });

        await newNote.save();
        logger.info('Note created successfully');
        return res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        logger.error('Error creating note:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        // Fetch user's own notes
        const userNotes = await Note.find({ user: userId });

        logger.info('Users Notes retrieved successfully');

        // Fetch notes shared with the user
        const sharedNotes = await SharedNote.find({ sharedWith: userId }).populate('note');
        logger.info('Shared notes retrieved successfully.');

        // Fetch details of shared notes from the Note model
        const sharedNotesDetails = await Note.find({ _id: { $in: sharedNotes.map(sharedNote => sharedNote.note) } });
        console.log({ sharedNotesDetails });
        // Combine user's own notes and details of shared notes
        const allNotes = [...userNotes, ...sharedNotesDetails];
        return res.status(200).json({ allNotes });
    } catch (error) {
        logger.error('Error retrieving notes:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getNoteById = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const noteId = req.params.noteId;
        const note = await Note.findOne({ _id: noteId, user: userId });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        logger.info('Note retrieved successfully');
        return res.status(200).json({ note });
    } catch (error) {
        logger.error('Error retrieving note:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const updateNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.noteId;
        const { content } = req.body;

        const note = await Note.findOneAndUpdate(
            { _id: noteId, user: userId },
            { $set: { content } },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        logger.info('Note updated successfully');
        return res.status(200).json({ message: 'Note updated successfully', note });
    } catch (error) {
        logger.error('Error updating note:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.noteId;

        const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

        if (!note) {
            logger.info('Note not Found')
            return res.status(404).json({ error: 'Note not found' });
        }
        logger.info('Note deleted successfully');
        return res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        logger.error('Error deleting note:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const shareNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { userId } = req.body;

        // Assuming you have a Note model and a User model
        const note = await Note.findById(noteId);
        const userToShareWith = await User.findById(userId);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        if (!userToShareWith) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a SharedNote entry
        const sharedNote = new SharedNote({
            note: noteId,
            sharedWith: userId,
            sharedBy: req.user.id,
        });

        await sharedNote.save();
        return res.status(200).json({ message: 'Note shared successfully' });
    } catch (error) {
        console.error('Error sharing note:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const searchNotes = async (req, res) => {
    try {
        const query = req.query.q;

        const matchingNotes = await Note.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive search in the title
                { content: { $regex: query, $options: 'i' } }, // Case-insensitive search in the content
            ],
        });

        logger.info('Notes retrieved successfully');
        return res.status(200).json({ message: 'Notes retrieved successfully', notes: matchingNotes });
    } catch (error) {
        logger.error('Error searching for notes:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    createNote, getAllNotes, getNoteById, updateNote, deleteNote, shareNote, searchNotes
};
