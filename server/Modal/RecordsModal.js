import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rent_per_day: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: String, required: true },
  startDate: { type: Date, required: true },
  
}, {
  timestamps: true // Automatically add createdAt and updatedAt
});

const Records = mongoose.model('records', bookSchema);

export default Records
