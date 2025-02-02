/*

import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // Додає підтримку CORS для клієнтських запитів

// API Credentials
const API_USER = "wot-killer-254";
const API_PASSWORD = "GALj04KtBfAI";

// Роут для отримання токена
app.post("/api/token", async (req, res) => {
    try {
        const { data } = await axios.post("https://pfa.foreca.com/api/v1/authorize/token", {
            user: API_USER,
            password: API_PASSWORD,
            expire_hours: -1,
        });

        res.json(data); // Повертаємо відповідь клієнту
    } catch (err) {
        console.error("Помилка отримання токена:", err.message);
        res.status(500).json({ error: "Не вдалося отримати токен." });
    }
});

// Роут для пошуку локації
app.get("/api/location/search/:query", async (req, res) => {
    const { query } = req.params; // Отримуємо параметр із URL
    const { lang, country } = req.query; // Отримуємо параметри із запиту
    const token = req.headers.authorization?.split(" ")[1]; // Отримуємо токен із заголовку


    if (!token) {
        console.error("Токен не надано");
        return res.status(400).json({ error: "Токен не надано." });
    }

    try {
        const url = `https://pfa.foreca.com/api/v1/location/search/${query}`;
        
        const params = {
            ...(lang && { lang }), // Додаємо `lang`, якщо він є
            ...(country && { country }), // Додаємо `country`, якщо він є
        };

        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        });

        res.json({data, params}); // Повертаємо дані клієнту
    } catch (err) {
        // Логування помилок
        console.error("Помилка отримання даних локації:", err.message);
        console.error("Стек помилки:", err.stack);
        res.status(500).json({ error: "Не вдалося отримати дані локації." });
    }
});


// Роут для пошуку локації по координатам
app.get("/api/location/coordinates", async (req, res) => {

    const { lat, lon, lang } = req.query; // Отримуємо параметри із запиту
    const token = req.headers.authorization?.split(" ")[1]; // Отримуємо токен із заголовку

    if (!token) {
        console.error("Токен не надано");
        return res.status(400).json({ error: "Токен не надано." });
    }

    try {
        const location = `${lat},${lon}`;
        const url = `https://pfa.foreca.com/api/v1/location/${location}`;
        
        const params = {
            ...(lang && { lang }), // Додаємо `lang`, якщо він є
        };

        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        });

        res.json({data, params}); // Повертаємо дані клієнту
    } catch (err) {
        // Логування помилок
        console.error("Помилка отримання даних локації по координатам:", err.message);
        console.error("Стек помилки:", err.stack);
        res.status(500).json({ error: "Не вдалося отримати дані локації по координатам." });
    }
});

async getToken() {
        
        try {
            const { data } = await axios.post("https://pfa.foreca.com/api/v1/authorize/token", {
                user: config.api.user,
                password: config.api.password,
                expire_hours: -1,
            });

            return data.access_token;
        } catch (err) {
            console.error("Помилка отримання токена:", err.message);
            return ({ error: "Не вдалося отримати токен." });
        }
    },

// Роут для отримання поточних погодних даних
app.get("/api/weather/current", async (req, res) => {
    const { lat, lon, tempunit, windunit, tz, lang, rounding } = req.query; // Отримуємо параметри із запиту
    const token = req.headers.authorization?.split(" ")[1]; // Отримуємо токен із заголовку

    if (!token) {
        console.error("Токен не надано");
        return res.status(400).json({ error: "Токен не надано." });
    }

    try {
        // Формуємо URL із координатами
        const location = `${lat},${lon}`;
        const url = `https://pfa.foreca.com/api/v1/current/${location}`;

        // Формуємо параметри запиту
        const params = {
            ...(tempunit && { tempunit }), // Додаємо `tempunit`, якщо він є
            ...(windunit && { windunit }), // Додаємо `windunit`, якщо він є
            ...(tz && { tz }), // Додаємо `tz`, якщо він є
            ...(lang && { lang }), // Додаємо `lang`, якщо він є
            ...(rounding && { rounding }), // Додаємо `rounding`, якщо він є
        };

        // Відправляємо запит до API
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Додаємо токен до заголовків
            },
            params,
        });

        res.json({ data, params }); // Повертаємо дані клієнту
    } catch (err) {
        // Логування помилок
        console.error("Помилка отримання поточних погодних даних:", err.message);
        console.error("Стек помилки:", err.stack);
        res.status(500).json({ error: "Не вдалося отримати поточні погодні дані." });
    }
});

// Роут для отримання детального прогнозу опадів
app.get("/api/forecast/minutely", async (req, res) => {
    const { lat, lon, tz, periodsNowcastShort } = req.query; // Отримуємо параметри із запиту
    const token = req.headers.authorization?.split(" ")[1]; // Отримуємо токен із заголовку

    try {
        // Формуємо URL із координатами
        const location = `${lat},${lon}`;
        const url = `https://pfa.foreca.com/api/v1/forecast/minutely/${location}`;

        // Формуємо параметри запиту
        const params = {
            ...(tz && { tz }),
            ...(periodsNowcastShort && { periodsNowcastShort }),
        };

        // Відправляємо запит до API
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Додаємо токен до заголовків
            },
            params,
        });

        res.json({ data }); // Повертаємо дані клієнту
    } catch (err) {
        // Логування помилок
        console.error("Помилка отримання поточних погодних даних:", err.message);
        console.error("Стек помилки:", err.stack);
        res.status(500).json({ error: "Не вдалося отримати поточні погодні дані." });
    }
});


// Роут для отримання обширного прогнозу погоди
app.get("/api/forecast/15minutely", async (req, res) => {
    const { lat, lon, tz, periodsNowcastLong, dataset, tempunit, windunit, lang, rounding } = req.query; // Отримуємо параметри із запиту
    const token = req.headers.authorization?.split(" ")[1]; // Отримуємо токен із заголовку

    try {
        // Формуємо URL із координатами
        const location = `${lat},${lon}`;
        const url = `https://pfa.foreca.com/api/v1/forecast/15minutely/${location}`;

        
        // Формуємо параметри запиту
        const params = {
            ...(periodsNowcastLong && { periodsNowcastLong }),
            ...(tempunit && { tempunit }),
            ...(windunit && { windunit }),
            ...(tz && { tz }),
            ...(dataset && { dataset }),
            ...(lang && { lang }),
            ...(rounding && { rounding }),
        };

        console.log(params)

        // Відправляємо запит до API
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Додаємо токен до заголовків
            },
            params,
        });

        res.json({ data }); // Повертаємо дані клієнту
    } catch (err) {
        // Логування помилок
        console.error("Помилка отримання поточних погодних даних:", err.message);
        console.error("Стек помилки:", err.stack);
        res.status(500).json({ error: "Не вдалося отримати поточні погодні дані." });
    }
});

// Запускаємо сервер
const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер запущено на http://localhost:${PORT}`));

// Роут для пошуку локації
export const searchLocation = async (req, res) => {
    console.log("зайшов в searchLocation")
    const { query } = req.params;
    const { lang, country } = req.query;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ error: "Токен не надано." });
    }

    try {
        const url = `https://pfa.foreca.com/api/v1/location/search/${query}`;
        const params = {
            ...(lang && { lang }),
            ...(country && { country }),
        };

        const { data } = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
            params,
        });

        res.json({ data });
    } catch (err) {
        console.error("Помилка отримання даних локації:", err.message);
        res.status(500).json({ error: "Не вдалося отримати дані локації." });
    }
};

// Роут для пошуку локації по координатам
export const searchLocationByCoordinates = async (req, res) => {
    console.log("зайшов в searchLocationByCoordinates")
    const { lat, lon, lang } = req.query; // Отримуємо параметри із запиту
    const token = req.headers.authorization?.split(" ")[1]; // Отримуємо токен із заголовку

    if (!token) {
        console.error("Токен не надано");
        return res.status(400).json({ error: "Токен не надано." });
    }

    try {
        const location = `${lat},${lon}`;
        const url = `https://pfa.foreca.com/api/v1/location/${location}`;

        const params = {
            ...(lang && { lang }), // Додаємо `lang`, якщо він є
        };

        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        });

        res.json({ data, params }); // Повертаємо дані клієнту
    } catch (err) {
        // Логування помилок
        console.error("Помилка отримання даних локації по координатам:", err.message);
        console.error("Стек помилки:", err.stack);
        res.status(500).json({ error: "Не вдалося отримати дані локації по координатам." });
    }
};

// Роут для отримання поточних погодних даних
export const receiveCurrentWeather = async (req, res) => {
    console.log("зайшов в receiveCurrentWeather")
    const { lat, lon, tempunit, windunit, tz, lang, rounding } = req.query; // Отримуємо параметри із запиту
    const token = req.headers.authorization?.split(" ")[1]; // Отримуємо токен із заголовку

    if (!token) {
        console.error("Токен не надано");
        return res.status(400).json({ error: "Токен не надано." });
    }

    try {
        // Формуємо URL із координатами
        const location = `${lat},${lon}`;
        const url = `https://pfa.foreca.com/api/v1/current/${location}`;

        // Формуємо параметри запиту
        const params = {
            ...(tempunit && { tempunit }), // Додаємо `tempunit`, якщо він є
            ...(windunit && { windunit }), // Додаємо `windunit`, якщо він є
            ...(tz && { tz }), // Додаємо `tz`, якщо він є
            ...(lang && { lang }), // Додаємо `lang`, якщо він є
            ...(rounding && { rounding }), // Додаємо `rounding`, якщо він є
        };

        // Відправляємо запит до API
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Додаємо токен до заголовків
            },
            params,
        });

        res.json({ data, params }); // Повертаємо дані клієнту
    } catch (err) {
        // Логування помилок
        console.error("Помилка отримання поточних погодних даних:", err.message);
        console.error("Стек помилки:", err.stack);
        res.status(500).json({ error: "Не вдалося отримати поточні погодні дані." });
    }
};

// Роут для отримання детального прогнозу опадів
export const precipitationForecast = async (req, res) => {
    console.log("зайшов в precipitationForecast")
    const { lat, lon, tz, periodsNowcastShort } = req.query; // Отримуємо параметри із запиту
    const token = req.headers.authorization?.split(" ")[1]; // Отримуємо токен із заголовку

    try {
        // Формуємо URL із координатами
        const location = `${lat},${lon}`;
        const url = `https://pfa.foreca.com/api/v1/forecast/minutely/${location}`;

        // Формуємо параметри запиту
        const params = {
            ...(tz && { tz }),
            ...(periodsNowcastShort && { periodsNowcastShort }),
        };

        // Відправляємо запит до API
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Додаємо токен до заголовків
            },
            params,
        });

        res.json({ data }); // Повертаємо дані клієнту
    } catch (err) {
        // Логування помилок
        console.error("Помилка отримання поточних погодних даних:", err.message);
        console.error("Стек помилки:", err.stack);
        res.status(500).json({ error: "Не вдалося отримати поточні погодні дані." });
    }
};











import express from "express";
import apiController from "../controllers/apiController.js";

const router = express.Router();

router.get("/forecast/15minutely", apiController.extensiveWeatherForecast);

export default router;


*/