let api_key = "7db22efcc34576e147d8914265f5ddb3"
let base_url = "https://api.openweathermap.org/data/2.5/weather"
let city

document.getElementById('search-button')
    .addEventListener('click', () => {
        city = document.getElementById('search-input').value

        if (city) {
            search(city)
        }
    })

function search(city) {
    let url = `${base_url}?q=${city}&appid=${api_key}`

    fetch(url)
        .then(response => response.json())
        .then(data => updateData(data))
        .catch(error => console.error("Error:", error))
}

function updateData(response) {
    const city = document.getElementById('city')
    const date = document.getElementById('date')
    const temp = document.getElementById('temp')
    const feelsLike = document.getElementById('feels-like')
    const humidity = document.getElementById('humidity')
    const windSpeed = document.getElementById('wind-speed')
    const weatherIcon = document.querySelector('.weather-icon i')

    const weatherIcons = {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud-meatball',
        '04n': 'fa-cloud-meatball',
        '09d': 'fa-cloud-showers-heavy',
        '09n': 'fa-cloud-showers-heavy',
        '10d': 'fa-cloud-rain',
        '10n': 'fa-cloud-rain',
        '11d': 'fa-bolt',
        '11n': 'fa-bolt',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog'
    };

    const weatherCode = response.weather[0].icon;

    if (weatherIcons[weatherCode]) {
        weatherIcon.className = `fas ${weatherIcons[weatherCode]}`;
    } else {
        weatherIcon.className = 'fas fa-question-circle';
    }

    city.innerText = response.name
    date.innerText = new Date(response.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })
    temp.innerText = Math.round(response.main.temp - 273.15) + "°C"
    feelsLike.innerText = Math.round(response.main.feels_like - 273.15) + "°C"
    humidity.innerText = response.main.humidity + "%"
    windSpeed.innerText = (response.wind.speed * 3.6).toFixed(1) + " km/h"
}