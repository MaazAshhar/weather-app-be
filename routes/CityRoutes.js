import { Router } from 'express';
import { addCity, getCityById, removeCity, updateCity } from '../controllers/CityController.js';
import { userFromToken } from '../middlewares/JwtMiddleware.js';

const router = Router();

router.post('/city', userFromToken, addCity);
router.delete('/city/:id', userFromToken, removeCity);
router.get('/city/:id', userFromToken, getCityById);
router.put('/city/:id', userFromToken, updateCity);


export default router;