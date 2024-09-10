import Book from "../Modal/BookModal.js";
import mongoose from "mongoose";
import { newRecord } from "./Recordscontroller.js";
// Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a book by ID
export const getBookById = async (req, res) => {
    const {BookId, userId} = req.body

    try {
        
        const book = await Book.updateOne({_id:BookId}, { $set: { userId:userId } },{ upsert: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get books by category
// export const getBooksByCategory = async (req, res) => {
//     try {
//         const books = await Book.find({ category: req.params.category });
//         res.status(200).json(books);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Get books by rent range
// export const getBooksByRentRange = async (req, res) => {
//     try {
//         const minRent = parseInt(req.query.min);
//         const maxRent = parseInt(req.query.max);

//         const books = await Book.find({
//             rent_per_day: { $gte: minRent, $lte: maxRent }
//         });

//         res.status(200).json(books);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };





// Filter books by book name, category, and rent range
export const filterBooks = async (req, res) => {
    try {
        const { name, min_rent, max_rent, category } = req.body;

        // Build the query object dynamically
        let query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }

        if (category.length>0) {
            query.category = category;
        }

        if (min_rent !== undefined && max_rent !== undefined) {
            query.rent_per_day = { $gte: min_rent, $lte: max_rent };
        } else if (min_rent !== undefined) {
            query.rent_per_day = { $gte: min_rent };
        } else if (max_rent !== undefined) {
            query.rent_per_day = { $lte: max_rent };
        }

        // Fetch books from the database based on the query
        const books = await Book.find(query);

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update book

export const updateBook = async (req, res) => {
    const {bookId} = req.body
    
    try {
        const record = await Book.find({_id:bookId})
        // console.log(record)
        await newRecord(record)
        const book = await Book.updateOne({_id:bookId}, 
            { $set: {  userId:"" }});

        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};