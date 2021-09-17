import React, { useRef, useEffect, useState } from 'react';

import { fetchData } from '../../services/statsDaily.service';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Map.styles.css";

 
mapboxgl.accessToken = '';


const Map = ({ mapsData}) => {

    const [data, setData] = useState(null);
    //   console.log('maps', mapsData)

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-123.0884); 
    const [lat, setLat] = useState(49.2965);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        return setData(mapsData)
    })

    // need to get mapsData loaded before creating mapbox

    useEffect(() => {
        if (!mapsData) {
            console.log('loading map data')
            return;
        } else {
            console.log('map loaded')
            if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom
            })
        }
            
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('load', () => {
            let marker;
            mapsData.forEach((date) => {
                 marker = new mapboxgl.Marker()
                                .setLngLat([date.lon,date.lat])
                                .setPopup(new mapboxgl.Popup({ offset: 30 })
                                .setHTML('<h4>' + date.name + '</h4>' + date.date))
                                .addTo(map.current);
    
                })
                            
            return marker;
        })
    })

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
    <main>
        <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
    </main>
    )
};

export default Map;