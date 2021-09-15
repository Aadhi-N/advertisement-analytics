import axios from "axios";
import moment from "moment";

import { useState, useEffect } from "react";

import { ButtonGroup, Button } from "@material-ui/core";

import { ComposedChart, Area, Scatter, Bar, BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const RevenueChart = () => {
    const [statsDaily, setStatsDaily] = useState(null);

  
    const url = "http://localhost:5555/stats/daily";
  
    useEffect(() => {
      axios.get(url).then((response) => {
        setStatsDaily(response.data);
      });
    }, []);
    console.log(statsDaily)
  
    if (!statsDaily) return null;

    return (
        <div style={{ width: '100%', height: 300, position:"absolute" }}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button>Hourly</Button>
                <Button>Daily</Button>
            </ButtonGroup>
            <ResponsiveContainer width="50%" height="100%">
                <ComposedChart
                width={500}
                height={400}
                data={statsDaily}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
                >
                <CartesianGrid stroke="#f5f5f5" />
                {/* change to hourly */}
                <XAxis dataKey="" label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }} scale="band" tickFormatter = {(unixTime) => moment(unixTime).format('MMMM YY')} />
                <YAxis label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} />      
               
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue"barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="clicks" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
};

export default RevenueChart;