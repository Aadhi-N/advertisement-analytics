
import RevenueChart from "./RevenueChart";
import EventsChart from "./EventsChart";
import ClicksChart from "./ClicksChart";

const Charts = ({ statsDaily, statsHourly }) => {
  
    return (
        <main>
          <RevenueChart statsDaily={statsDaily} statsHourly={statsHourly}/>
          <EventsChart />
          <ClicksChart />
        </main>
    )
};

export default Charts;


