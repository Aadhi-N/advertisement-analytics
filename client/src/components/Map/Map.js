import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";


import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSuperCluster from "use-supercluster";
import { Container, ButtonGroup, Button, Slider } from "@material-ui/core";


import "./Map.styles.css";
import MapContainer from './MapContainer';


const Map = ({ mapsData, poiData }) => {
    const [dateInput, setDateInput] = useState('2017-01-01T05:00:00.000Z');
    const [hourlyData, setHourlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);

    const handleChange = (newValue) => {
      setDateInput(newValue);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log('dateInput', dateInput)
      axios
      .post(`http://localhost:5555/events/${dateInput}/hourly`, {date: dateInput})
      .then((res) => {
        console.log('res.data', res.data)
        setHourlyData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
    };


    const [timeline, setTimeline] = useState('daily');
    const toggleTimeline = (timeline) => {
        setTimeline(timeline);
    };


    return (
        <main>
            <h1>Events by Location</h1>


            <form onSubmit={handleSubmit}>        
              <label>Date:
                <input name="date" type="text" value={dateInput}/>        
              </label>
              <input type="submit" value="Submit" />
            </form>

           
           
            <ButtonGroup className="timeline-btns" color="primary" aria-label="outlined primary button group">
                <Button variant={timeline === "hourly" ? "contained" : "outlined"} onClick={()=> toggleTimeline('hourly')}>Hourly</Button>
                <Button variant={timeline === "daily" ? "contained" : "outlined"} onClick={()=> toggleTimeline('daily')}>Daily</Button>
            </ButtonGroup>
            
        <input type="date" id="start" name="trip-start"
              value="2018-07-22"
              min="2018-01-01" max="2018-12-31"/>

            <div style={{paddingTop: "30px"}} >

                {mapsData ? (
                    <MapContainer hourlyData={hourlyData}/>
                ) : <p>Loading map...</p> }
            </div>
           
        </main>
    )
  
};

export default Map;