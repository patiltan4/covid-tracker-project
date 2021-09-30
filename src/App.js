import { FormControl, Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./App.css";

//https://disease.sh/v3/covid-19/countries

function App() {
    const [countries, setCountries] = useState(["UK", "USA", "INDIA"]);

    useEffect(() => {
        console.log("effect");
        //async
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((resposne) => resposne.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    setCountries(countries);
                });
        };
        getCountriesData();
    }, [countries]);

    return (
        <div className="app">
            <div className="app__header">
                <h1>COVID 19 TRACKER</h1>
                <FormControl className="app__dropdown">
                    <Select variant="outlined" value="abc">
                        {/* Loop through */}

                        {countries.map((country) => (
                            <MenuItem value={country.value}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {/* Header */}
            {/* Title and select */}

            {/* info  */}
            {/* info */}
            {/* info  */}

            {/* Table */}
            {/* Graph */}

            {/* Map */}
        </div>
    );
}

export default App;
