import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";

//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
//http://osm.org/copyright
const Map = ({center, zoom}) => {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreet</a> contributors'
                />
            </LeafletMap>
        </div>
    );
};

export default Map;
