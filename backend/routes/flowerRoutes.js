import express from 'express';
import { getAllFlowers, getFlowerByType } from '../controllers/flowerController'; 

const router = express.Router();


router.get('/flowers', getAllFlowers);
// router.get('/flowers/basic', (req, res) => getFlowerByType('basic', req, res));
// router.get('/flowers/standard', (req, res) => getFlowerByType('standard', req, res));
// router.get('/flowers/large', (req, res) => getFlowerByType('large', req, res));
router.get('/flowers/:type', (req, res) => getFlowerByType(req.params.type, req, res));


export default router;
