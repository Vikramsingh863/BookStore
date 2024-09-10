import express from 'express'
import { getUsers } from '../Controller/UsersController.js';
import { getBooks, getBookById, filterBooks, updateBook } from '../Controller/BookController.js';
import { getBookReport } from '../Controller/Recordscontroller.js';
// import { newRecord, getAllBooks } from '../Controller/Recordscontroller.js';

const router = express.Router()
router.get('/users', getUsers);
router.get('/books', getBooks);

//update book current user
router.post('/books', getBookById);

//update book records
router.post('/books/returned', updateBook);
// Route to get books by category
// router.get('/books/category/:category', getBooksByCategory);
router.get(`/books/getReport/:bookId`, getBookReport);
// Route to get books by rent range
// router.get('/books/rent', getBooksByRentRange);

// Route to filter books based on search criteria
router.post('/books/filter', filterBooks);

export default router