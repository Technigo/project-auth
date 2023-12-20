import asyncHandler from 'express-async-handler';
import { Flower } from '../models/FlowerModel.js'; 

// @desc Get all flowers
// @route GET /flowers
// @access Public
export const getAllFlowers = asyncHandler(async (req, res) => {
    try {
        const flowers = await Flower.find();
        res.status(200).json({ success: true, response: flowers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// @desc Get a flower by type
// @route GET /flowers/:type
// @access Public
export const getFlowerByType = asyncHandler(async (type, req, res) => {
    try {
        const flower = await Flower.findOne({ type: type });
        if (!flower) {
            res.status(404).json({ success: false, response: 'Flower not found' });
        } else {
            res.status(200).json({ success: true, response: flower });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


