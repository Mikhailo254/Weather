/*const fetchLocationSearch = async () => {
    const [token, setToken] = useState(null);
        const [locationData, setLocationData] = useState(null);
        const [coordinatesData, setCoordinatesData] = useState(null);
        const [currentWeatherData, setCurrentWeatherData] = useState(null);
        const [token, setToken] = useState(null);
        const [nowcastLong, setNowcastLong] = useState(null);
        const [error, setError] = useState(null);
        const [nowcastShort, setNowcastShort] = useState(null);
        const [nowcastLong, setNowcastLong] = useState(null);
        const [error, setError] = useState(null);
        const [cityName, setCityName] = useState('');
        const [lon, setLon] = useState('');
        const [lat, setLat] = useState('');
        const latitude = 33.7961;
        const longitude = 49.9740;
        const lang = "pl"; //
        const country = "" //--
        const tz = "Europe/Kyiv"; //
        const tempunit = "C";  //
        const windunit = "MS"; //
        const rounding = 1; //--
        const periodsNowcastShort = 4; //--
        const periodsNowcastLong = 8; //--
        const City = "jilemnice";
        const dataset = "full"; //--

    if (!token) {
        setError("Спочатку потрібно отримати токен.");
        return;
    }

    try {
        const response = await axios.get(
            `http://localhost:3000/api/location/search/${City}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    ...(lang && { lang }), // Додаємо `lang`, якщо він є
                    ...(country && { country }), // Додаємо `country`, якщо він є
                },
            }
        );

        const { data } = response.data;
        setLocationData(data)
        setError(null);
    } catch (err) {
        setError("Не вдалося отримати дані локації. Перевірте запит.");
    }
};

const fetchToken = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/token");
            setToken(response.data.access_token);
            setError(null);
        } catch (err) {
            setError("Не вдалося отримати токен. Перевірте сервер або облікові дані.");
        }
    };

    const fetchNowcastLong = async () => {
        if (!token) {
            setError("Спочатку потрібно отримати токен.");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:3000/api/forecast/15minutely`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    lat: latitude,
                    lon: longitude,
                    tz,
                    periodsNowcastLong,
                    dataset,
                    tempunit,
                    windunit,
                    lang,
                    rounding,
                },
            });

            const { data } = response.data;

            setNowcastLong(data);
            setError(null);
            return data;
        } catch (err) {
            console.error("Помилка отримання даних локації за координатами:", err.message);
            throw err;
        }
    };

const fetchLocationInfoByCoordinates = async () => {
    if (!token) {
        setError("Спочатку потрібно отримати токен.");
        return;
    }

    try {
        const response = await axios.get(
            `http://localhost:3000/api/location/coordinates`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                lat: latitude,
                lon: longitude,
                lang,
            },
        });

        const { data } = response.data;
        setCoordinatesData(data);
        setError(null);
        return data;
    } catch (err) {
        console.error("Помилка отримання даних локації за координатами:", err.message);
        throw err;
    }
};

const fetchCurrentWeather = async () => {
    if (!token) {
        setError("Спочатку потрібно отримати токен.");
        return;
    }

    try {
        const response = await axios.get(
            `http://localhost:3000/api/weather/current`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                lat: latitude,
                lon: longitude,
                lang,
                tz,
                tempunit,
                windunit,
                rounding,
            },
        });

        const { data } = response.data;
        setCurrentWeatherData(data);
        setError(null);
        console.log("Дані поточної погоди:", data);
        return data;
    } catch (err) {
        console.error("Помилка отримання даних поточної погоди:", err.message);
        throw err;
    }
};

const fetchNowcastShort = async () => {
    if (!token) {
        setError("Спочатку потрібно отримати токен.");
        return;
    }

    try {
        const response = await axios.get(
            `http://localhost:3000/api/forecast/minutely`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                lat: latitude,
                lon: longitude,
                tz,
                periodsNowcastShort,
            },
        });

        const { data } = response.data;
        setNowcastShort(data);
        setError(null);
        console.log("Дані локації за координатами:", data);
        return data;
    } catch (err) {
        console.error("Помилка отримання даних локації за координатами:", err.message);
        throw err;
    }
};


<div className="containerButtons">
                    <button className="containerButtons__button" onClick={fetchToken}>Отримати токен</button>
                    <button className="containerButtons__button" onClick={fetchLocationSearch}>Отримати локацію за пошуком</button>
                    <button className="containerButtons__button" onClick={fetchLocationInfoByCoordinates}>Отримати локацію за координатами</button>
                    <button className="containerButtons__button" onClick={fetchCurrentWeather}>Отримати поточну погоду</button>
                    <button className="containerButtons__button" onClick={fetchNowcastShort}>Отримати детальний прогноз опадів</button>
                    <button className="containerButtons__button" onClick={fetchNowcastLong}>Отримати обширний прогноз погоди</button>
                </div>

                {locationData && (
                    <div>
                        <h3>Дані локації:</h3>
                        <pre>{JSON.stringify(locationData, null, 2)}</pre>
                    </div>
                )}

                {coordinatesData && (
                    <div>
                        <h3>Дані локації з координат:</h3>
                        <pre>{JSON.stringify(coordinatesData, null, 2)}</pre>
                    </div>
                )}

                {currentWeatherData && (
                    <div>
                        <h3>Дані поточної погоди:</h3>
                        <pre>{JSON.stringify(currentWeatherData, null, 2)}</pre>
                    </div>
                )}

                {nowcastShort && (
                    <div>
                        <h3>Детальний детальний прогноз опадів:</h3>
                        <pre>{JSON.stringify(nowcastShort, null, 2)}</pre>
                    </div>
                )}

                <div className="container">
                <h1>Foreca API Client</h1>

                <div className="containerButtons">
                    <button className="containerButtons__button" onClick={fetchToken}>Отримати токен</button>
                    <button className="containerButtons__button" onClick={fetchNowcastLong}>Отримати обширний прогноз погоди</button>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {token && (
                    <div className="token">
                        <h3>Токен:</h3>
                        <p>{token}</p>
                    </div>
                )}

                {nowcastLong && (
                    <div className="nowcastLong">
                        <h3>Детальний детальний прогноз опадів:</h3>
                        <pre>{JSON.stringify(nowcastLong, null, 2)}</pre>
                    </div>
                )}
            </div>

*/