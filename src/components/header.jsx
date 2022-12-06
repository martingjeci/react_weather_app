import React from "react";
import { useState } from "react";


export const Header = ({setQuery}) => {
    const[city, setCity] = useState("");

    const handleSearch = () => {
        if (city !== ''){
            setQuery({q: city})
        } 
    }

    return (
        <div className="top">

           <div className="title_div">
                <h1 className="title">7-Day Forecast.</h1>
            </div>

            <div className="city">
                <div className="comp">
                    <input 
                        className="searchbar"
                        placeholder="Search City..."
                        value={city}
                        onChange={(e) => setCity(e.currentTarget.value)}
                    />
                    <button className="searchbtn" onClick={(handleSearch)}>Search</button>
                </div>
            </div>

        </div>
    );
};