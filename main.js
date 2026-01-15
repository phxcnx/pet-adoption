
async function getWeather() {
const WeatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
const WeatherData = await WeatherPromise.json()

const ourTemperature = WeatherData.properties.periods[0].temperature

document.querySelector("#temperature-output").textContent = ourTemperature  }

getWeather()