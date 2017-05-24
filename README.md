# Weather App
A React / React-Router / ES6 / HTML5 / CSS3 App which gives pulls 5 day forecast from OpenWeatherMap API based on geolocation or city entry.
See app in action -- http://yasir-weather.herokuapp.com

# Features
Geolocation to pull your 5 Day Forecast
Ability to enter a city to view 5 Day Forecast
Switch between Farenheight and Celcius
Forecast gives a gradient based on how hot / cold the temperature is.
Font Awesome icon library.
Responsive for Desktop / iPad Portrait / Mobile

# Thoughts
This is intended to be an MVP. The goal was to make a simple, polished solution that pulls data in concise cards for a user seeking a weather forecast of a given city. I intended to ease the user into the experience further by adding geolocation on start, to make it more frictionless.

# Trade-offs
For the sake of time, I had to forego some additional UI polish and erro-handling. Would be the next steps post-MVP. Using Open Weather API also doesn't allow for https, which I solve by using Dark Sky API instead.

# Next Steps aka TODO
1. Error-handling
2. Loading animations and cues
2. Add ability to add / compare cities
3. Icons per weather condition
4. Additional animations (for ex. cards sliding into view)
5. Current forecast more detailed
6. More info button on each weather card to give wind, precipitation etc.
7. Strip out additional code
8. Break out React components further

# Setup
1. Clone project
https://github.com/yasirhossain/weather-app.git
cd weather-app

2. Install dependencies
npm i
or
yarn

3. Run in development mode
npm run dev
or
yarn dev

4. Point your browser to http://localhost:5000

Supports Hot Reloading
Deployed to Heroku
