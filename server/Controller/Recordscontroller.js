import Records from "../Modal/RecordsModal.js";

// Create a new book
export const newRecord = async (record) => {
  let date = new Date()
  try {
    const { name, category, rent_per_day, userId, _id, updatedAt } = record[0];
    console.log(record[0].name)
    // console.log(name, category, rent_per_day,)
    // Create a new book document
    
    const newBook = new Records({
      name,
      category,
      rent_per_day,
      userId,
      bookId:_id,
      startDate: new Date(updatedAt),
      
    });

    // Save the book to the database
    const result=  await newBook.save();
    // console.log(result)
    
    // res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    // res.status(500).json({ message: 'Error creating book', error });
    console.log(error)
  }
};

// Update an existing book
// const updateBook = async (req, res) => {
//   try {
//     const { bookId } = req.params;
//     const updateData = req.body;

//     // Find and update the book
//     const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });
    
//     if (!updatedBook) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating book', error });
//   }
// };

// Get all books
// export const getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching books', error });
//   }
// };

// Get a book by ID
 export const getBookReport = async (req, res) => {
  try {
    const { bookId } = req.params
    console.log(bookId.split(':')[1])
    const book = await Records.find({bookId});
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};


