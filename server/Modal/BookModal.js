import mongoose from 'mongoose';
 
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rent_per_day: {
        type: Number,
        required: true
    },
    userId:{
        type:String,
        required:false
    },
    
},
{
    timestamps: true
});

const Book = mongoose.model('Books', bookSchema);

export default Book;
