import React, { useState } from "react";
import './App.scss';

const App = () => {
    const [cityName, setCityName] = useState('');
    const [lon, setLon] = useState('');
    const [lat, setLat] = useState('');


    const addCity = async (cityName, lon, lat) => {
        const response = await fetch('http://localhost:3000/dbQueries/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name_cities: cityName,
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

    const handleAddCity = () => {
        addCity(cityName, parseFloat(lon), parseFloat(lat));
    };

    const handleDeleteCity = () => {
        deleteCity(cityName);
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
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
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
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                    <button onClick={handleDeleteCity}>Delete City</button>
                </div>
            </div>
        </>

    );
};

export default App;
