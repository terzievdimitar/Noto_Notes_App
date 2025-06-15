import express from 'express';
import { getGetAllNotes, getNoteById, updateNote, createnNote, deleteNote } from '../src/../controllers/notesController.js';

const router = express.Router();

router.get('/', getGetAllNotes);

router.get('/:id', getNoteById);

router.post('/', createnNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);

export default router;
