import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

const NavbarSide = () => {
    return (
        
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/stats">Stats</Link></li>
                <li><Link to="/map">Map</Link></li>
                <li><Link to="/all-data">All Data</Link></li>
            </ul>

            
  
    )
};

export default NavbarSide;