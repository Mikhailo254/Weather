import cron from "node-cron";
import apiController from "./controllers/apiController.js";
import City from "./models/cityModel.js";

const scheduleWeatherUpdates = () => {
    
    cron.schedule("*/1 * * * *", async () => {
        const cities = await City.getAllCities();
        const latitude = cities.map(city => city.lat);
        const longitude = cities.map(city => city.lon);
        const citiesNum = cities.map(city => city.name_cities);

        try {
            for (let i = 0; i < citiesNum.length; i++) {
                await apiController.extensiveWeatherForecast(latitude[i], longitude[i]);
            }
            console.log("Виконання періодичного API-запиту до Foreca");
        } catch (error) {
            console.error("Помилка під час періодичного API-запиту:", error.message);
        }
    });
};

export default scheduleWeatherUpdates;
