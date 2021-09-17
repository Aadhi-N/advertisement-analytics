import React, { useRef, useEffect, useState } from 'react';
import {ReactComponent as Marker1 } from "../../assets/logo.svg"

import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSuperCluster from "use-supercluster";
import { Container, ButtonGroup, Button, Slider } from "@material-ui/core";

import "./Map.styles.css";
import { fetchData } from "../../services/statsDaily.service";
import MapContainer from './MapContainer';


const Map = ({ mapsData }) => {

    const [timeline, setTimeline] = useState('daily');
    const toggleTimeline = (timeline) => {
        setTimeline(timeline);
    };

    const marks = [
        {
          value: 0,
          label: '1pm',
        },
        {
          value: 1,
          label: '20°C',
        },
        {
          value: 2,
          label: '37°C',
        },
        {
          value: 3,
          label: '100°C',
        },
        {
            value: 4,
            label: '100°C',
        },
        {
            value: 5,
            label: '100°C',
        },
        {
            value: 6,
            label: '100°C',
        },
      ];
      
      function valuetext(value) {
        return `${value} PM`;
      }

    return (
        <main>
            <h1>Events by Location</h1>
            <ButtonGroup className="timeline-btns" color="primary" aria-label="outlined primary button group">
                <Button variant={timeline === "hourly" ? "contained" : "outlined"} onClick={()=> toggleTimeline('hourly')}>Hourly</Button>
                <Button variant={timeline === "daily" ? "contained" : "outlined"} onClick={()=> toggleTimeline('daily')}>Daily</Button>
            </ButtonGroup>
            <Slider
                aria-label="Always visible"
                defaultValue={1} 
                step={1} 
                min={1} 
                max={24}
                getAriaValueText={valuetext}
                marks={marks}
                valueLabelDisplay="on"
            />
            <div style={{paddingTop: "30px"}} >

                {mapsData ? (
                    <MapContainer mapsData={mapsData}/>
                ) : <p>Loading map...</p> }
            </div>
           
        </main>
    )
  
};

export default Map;