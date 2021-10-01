//utilities
import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",

        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 80,
    },
    recovered: {
        hex: "#7dd71d",

        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 120,
    },
    deaths: {
        hex: "#fb4443",

        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 200,
    },
};

export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
};

//draw circles on map
export const showDataOnMap = (data, casesType = "cases") =>
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) *
                casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div>
                    <div
                        style={{
                            backgroundImage: `url(${country.countryInfo.flag})`,
                        }}
                    />
                    <div>{country.country}</div>
                    <div>Cases: {numeral(country.cases).format("0,0")}</div>
                    <div>
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ));
