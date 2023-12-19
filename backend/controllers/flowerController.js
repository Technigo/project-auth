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

// @desc Get a single flower by ID
// @route GET /flowers/:id
// @access Public
export const getFlowerById = asyncHandler(async (req, res) => {
    try {
        const flower = await Flower.findById(req.params.id);
        if (!flower) {
            res.status(404).json({ success: false, response: 'Flower not found' });
        } else {
            res.status(200).json({ success: true, response: flower });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

