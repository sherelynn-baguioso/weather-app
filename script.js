// Constants

const apiKey = '54da3225e9d5814b2e512fd537155b3a'
const weatherInfoElement = document.getElementById('weather-info')
const locationInputElement = document.getElementById('location-input')
const getWeatherButton = document.getElementById('get-weather-btn')

// Event listener for Get Weather Button
getWeatherButton.addEventListener('click', fetchWeatherData)

// Function to fetch Weather Data

function fetchWeatherData() {
  const location = locationInputElement.value.trim()

  if (location) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`

    fetch(weatherUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            'Weather data not available for the specified location.'
          )
        }
        return response.json()
      })
      .then((data) => {
        const weatherDescription = data.weather[0].description
        const temperature = Math.round(data.main.temp - 273.15) // Convert temperature from Kelvin to Celsius
        const humidity = data.main.humidity

        const weatherInfo = `Weather: ${weatherDescription}<br>
          Temperature: ${temperature}&deg;C<br>
          Humidity: ${humidity}%`

        weatherInfoElement.innerHTML = weatherInfo
      })
      .catch((error) => {
        weatherInfoElement.innerHTML = 'Error:' + error.message
      })
  } else {
    weatherInfoElement.innerHTML = 'Please enter a location'
  }
}
