async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/106,52/forecast")
  const weatherData = await weatherPromise.json()

  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector("#temperature-output").textContent = ourTemperature
}

start()