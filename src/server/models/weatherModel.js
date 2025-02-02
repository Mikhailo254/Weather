import { pool } from "../config/db.js";

const saveWeatherData = async (weatherData) => {
    try {
        const query = `
            INSERT INTO weatherparameters (lon, lat, recording_time, symbol, temperature, feels_like_temp, rel_humidity, dew_point, wind_dir, wind_speed, wind_gust, precip_prob, snow_rate, precip_rate, cloudiness, thunder_prob, uv_index, pressure, precip_type )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *;
        `;
        const values = [
            weatherData.longitude,
            weatherData.latitude,
            weatherData.time,
            weatherData.symbol,
            weatherData.temperature,
            weatherData.feelsLikeTemp,
            weatherData.relHumidity,
            weatherData.dewPoint,
            weatherData.windDir,
            weatherData.windSpeed,
            weatherData.windGust,
            weatherData.precipProb,
            weatherData.snowRate,
            weatherData.precipRate,
            weatherData.cloudiness,
            weatherData.thunderProb,
            weatherData.uvIndex,
            weatherData.pressure,
            weatherData.precipType
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Помилка запису в БД:", error.message);
        throw error;
    }
};

export default saveWeatherData;
