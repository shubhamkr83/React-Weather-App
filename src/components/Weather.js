import React, { useEffect, useState } from 'react';
import { FaStreetView } from "react-icons/fa";
import "./style.css";

const Weather = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Barun");

    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=523df27c7c6211cb898451283d346719`
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson.main);
        };
        fetchApi();
    }, [search])

    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input type="search" className="inputField" value={search} placeholder="search your city" onChange={(event) => {
                        setSearch(event.target.value)
                    }} />
                </div>

                {!city ? (
                    <p>No Data Found 😯</p>
                ) : (
                    <>
                        <div className="info">
                            <h2 className="location">
                                <FaStreetView /> {search}
                            </h2>
                            <h1 className="temp"> Temp {city.temp}°C </h1>
                            <h3 className="temp_max"> Min-Temp {city.temp_min}°C | Max-Temp {city.temp_max}°C</h3>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Weather;
