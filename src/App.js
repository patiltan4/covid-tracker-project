import { FormControl, Select, MenuItem, Card, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

//https://disease.sh/v3/covid-19/countries

function App() {
    //countries for dropdown option
    //country for selected option from dropdown menu
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("Worldwide");

    useEffect(() => {
        
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

    //for selected option to listen
    const onCountryChange = (event) => {
      const countryCode = event.target.value;
      console.log(countryCode);
      setCountry(countryCode);
    }

    return (
        <div className="app">
          <div className="app__left">
            <div className="app__header">
                  <h1>COVID 19 TRACKER</h1>
                  <FormControl className="app__dropdown">
                      <Select variant="outlined" onChange={onCountryChange} value={country}>
                          {/* Loop through */}
                          <MenuItem value="Worldwide">Worldwide</MenuItem>

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


              <div className="app__stats">
                    <InfoBox title="Covid Cases" cases={12487} total ={2000} />

                    <InfoBox title="Recovered" cases={1245} total ={2000}/>

                    <InfoBox title="Deaths" cases={12499} total ={2000}/>
              </div>

              {/* info  */}
              {/* info */}
              {/* info  */}

              

              {/* Map */}
              <Map />
          </div>
          <Card className="app__right">
            <CardContent>
              <h3>Live Cases by Country</h3>
                {/* Table */}

              <h3>Worldwide new cases</h3>
                {/* Graph */}
            </CardContent>
          </Card> 
        </div>
    );
}

export default App;
