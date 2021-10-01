import {
    FormControl,
    Select,
    MenuItem,
    Card,
    CardContent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import "./App.css";
import { sortData } from "./util";

//https://disease.sh/v3/covid-19/countries

function App() {
    //countries for dropdown option
    //country for selected option from dropdown menu
    //countryInfo for data related to after selecting option
    //tableData for data inside tables
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("Worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

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

                    const sortedData = sortData(data);
                    setTableData(sortedData);
                    setCountries(countries);
                });
        };
        getCountriesData();
    }, []);

    //for selected option to listen
    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        console.log(countryCode);

        //https://disease.sh/v3/covid-19/all
        //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]

        const url =
            countryCode === "Worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCountry(countryCode);

                //All of the data from country response
                setCountryInfo(data);
            });
    };
    console.log("country data", countryInfo);

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>COVID 19 TRACKER</h1>
                    <FormControl className="app__dropdown">
                        <Select
                            variant="outlined"
                            onChange={onCountryChange}
                            value={country}
                        >
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
                    <InfoBox
                        title="Covid Cases"
                        cases={countryInfo.todayCases}
                        total={countryInfo.cases}
                    />

                    <InfoBox
                        title="Recovered"
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}
                    />

                    <InfoBox
                        title="Deaths"
                        cases={countryInfo.todayDeaths}
                        total={countryInfo.deaths}
                    />
                </div>

                {/* info  */}
                {/* info */}
                {/* info  */}

                {/* Map */}
                <Map />
            </div>
            <Card className="app__right">
                <CardContent>
                    {/* Table */}
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />

                    <h3>Worldwide new cases</h3>
                    {/* Graph */}
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
