const express = require('express');
const pg = require('pg');
var cors = require('cors')
const rateLimiter = require("./middleware/rateLimiter");

require('dotenv').config();
const pool = new pg.Pool();

const app = express();

app.use(cors());
app.use(rateLimiter);

const queryHandler = (req, res, next) => {
  pool.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || [])
  }).catch(next)
}

app.get('/', (req, res) => {
  res.send('Welcome to EQ Works 😎')
})

app.get('/events/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/events/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler);



app.get('/stats/hourly', (req, res, next) => {
  req.sqlQuery = `
  SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler);


app.get('/stats/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler);


// SELECT public.hourly_stats.date, public.hourly_stats.hour, public.hourly_stats.impressions, public.hourly_stats.clicks, public.hourly_stats.revenue, public.hourly_stats.poi_id
// FROM public.hourly_stats 
// INNER JOIN public.hourly_events 
// ON (public.hourly_stats.date = public.hourly_events.date)
// ORDER BY public.hourly_stats.date, public.hourly_stats.hour
// LIMIT 168;


/* 2 TABLES: public.hourly_stats & public.hourly_events
/* Select ALL events and stats, join both tables */
app.get('/all', (req, res, next) => {
  req.sqlQuery = `
   SELECT a.date, SUM(impressions) AS impressions
    FROM public.hourly_stats a
   LEFT JOIN (public.hourly_events b
    ON a.date = b.date
    GROUP BY b.date
  )
   LEFT JOIN (public.poi c
    ON a.poi_id = c.poi_id
  )
  GROUP BY a.date
    LIMIT 7;
  `
  return next()
}, queryHandler);

// SELECT date,
// SUM(impressions) AS impressions,
// SUM(clicks) AS clicks,
// SUM(revenue) AS revenue
// FROM public.hourly_stats 
// INNER JOIN public.hourly_events 
// ON (public.hourly_stats.date = public.hourly_events.date) 
// LIMIT 168;

	//public.hourly_events
// 0	
// date	"2017-01-01T05:00:00.000Z"
// hour	1
// events	14
// poi_id	4

//public.hourly_stats
	
// 0	
// date	"2017-04-23T04:00:00.000Z"
// hour	5
// impressions	3
// clicks	0
// revenue	"0.0000000000000"
// poi_id	2


app.get('/poi', (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler)

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})


 // SELECT public.hourly_stats.date, public.hourly_stats.hour, public.hourly_stats.impressions, public.hourly_stats.clicks, public.hourly_stats.revenue 
  // FROM public.hourly_stats 
  // INNER JOIN public.hourly_events 
  // ON (public.hourly_stats.date = public.hourly_events.date)
  // ORDER BY public.hourly_stats.date, public.hourly_stats.hour
  // LIMIT 168;

  