import axios from "axios";
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import NavbarTop from "./components/Nav/NavbarTop";
import NavbarSide from "./components/Nav/NavbarSide";
import Dashboard from "./components/Dashboard/Dashboard";
import Events from "./components/Events/Events";
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
    <Router>
      <NavbarTop />
      <NavbarSide />
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/events"><Events/></Route>
        <Route exact path="/stats"><Stats/></Route>
        <Route exact path="/map"><Map/></Route>
        <Route exact path="/all-data"><DataTable/></Route>
      </Switch>
      {post.map(p => (
        <p>{p.name}</p>
      ))}
    </Router>
  );
};

export default App;
