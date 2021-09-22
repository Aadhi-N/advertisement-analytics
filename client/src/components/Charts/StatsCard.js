import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';



  
  export default function StatsCard( {stats}) {

    
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Total {stats.text} Revenue ({stats.date}): {stats.revenue}
          </Typography>
          <Divider/>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Average {stats.text} clicks: {stats.clicks}
          </Typography>
        </CardContent>
      </Card>
    );
  }