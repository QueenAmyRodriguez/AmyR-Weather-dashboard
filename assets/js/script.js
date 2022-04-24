var cityFormEL = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#search-city");

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        console.log(cityName);
    }

    // clear old content
    cityInputEl.value = "";
};

var getWeatherData = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=98f32ee96779d3a327e540ab5b2c4954";

    fetch(apiURL)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
            });
        }
    })
    .catch(function(error) {
        alert(error);
    })
}

getWeatherData('Phoenix');
cityFormEL.addEventListener("submit", formSubmitHandler);
