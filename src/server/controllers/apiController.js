import axios from "axios";
import saveWeatherData from "../models/weatherModel.js";
import config from "../config/config.js";

const apiController = {
    async extensiveWeatherForecast(latitude, longitude) {

        try {
            const location = `${latitude},${longitude}`;
            const url = `https://pfa.foreca.com/api/v1/forecast/15minutely/${location}`;
            const { tz, periodsNowcastLong, dataset, tempunit, windunit, lang, rounding } = config.weatherParameters;
            const params = {
                periodsNowcastLong,
                tempunit,
                windunit,
                tz,
                dataset,
                lang,
                rounding,
            };

            const { data } = await axios.get(url, {
                headers: { Authorization: `Bearer ${config.api.token}` },
                params,
            });

            const { time, symbol, temperature, feelsLikeTemp, relHumidity, dewPoint, windDir, windSpeed, windGust, precipProb, snowRate, precipRate, cloudiness, thunderProb, uvIndex, pressure, precipType } = data.forecast[0];
            const weatherData = { latitude, longitude, time, symbol, temperature, feelsLikeTemp, relHumidity, dewPoint, windDir, windSpeed, windGust, precipProb, snowRate, precipRate, cloudiness, thunderProb, uvIndex, pressure, precipType,
            };

            await saveWeatherData(weatherData);
        } catch (err) {
            console.error("Помилка отримання прогнозу погоди:", err.message);
        }
    },
}

export default apiController;