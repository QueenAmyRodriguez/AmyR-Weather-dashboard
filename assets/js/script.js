var cityFormEL = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#search-city");
var cityNameTerm = document.querySelector("#city-name");
var weatherContainerEl = document.querySelector("#weather-container");

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getWeatherData(cityName);
    }

    // clear old content
    cityInputEl.value = "";
    weatherContainerEl.textContent = "";
};

var getWeatherData = function (city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=98f32ee96779d3a327e540ab5b2c4954&units=imperial";

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    var latLonUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=98f32ee96779d3a327e540ab5b2c4954&units=imperial";

                    fetch(latLonUrl).then(function (response) {
                        if (response.ok) {
                            console.log(response);
                            response.json().then(function (data) {
                                console.log(data);
                                displayWeather(data, city);
                            })
                        } else {
                            alert("Error: " + response.statusText);
                        }
                    })

                })
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert(error);
        })
};

var displayWeather = function (weather, searchTerm) {
    var icon = "http://openweathermap.org/img/wn/" + weather.current.weather[0].icon + "@2x.png";
    var iconImg = document.createElement("img");
    iconImg.setAttribute('src', icon);

    var today = new Date(weather.current.dt);
    console.log(today);
    cityNameTerm.textContent = searchTerm + date;
    cityNameTerm.appendChild(iconImg);

    var tempEL = document.createElement("span");
    tempEL.textContent = "Temp: " + weather.current.temp + "ºF";

    var windEL = document.createElement("span");
    windEL.textContent = "Wind: " + weather.current.wind_speed + " MPH";

    var humidityEL = document.createElement("span");
    humidityEL.textContent = "Humidity: " + weather.current.humidity + " %";

    var uvIndexEL = document.createElement("span");
    uvIndexEL.className = "green";
    uvIndexEL.textContent = "UV Index: " + weather.current.uvi;

    weatherContainerEl.appendChild(cityNameTerm);
    weatherContainerEl.appendChild(tempEL);
    weatherContainerEl.appendChild(windEL);
    weatherContainerEl.appendChild(humidityEL);
    weatherContainerEl.appendChild(uvIndexEL);
}

var getForecastData = function (daily) {

}


cityFormEL.addEventListener("submit", formSubmitHandler);

