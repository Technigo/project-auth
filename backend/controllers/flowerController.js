import asyncHandler from 'express-async-handler';
import { FlowerModel } from '../models/FlowerModel.js';

// @desc Get a flower by type
// @route GET /flowers/:type
// @access Public
export const getFlowerByType = asyncHandler(async (req, res) => {
    const type = req.params.type;
    try {
        const flower = await FlowerModel.findOne({ type: type });
        if (!flower) {
            return res.status(404).json({ success: false, response: 'Flower not found' });
        } else {
            return res.status(200).json({ success: true, response: flower });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
