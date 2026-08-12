import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  changeBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { changeUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', authenticate, getBooks);
router.get('/:id', authenticate, getBookById);

router.post('/', authenticate, authorize('admin'), createBook);
router.put('/:id', authenticate, authorize('admin'), changeBook);
router.patch('/:id', authenticate, authorize('admin'), updateBook);
router.delete('/:id', authenticate, authorize('admin'), deleteBook);

export default router;
