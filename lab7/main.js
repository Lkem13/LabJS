const apiKey = '66a49ba701f59075aef28e67f897fd2b';

let locations = JSON.parse(localStorage.getItem('locations')) || [];

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            return data;
        } 
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
}

async function renderLocations() {
    const locationsContainer = document.getElementById('locations-container');
    locationsContainer.innerHTML = '';

    const limitedLocations = locations.slice(0, 10);

    for (const location of limitedLocations) {
        const weatherData = await getWeatherData(location);

        if (weatherData) {
            const locationElement = document.createElement('div');
            locationElement.classList.add('location-item');
            locationElement.innerHTML = `
                <button class="delete" onclick="removeLocation('${location}')">X</button>
                <div>${capitalChar(location)}</div>
                <div>Temperatura: ${Math.round(weatherData.main.temp)}°C</div>
                <div>Wilgotność: ${weatherData.main.humidity}%</div>
                <img src="${getWeatherIcon(weatherData.weather[0].icon)}" alt="Weather Icon">
            `;
            locationsContainer.appendChild(locationElement);
        }
    }
}

async function addLocation() {
    const input = document.getElementById('location-input');
    const locationName = input.value.trim();

    if (locationName === '') {
        alert('Input field cannot be empty');
        return;
    }

    if (locations.length >= 10) {
        alert('You have reached the limit, you cannot provide more than 10 locations');
        return;
    }

    try {
        const weatherData = await getWeatherData(locationName);

        if (weatherData) {
            locations.push(locationName);

            localStorage.setItem('locations', JSON.stringify(locations));

            await renderLocations();

            input.value = '';
        } else {
            alert('Error fetching data for provided location');
        }
    } catch (error) {
        console.error('Error adding new location', error);
        alert('Error adding new location, please try again');
    }
}

function removeLocation(location) {
    locations = locations.filter(loc => loc !== location);

    localStorage.setItem('locations', JSON.stringify(locations));

    renderLocations();
}

function capitalChar(str) {
    if (str && typeof str === 'string') {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
}

function clearLocalStorage() {
    if (confirm('Are you sure you want to clear all saved locations?')) {
        localStorage.removeItem('locations');
        locations = [];
        renderLocations();
        location.reload();
    }
}

renderLocations();
