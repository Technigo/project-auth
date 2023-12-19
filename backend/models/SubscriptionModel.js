import mongoose from 'mongoose';

// Schema for a user's subscription to flowers
const subscriptionSchema = new mongoose.Schema({
  // Reference to the User model - links the subscription to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Reference to the Flower model - indicates the type of flower in the subscription
  flower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flower'
  },

  // The subscription option selected by the user (yearly, monthly, weekly)
  options: {
    type: String,
    enum: ['yearly', 'monthly', 'weekly'],
    required: true,
  },

  // The quantity of flowers determined by the subscription option
  quantity: {
    type: Number,
    required: true,
    validate: {
      // Custom validator to ensure the quantity matches the selected option
      validator: function () {
        switch (this.options) {
          case 'yearly': return this.quantity === 52;
          case 'monthly': return this.quantity === 4;
          case 'weekly': return this.quantity === 1;
          default: return false;
        }
      },
      // Error message for invalid quantity
      message: 'Invalid quantity based on options',
    },
  },

  // The price per flower; to be fetched from the Flower model
  price: {
    type: Number,
    required: true
  },

  // Timestamps for tracking creation and modification of the subscription
}, { timestamps: true });

// Method to calculate the total price of the subscription
subscriptionSchema.methods.calculateTotalPrice = function () {
  // Check if 'price' and 'quantity' are valid numbers
  if (typeof this.price !== 'number' || typeof this.quantity !== 'number') {
    // If either 'price' or 'quantity' is not a number, throw an error
    throw new Error('Invalid price or quantity for calculating total price');
  }

  // Calculate the total price by multiplying 'quantity' and 'price'
  // 'this' refers to the instance of the Subscription model on which this method is called
  this.totalPrice = this.quantity * this.price;
};

// Creating the Subscription model from the schema
export const Subscription = mongoose.model('Subscription', subscriptionSchema);
