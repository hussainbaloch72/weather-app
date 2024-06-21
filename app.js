
document.getElementById('search-button').addEventListener('click', debounce(handleSearch, 500));

function handleSearch() {
  const city = document.getElementById('city-input').value.trim();
  if (city) {
    getWeather(city);
  } else {
    showError('Please enter a valid city name.');
  }
}

async function getWeather(city) {
  const apiKey = 'b47bbe59c2c8c064aed147f3db689902'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`City not found: ${response.statusText}`);
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(weatherData) {
  const weatherContainer = document.getElementById('weather-container');
  weatherContainer.innerHTML = `
    <div class="weather-item"><strong>City:</strong> ${weatherData.name}</div>
    <div class="weather-item"><strong>Temperature:</strong> ${Math.round(weatherData.main.temp)}°C</div>
    <div class="weather-item"><strong>Weather:</strong> ${weatherData.weather[0].description}</div>
    <div class="weather-item"><strong>Humidity:</strong> ${weatherData.main.humidity}%</div>
    <div class="weather-item"><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</div>
  `;
}

function showError(message) {
  const weatherContainer = document.getElementById('weather-container');
  weatherContainer.innerHTML = `
    <div class="error-message">${message}</div>
  `;
}

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
