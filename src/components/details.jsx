import React from "react";
import {iconUrlFromCode} from "../services/weatherService";

export const Details = ({items, weather:{dt,timezone}}) => {
    
    return (
        
        <div className="days">

            {items.map(item => (

                    <div className="day1">

                    <h1>{item.title}</h1>
                    <p>{item.date}</p>
                    <img
                        src = {iconUrlFromCode(item.icon)}
                        size={70}
                    />
                    <p>{`${item.temp.toFixed()}°C`}</p>
                    <h4>{item.description}</h4>

                </div>

            ))}

        </div>
                    
        
    );
};