import moment from "moment";

import { useState, useEffect } from "react";

import { Container, ButtonGroup, Button } from "@material-ui/core";

import { ComposedChart, Area, Scatter, Bar, BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import "./Charts.styles.css";

const RevenueChart = ({ statsDaily, statsHourly }) => {
    
    const [timeline, setTimeline] = useState('daily');

  
    if (!statsDaily) return (<p>Loading...</p>);
    if (!statsHourly) return (<p>Loading...</p>);


    const toggleTimeline = (timeline) => {
        setTimeline(timeline);
    };

    const dailyChartData = (
        <>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" label={{ value: 'Date', position: 'bottom', offset: 0 }} scale="band" tickFormatter = {(unixTime) => moment(unixTime).format('MMM D')} />
            <YAxis label={{ value: 'Revenue ($)', angle: -90, position: 'left' }} />      

            <Tooltip labelFormatter={(date) => 'Date: '+ moment(date).format('MMMM D, YYYY')} 
            formatter={(value, name) => [(name === "revenue" ? `$${parseFloat(value).toFixed(2)}` : value.toLocaleString()), (name.charAt(0).toUpperCase() + name.slice(1))]} />
            <Legend verticalAlign="top" height={30}/>
            <Bar dataKey="revenue" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="clicks" stroke="#ff7300" />
        </>
    );

    const hourlyChartData = (
        <>
            <CartesianGrid stroke="#f5f5f5" />

            <XAxis dataKey="hour" label={{ value: 'Hourly Breakdown Per Day', position: 'bottom', offset: 0 }} scale="auto" 
            tickFormatter={(hour) => moment(hour * 1000).format('h:mm a')} 
             />
            
            <YAxis label={{ value: 'Revenue ($)', angle: -90, position: 'left' }} />      

            <Tooltip 
                labelFormatter={(hour, date) => ("Time/Date: " + moment(hour).format('h:mm a') + moment(date).format('MMMM D, YYYY'))} 
                formatter={(value, name) => [(name === "revenue" ? `$${parseFloat(value).toFixed(2)}` : value.toLocaleString()), (name.charAt(0).toUpperCase() + name.slice(1))]}
            />
            
            <Legend verticalAlign="top" height={30}/>
            <Bar dataKey="revenue" barSize={20} fill="#413ea0" />

            <Line type="monotone" dataKey="clicks" stroke="#ff7300" />
        </>
    )

    return (
        <Container fixed> <h1>Revenue</h1>
            
            <div style={{ width: '100%', height: 300, position:"relative" }}>
                <ButtonGroup className="timeline-btns" color="primary" aria-label="outlined primary button group">
                    <Button variant={timeline === "hourly" ? "contained" : "outlined"} onClick={()=> toggleTimeline('hourly')}>Hourly</Button>
                    <Button variant={timeline === "daily" ? "contained" : "outlined"} onClick={()=> toggleTimeline('daily')}>Daily</Button>
                </ButtonGroup>
                <ResponsiveContainer width="50%" height="100%">
                    <ComposedChart
                        width={500}
                        height={400}
                        data={timeline === 'daily' ? statsDaily : statsHourly.flat()}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                    { timeline === "daily" ? dailyChartData : hourlyChartData }
                    
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Container>
    )
};

export default RevenueChart;

