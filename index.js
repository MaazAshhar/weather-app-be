import express, { urlencoded } from "express";
import UserRoutes from './routes/UserRoutes.js';
import CityRoutes from './routes/CityRoutes.js';
import WeatherRoutes from './routes/WeatherRoutes.js';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import connectDB from "./config/database.js";
import cors from 'cors';
dotenv.config();


const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(urlencoded({ extended: false }));
app.use(cors());
connectDB();


app.use('/', UserRoutes);
app.use('/', CityRoutes);
app.use('', WeatherRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});