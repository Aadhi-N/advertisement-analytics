/* Components imports */
import RevenueChart from "./RevenueChart";
import EventsChart from "./EventsChart";
import ClicksChart from "./ClicksChart";

const Charts = ({ statsDaily, statsHourly }) => {
    return (
        <main>
          <RevenueChart statsDaily={statsDaily} statsHourly={statsHourly}/>
        </main>
    )
};

export default Charts;


