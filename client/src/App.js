import axios from "axios";
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import "./App.css";

import NavbarTop from "./components/Nav/NavbarTop";
import NavbarSide from "./components/Nav/NavbarSide";
import Dashboard from "./components/Dashboard/Dashboard";
import Charts from "./components/Charts/Charts";
import Stats from "./components/Stats/Stats";
import Map from "./components/Map/Map";
import SearchTable from "./components/SearchTable/SearchTable";

import { getAllData } from "./services/statsDaily.service";

function App() {

  const [statsDaily, setStatsDaily] = useState(null);
  const [statsHourly, setStatsHourly] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [mapsData, setMapsData] = useState(null);
  


  useEffect(() => {
    getAllData().then((response) => {
      setStatsDaily(response[0].data.data);
      setStatsHourly(response[1].data.data);
      setTableData(response[2].data.data)
      setMapsData(response[3].data.data)
    })
    .catch((error) => setStatsDaily(error))
  }, []);
  
  return (
    <div style={{display: "flex"}}>
      <Router>
        <NavbarTop />
        <NavbarSide />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/charts" render={(props) => <Charts {...props} statsDaily={statsDaily} statsHourly={statsHourly} />}/>
          <Route exact path="/map" render={(props) => <Map {...props} mapsData={mapsData}/>}/>
          <Route exact path="/all-data" render={(props) => <SearchTable {...props} tableData={tableData} />} />
        </Switch>
      </Router>
      <main>
        
      </main>

    </div>
  );
};

export default App;

// {post.map(p => (
//   <p>{p.name}</p>
// ))}
