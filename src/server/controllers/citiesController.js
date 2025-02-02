import City from '../models/cityModel.js';

const citiesController = {
    async getCities(req, res) {
        try {
            const cities = await City.getAllCities();
            res.status(200).json(cities);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cities', error });
        }
    },

    async addCity(req, res) {
        try {
            const { name_cities, lon, lat } = req.body;
            const newCity = await City.addCity(name_cities, lon, lat);
            res.status(201).json(newCity);
        } catch (error) {
            res.status(500).json({ message: 'Error adding city', error });
        }
    },

    async deleteCity(req, res) {
        
        try {
            const { cityName } = req.params;
            const success = await City.deleteCity(cityName);
            if (success) res.status(200).json({ message: 'City deleted successfully' });
            else res.status(404).json({ message: 'City not found' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting city', error });
        }
    },
};

export default citiesController;