import { Router } from 'express';
import { userFromToken } from '../middlewares/JwtMiddleware.js';
import { getCity } from '../middlewares/getCitiesMiddleware.js';
import { getWeather } from '../controllers/WeatherController.js';

const router = Router();

router.get('/weather', userFromToken, getCity, getWeather);

export default router;