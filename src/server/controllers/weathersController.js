import Weather from '../models/weatherModel.js';

const weathersController = {
    async getWeatherInTheCity(req, res) {

        try {
            const { cityName } = req.params;
            const { lon, lat } = req.query;
            const weather = await Weather.getWeatherInTheCity(cityName, lon, lat);
            res.status(200).json(weather);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cities', error });
        }
    },
};

export default weathersController;