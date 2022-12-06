import { DateTime } from "luxon";

const API_KEY = "34013a0d8bef051e4f95a0e5eca6a345";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


const getWeatherData = (infoType , searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY });

    return fetch(url)
     .then( (res) => res.json() )
};


const formatCurrentWeather = (data) => {
    const {
        coord: {lat,lon},
        weather,
        
    } = data

    const {main: details, icon} = weather[0];

    return{lat,lon,details,icon};
}

const formatForcastWeather = (data) => {
    let {timezone,daily} = data;

    daily = daily.slice(0,7).map(d => {
        return{
            title : formatToLocalTime(d.dt,timezone,"ccc"),
            temp : d.temp.day,
            icon : d.weather[0].icon,
            description : d.weather[0].main,
            date : formatToLocalTime(d.dt,timezone,"dd / MM / yyyy")
        }
    });


    return{timezone,daily};
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

    const {lat , lon} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
        lat,
        lon,
        exclude: 'current,minutely,hourly,alerts',
        units: searchParams.units
    }).then(formatForcastWeather)

    return {...formattedCurrentWeather,...formattedForecastWeather};
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;


export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};