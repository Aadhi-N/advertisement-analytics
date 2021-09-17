import React, { useRef, useEffect, useState } from 'react';
import {ReactComponent as Marker1 } from "../../assets/logo.svg"
import useSwr from "swr";

import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSuperCluster from "use-supercluster";

import "./Map.styles.css";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const MapContainer = ( { mapsData}) => {

    // const url =
    // "http:/localhost:5555/events/location";

    // const { mapsData, error } = useSwr(url, { fetcher });
    const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
    const { data, error } = useSwr(url, { fetcher });
    const crimes = data && !error ? data.slice(0, 20) : [];
      
    // /* Variables */
    const [viewPort, setViewPort] = useState({
        latitude: 43.6532,
        longitude: -79.3832,
        width: "60vw",
        height: "60vh",
        zoom: 10
    });

    const mapRef = useRef(); //bounds of map

    // const data = mapsData && !error ? mapsData.slice(0, 10) : [];

    const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

    const points = crimes.map(item => ({
        type: "Feature",
        properties: {
            cluster: false,
            locationId: item.date,
            location: item.name,
        },
        geometry: { type: "Point", coordinates: [item.lon, item.lat] }
    }));


    const { supercluster }  = useSuperCluster({
        points,
        zoom: viewPort.zoom,
        bounds: [bounds],
        options: { radius: 75, maxZoom: 20}
    });

    console.log('clusters', supercluster)
    return (
        <ReactMapGL 
                    {...viewPort}
                    maxZoom={20}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    mapStyle={"mapbox://styles/mapbox/streets-v11"}
                    onViewportChange={viewPort => { setViewPort(viewPort) }}
                    ref={mapRef}
                >
                
                {crimes.map((location, index) => (
                    <Marker key={index} latitude={location.lat} longitude={location.lon}>
                        <button className="crime-marker">

                            <img src="./marker.svg" alt="map circle marker"/>
                        </button>
                    </Marker>
                ))}

                   
                       
                    

                </ReactMapGL>
    )
};

export default MapContainer;





// {supercluster.map(cluster => {
//     const [longitude, latitude] = cluster.points.coordinates;
//     const { cluster : isCluster, pointCount: pointCount } = cluster.properties;

//     if (isCluster) {
//         return <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
//             <div className="cluster-marker">
//                 {pointCount}
//             </div>
//         </Marker>
//     }

//     return (
//         <Marker key="" latitude={latitude} longitude={longitude}>
//             <button className="crime-marker">

//                 <img src="./marker.svg" alt="map circle marker"/>
//             </button>
//             </Marker> 
//     )
// })}