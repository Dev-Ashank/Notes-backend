const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const noteController = require('../contollers/noteController');
const { validateNoteTitle } = require('../middlewares/validateMiddleware');

// Apply the authentication middleware to all routes in this router
router.use(authMiddleware);

router.post('/notes', validateNoteTitle, noteController.createNote);
router.get('/notes', noteController.getAllNotes);
router.get('/notes/:noteId', noteController.getNoteById);
router.put('/notes/:noteId', noteController.updateNote);
router.delete('/notes/:noteId', noteController.deleteNote);
router.post('/notes/:id/share', noteController.shareNote);
router.get('/search', noteController.searchNotes);

module.exports = router;