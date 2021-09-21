1. RATE LIMITING:
-  sliding window counter protocol = 
    - user's requests grouped by timestamp (rather than logging each request), and keep counter for each group
    - when user makes request, check if user's record already exists, and if there's a timestamp; if true, increment the timestamp counter
        - if user exceeded limit, get all groups created in the last window, and sum the counters on them; if sum equal the limit, drop the incoming request; 
        - else the timestamp is inserted/updated and request processed 
- keep track of each user's request count per 24 hours, and group them by a fixed 1-hour window

---
- rate limiting is used as a middleware
- identify users using their IP address
- use Redis to keep track of user's request count, and timestamp using their IP addresses 
- use momentJS for time


OTHER:
- create node version file 
- asynchronous issue in rateLimitr middleware

- hack job - including sum of hours in "daily" events table join; 