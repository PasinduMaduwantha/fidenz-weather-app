import express from 'express';
import { checkJwt, addUserInfo } from '../middleware/auth.js';
import { getAllWeather, getWeatherByCity } from '../controllers/weatherController.js';

const router = express.Router();

router.use(checkJwt);
router.use(addUserInfo);

router.get('/', getAllWeather);
router.get('/:cityId', getWeatherByCity);

export default router;
