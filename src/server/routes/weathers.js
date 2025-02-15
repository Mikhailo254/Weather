import express from "express";
const router = express.Router();
import weathersController from "../controllers/weathersController.js";


router.get('/:cityName/', weathersController.getWeatherInTheCity);

export default router;