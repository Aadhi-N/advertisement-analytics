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
import DataTable from "./components/DataTable/DataTable";

function App() {

  const [post, setPost] = useState(null);

  
    const url = "http://localhost:5555/poi";

    useEffect(() => {
      axios.get(url).then((response) => {
        setPost(response.data);
      });
    }, []);
  
    if (!post) return null;
  
  return (
    <div style={{display: "flex"}}>
      <Router>
        <NavbarTop />
        <NavbarSide />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/charts" component={Charts}/>
          <Route exact path="/map" component={Map}/><Map/>
          <Route exact path="/all-data" component={DataTable}/>
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
