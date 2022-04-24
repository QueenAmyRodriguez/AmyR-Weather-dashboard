var cityFormEL = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#search-city");
var cityNameTerm = document.querySelector("#city-name");
var weatherContainerEl = document.querySelector("#weather-container");
var fiveDayContainerEL = document.querySelector("#five-day");
var appId = "98f32ee96779d3a327e540ab5b2c4954";

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getWeatherData(cityName);
    }

    // clear old content
    cityInputEl.value = "";
    weatherContainerEl.textContent = "";
    fiveDayContainerEL.textContent = "";
};

var getWeatherData = function (city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appId + "&units=imperial";

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    var latLonUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + appId + "&units=imperial";

                    fetch(latLonUrl).then(function (response) {
                        if (response.ok) {
                            console.log(response);
                            response.json().then(function (data) {
                                console.log(data);
                                displayWeather(data, city);
                                getForecastData(data)
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

    cityNameTerm.textContent = searchTerm;
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

var getForecastData = function (data) {
    if (data.daily.length === 0) {
        fiveDayContainerEL.textContent = "Forecast Unavailable";
        return;
    }

    var dailyContainerEl = document.createElement("div");

    for (var i = 0; i < 5; i++) {
        
        var divContainer = document.createElement('div');
        divContainer.className = "card day";

        var icon = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
        var iconImg = document.createElement("img");
        iconImg.setAttribute('src', icon);
        iconImg.className = "card-body";

        var tempEL = document.createElement("span");
        tempEL.textContent = "Temp: " + data.daily[i].temp.max + "ºF";
        tempEL.className = "card-body";
    
        var windEL = document.createElement("span");
        windEL.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
        windEL.className = "card-body";
    
        var humidityEL = document.createElement("span");
        humidityEL.textContent = "Humidity: " + data.daily[i].humidity + " %";
        humidityEL.className = "card-body";
    
        divContainer.appendChild(iconImg);
        divContainer.appendChild(tempEL);
        divContainer.appendChild(windEL);
        divContainer.appendChild(humidityEL);

        dailyContainerEl.appendChild(divContainer);
    }

    fiveDayContainerEL.appendChild(dailyContainerEl);

}


cityFormEL.addEventListener("submit", formSubmitHandler);

