import axios from 'axios';

// Base URL for your API
const API_URL = 'https://bookstore-um8m.onrender.com';

// Get all books
export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all books:", error);
    }
};

//update Book details
export const updateBook = async (BookId, userId) => {
    try {
        const response = await axios.post(`${API_URL}/books`,{
          BookId, userId
        });
        return response;
    } catch (error) {
        console.error(`Error fetching book with ID ${BookId}:`, error);
    }
};

// Get books by category
// export const getBooksByCategory = async (category) => {
//     try {
//         const response = await axios.post(`${API_URL}/books/category/${category}`);
//         console.log(response.data);
//     } catch (error) {
//         console.error(`Error fetching books in category ${category}:`, error);
//     }
// };

// return book and update records
export const returnBook = async (bookId) => {
    try {
      const response = await axios.post(`${API_URL}/books/returned`, {bookId});

        // const response = await axios.post(`${API_URL}/books/returned`, {bookId});
        console.log(response.data);
    } catch (error) {
        console.error(`Error While updating records:`, error);
    }
};

// 5. Filter books by book name, rent range, and category (POST request)
export const filterBooks = async (book_name, min_rent, max_rent, category, name) => {
    try {
        const response = await axios.post(`${API_URL}/books/filter`, {
            book_name,
            min_rent,
            max_rent,
            category,
            name
        });
        return response.data
    } catch (error) {
        console.error("Error filtering books:", error);
    }
};

export const getReportbyBookId = async (bookId) => {
  
  try {
    const response = await axios.get(`${API_URL}/books/getReport/${bookId}`);
      return response.data
  } catch (error) {
      console.error(`Error While fetching records:`, error);
  }
};












// 1. Get all users
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        
        return response.data
    } catch (error) {
        console.error("Error fetching all users:", error);
    }
};

// 2. Get a user by ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/users/${id}`);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
    }
};

// 3. Create a new user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        console.log(response.data);
    } catch (error) {
        console.error("Error creating user:", error);
    }
};


