import { Flower } from '../models/FlowerModel.js';
import { connectDB } from '../config/db.js';
import flowerData from '../flowers.json';

const seedFlowerData = async () => {
    try {
        await connectDB(); // Connect to the database

        // Clear existing data (optional)
        await Flower.deleteMany({});

        // Insert new data
        await Flower.insertMany(flowerData);

        console.log('Data seeding completed successfully');
    } catch (error) {
        // Handle specific errors
        if (error instanceof ConnectionError) {
            console.error('MongoDB connection error:', error);
            process.exit(1); // Terminate with an error code
        } else if (error instanceof BulkWriteError) {
            console.error('Error inserting data:', error);
            process.exit(1); // Terminate with an error code
        } else {
            console.error('Unexpected error:', error);
            process.exit(1); // Terminate with an error code
        }
    } finally {
        process.exit(); // Terminate the process after completion
    }
};

seedFlowerData(); // Call the function to start the seeding process