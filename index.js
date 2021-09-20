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
    SELECT date, hour, events, poi_id
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


app.get('/events/location', (req, res, next) => {
  req.sqlQuery = `
  SELECT date, i.poi_id, events
  FROM public.hourly_events i
  LEFT JOIN public.poi p ON p.poi_id = i.poi_id

  LIMIT 168;
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



/* 2 TABLES: public.hourly_stats & public.hourly_events
/* Select ALL events and stats, join both tables */
app.get('/all', (req, res, next) => {
  req.sqlQuery = `

  SELECT * 
  FROM public.hourly_stats i
  LEFT JOIN public.hourly_events ON public.hourly_events.date = i.date
  LEFT JOIN public.poi ON public.poi.poi_id = i.poi_id
  ORDER BY i.date, i.hour
  `
  return next()
}, queryHandler);


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

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
