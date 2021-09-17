import React, { useRef, useEffect, useState } from 'react';
import {ReactComponent as Marker1 } from "../../assets/logo.svg"

import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSuperCluster from "use-supercluster";

import "./Map.styles.css";
import { fetchData } from "../../services/statsDaily.service";
import MapContainer from './MapContainer';


const Map = ({ mapsData }) => {


    return (
        <main>
            <button>EVENTS PER HOUR</button>
            <button>EVENTS PER DAY</button>
            {mapsData ? (
                <MapContainer mapsData={mapsData}/>
            ) : <p>Loading map...</p> }
           
        </main>
    )
  
};

export default Map;