import { pool } from '../config/db.js';

const City = {
    async getAllCities() {
        try {
            const result = await pool.query('SELECT * FROM cities');

            return result.rows;
        } catch (error) {
            console.error('Помилка при отриманні міст:', error);
            throw new Error('Не вдалося отримати список міст');
        }
    },

    async addCity(name_cities, lon, lat) {
        try {
            const result = await pool.query(
                'INSERT INTO cities (name_cities, lon, lat) VALUES ($1, $2, $3) RETURNING *',
                [name_cities, lon, lat]
            );

            return result.rows[0];
        } catch (error) {
            //console.error('Помилка при додаванні міста:', error);
            throw new Error('Не вдалося Додати місто');
        }
    },

    async deleteCity(cityName) {
        try {
            const result = await pool.query('DELETE FROM cities WHERE name_cities = $1 RETURNING *', [cityName]);
            return result.rowCount > 0;
        } catch (error) {
            console.error('Помилка при видаленні міста:', error);
            throw new Error('Не вдалося видалити місто');
        }
    },
};

export default City;