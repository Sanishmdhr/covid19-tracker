import React from 'react';
import "../css/Map.css";
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../util';
function Map({ center, zoom, countries, casesType }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreet</a> contributors'>
        </TileLayer>
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map
