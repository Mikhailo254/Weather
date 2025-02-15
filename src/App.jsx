import React from "react";
import { useEffect, useState } from "react";
import './App.scss';

const App = () => {
    const [dataWeather, setDataWeather] = useState(null);
    const [dataCities, setDataCities] = useState(null);
    const [nameCities, setNameCities] = useState(null);
    const [selectedCity, setSelectedСity] = useState('');
    const [loading, setLoading] = useState(true);
    const [addingCityName, setAddingCityName] = useState('');
    const [deleteCityName, setDeleteCityName] = useState('');
    const [lon, setLon] = useState('');
    const [lat, setLat] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const result = await getCities();
            setDataCities(result);
            setNameCities(result.map(city => city.name_cities));
            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        if (nameCities)
            setSelectedСity(nameCities[0])

    }, [nameCities]);

    useEffect(() => {
        if (selectedCity) {
            const loadData = async () => {
                const result = await getWeather(selectedCity);
                setDataWeather(result);
            };
            loadData();
        }

    }, [selectedCity]);


/*
        useEffect(() => {
            console.log("dataCities: " + JSON.stringify(dataCities, null, 2));
            console.log("nameCities: " + nameCities);
            console.log("loading: " + loading);
            console.log("dataWeather " + JSON.stringify(dataWeather, null, 2));
        }, [dataCities, nameCities, loading, dataWeather]);
*/

    const addCity = async (addingCityName, lon, lat) => {
        const response = await fetch('http://localhost:3000/dbQueries/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name_cities: addingCityName,
                lon: lon,
                lat: lat,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('City added successfully:', result);
        } else {
            console.error('Failed to add city:', response.statusText);
        }
    };

    const getCities = async () => {
        const response = await fetch('http://localhost:3000/dbQueries/cities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error('Failed to get cities:', response.statusText);
        }
    };

    const deleteCity = async (cityName) => {
        const response = await fetch(`http://localhost:3000/dbQueries/cities/${cityName}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`City with ID ${cityName} deleted successfully.`);
        } else {
            console.error('Failed to delete city:', response.statusText);
        }
    };

    const getWeather = async (cityName) => {
        let lon = '';
        let lat = '';
        dataCities.forEach((item) => {
            if (item.name_cities === cityName) {
                lon = item.lon;
                lat = item.lat;
            }
        });

        const response = await fetch(`http://localhost:3000/dbQueries/weathers/${cityName}?lon=${lon}&lat=${lat}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();

            return result;
        } else {
            console.error('Failed to get weather:', response.statusText);
        }
    };

    const handleAddCity = () => {
        addCity(addingCityName, parseFloat(lon), parseFloat(lat));
    };

    const handleDeleteCity = () => {
        deleteCity(deleteCityName);
    };



    return (
        <>
            <div>
                <h1>Manage Cities</h1>
                <div>
                    <h2>Add City</h2>
                    <input
                        type="text"
                        placeholder="City Name"
                        value={addingCityName}
                        onChange={(e) => setAddingCityName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Longitude"
                        value={lon}
                        onChange={(e) => setLon(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                    <button onClick={handleAddCity}>Add City</button>
                </div>
                <div>
                    <h2>Delete City</h2>
                    <input
                        type="text"
                        placeholder="City Name"
                        value={deleteCityName}
                        onChange={(e) => setDeleteCityName(e.target.value)}
                    />
                    <button onClick={handleDeleteCity}>Delete City</button>
                </div>
                {loading && <p>Завантаження...</p>}


                <div>
                    <label>Виберіть місто:</label>
                    <select value={selectedCity} onChange={(e) => setSelectedСity(e.target.value)}>
                        {!loading &&
                            nameCities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <label>Погода по обраному місту:</label>
                    <pre>{JSON.stringify(dataWeather, null, 2)}</pre>
                </div>
            </div>
        </>

    );
};

export default App;
