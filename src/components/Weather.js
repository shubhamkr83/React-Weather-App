import React, { useEffect, useState } from 'react';
import { FaStreetView } from "react-icons/fa";
import { FaTemperatureLow } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import hue from "../img/hue.png";
import pre from "../img/pre.png";
import webimg from "../img/webbg.png";
import tempc from "../img/tempc.gif";
// import sunny from "../img/sunny.png";
import rain from "../img/rain.png";
// import cloudy from "../img/cloudy.png";
// import thunder from "../img/storm.png";
import "./style.css";

const Weather = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=523df27c7c6211cb898451283d346719`;
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson.main);
        };
        fetchApi();
    }, [search])


    // ------------- setup date, day and time --------------
    const d = new Date();
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const currDate = new Date().toLocaleDateString();

    let currTime = new Date().toLocaleTimeString();

    const [ctime, setCtime] = useState(currTime);

    const UpdateTime = () => {
        currTime = new Date().toLocaleTimeString();
        setCtime(currTime);
    };
    setInterval(UpdateTime, 1000);

    const day = weekday[d.getDay()];


    return (
        <>
            <div className="weather_main">
                <h1>Mausam App</h1>
                <div className="weather_center">

                    {/*---------- Top section -----------*/}
                    <div className="top">
                        <div className="day">
                            <h3> {day} | {currDate} </h3>
                        </div>

                        <div>
                            <h2>Shubham Kumar</h2>
                        </div>

                        <div className="time">
                            <h3>{ctime}</h3>
                        </div>
                    </div>

                    {/*---------- input section -----------*/}
                    <div className="searchBox">
                        <input type="search" className="searchText" value={search} placeholder="search your city" onChange={(event) => {
                            setSearch(event.target.value)
                        }} />
                        <FaSearch className="search_icon" />
                    </div>


                    {!city ? (
                        <img src={webimg} alt="weather img" id="error_message" />
                    ) : (
                        <>
                            {/*---------- weather status -----------*/}
                            <div className="wea_status">
                                <img src={rain} alt="weimg" />
                            </div>


                            {/*---------- name,temp section -----------*/}
                            <div className="city_name">
                                <h1>
                                    <FaStreetView className="street_icon" /> {search}
                                </h1>
                                {/* <h2>{city.weather[].main}</h2> */}
                                <h2> <img src={tempc} alt="temp_img" className="tempc_icon" /> Temp {city.temp}°C </h2>
                            </div>


                            {/*---------- Weather info section -----------*/}
                            <div className="wea_info">
                                <div className="wea_info_left">
                                    <h3> <FaTemperatureLow className="tempn_icon" /> Min-Temp {city.temp_min}°C </h3>
                                    <h3> <img src={pre} alt="img" className="pre_icon" /> Pressure {city.pressure}°C </h3>
                                </div>
                                <div className="wea_info_right">
                                    <h3> <FaTemperatureHigh className="tempx_icon" /> Max-Temp {city.temp_max}°C</h3>
                                    <h3> <img src={hue} alt="img" className="hue_icon" /> Humidity {city.humidity}%</h3>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Weather;
