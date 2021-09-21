import {useState, useRef} from 'react';
import {render} from 'react-dom';

/* Styles imports */
import "./Map.styles.css";

/* React wrapper for Mapbox imports */
import MapGL, {Source, Layer} from 'react-map-gl';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN; 

const data = require("../../assets/output-file1.json");


const MapContainer = ({ hourlyData }) => {
    // console.log('d', data)
  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });
  
  const mapRef = useRef(null);

  const onClick = event => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id; //A unqiue id for the cluster to be used in conjunction with the cluster inspection methods

    const mapboxSource = mapRef.current.getMap().getSource('output-file');

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      setViewport({
        ...viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500
      });
    });
  };

  return (
    <>
      <MapGL
        {...viewport}
        width="900px"
        height="500px"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="output-file"
          type="geojson"
          data={data}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </MapGL>
    </>
  );
};

export default MapContainer;
