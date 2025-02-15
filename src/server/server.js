import cors from 'cors';
import express from "express";
import config from "./config/config.js";
import citiesRoutes from './routes/cities.js';
import weathersRoutes from './routes/weathers.js';
import scheduleWeatherUpdates from "./cronSchedule.js";


const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Дозволяємо доступ лише з цього фронтенду
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Дозволені HTTP-методи
    credentials: true // Дозволяє передавати кукі між клієнтом і сервером
}));
app.use(express.json());
app.use('/dbQueries/cities', citiesRoutes);
app.use('/dbQueries/weathers', weathersRoutes);

// Запускаємо розклад АПІ-запитів
scheduleWeatherUpdates();

// Запуск сервера
const PORT = process.env.PORT || config.server.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
