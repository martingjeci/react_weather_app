import React from "react";
import {Details} from "./components/details";
import {Header} from "./components/header";
import "./App.css"
import getFormattedWeatherData from "./services/weatherService";
import { useState } from "react";
import { useEffect } from "react";



const App = () => {
    let City
    //this will get city name from CRM field, unncoment this when running it in crm
    //@ts-ignore
    City = window.parent.Xrm.Page.getAttribute("fisoft_cityname").getValue(); 
    if (City == null || City == '' || City == undefined){
        City = 'london';
    }

    const [query,setQuery] = useState({q: `${City}`})
    //const [query,setQuery] = useState({q: 'london'})
    const [units, setUnits] = useState('metric')
    const [weather,setWeather] = useState(null)

    useEffect( () => {
        const fetchWeather = async() => {
            await getFormattedWeatherData({...query,units}).then(
                (data) => {
                    setWeather(data);
                });
        };
    
        fetchWeather();
    }, [query,units]);

    return(
        <div className="app">

            {/* <Header setQuery = {setQuery}/> */}
            <div className="top">

                <div className="title_div">
                    <h1 className="title">{City.toUpperCase()}</h1>
                </div>
            </div>
            {weather && (
                <div>
                    <Details weather = {weather} items={weather.daily}/>
                </div>
            )}

        </div>
    );
}

export default App;