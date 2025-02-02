import express from "express";
const router = express.Router();
import citiesController from '../controllers/citiesController.js';

router.get('/', citiesController.getCities);
router.post('/', citiesController.addCity);
router.delete('/:cityName', citiesController.deleteCity);

export default router;