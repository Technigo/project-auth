import mongoose from 'mongoose';
import flowerOptions from '../flowers.json';

// Schema definition for the Flower model
const flowerSchema = new mongoose.Schema({
  // 'type' defines the category of the flower
  type: {
    type: String,
    enum: flowerOptions.map(option => option.type),
    required: [true, 'Flower type is required'],
  },
  // 'price' indicates the cost of the flower type
  price: {
    type: Number,
    required: true
  },
}, { timestamps: true });

// Pre-save middleware to set the price before saving a document
flowerSchema.pre('save', function(next) {
  const selectedType = flowerOptions.find(option => option.type === this.type);
  if (selectedType) {
    this.price = selectedType.price;
  } else {
    next(new Error('Invalid flower type specified'));
  }
});

// Creating the Flower model from the schema
export const Flower = mongoose.model('Flower', flowerSchema);
