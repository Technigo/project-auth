
const mongoose = require('mongoose');
const flowerOptions = require('./flowers.json');

// Schema definition for the Flower model
const flowerSchema = new mongoose.Schema({
  // 'type' defines the category of the flower (e.g., 'basic', 'standard', 'large')
  type: {
    type: String,
    enum: flowerOptions.map(option => option.type), // Restricts to predefined types
    required: [true, 'Flower type is required'], // Makes field mandatory with a custom error message
  },
  // 'price' indicates the cost of the flower type
  price: {
    type: Number,
    required: true,
    default: function () {
      // Determine price based on the type of the flower
      const selectedType = flowerOptions.find(option => option.type === this.type);
      if (!selectedType) {
        // Error handling if the flower type is not found in the predefined options
        console.error(`Invalid flower type: ${this.type}`);
        throw new Error('Invalid flower type specified');
      }
      return selectedType.price;
    },
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Creating the Flower model from the schema
const Flower = mongoose.model('Flower', flowerSchema);

module.exports = Flower;