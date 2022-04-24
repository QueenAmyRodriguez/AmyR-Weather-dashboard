var cityFormEL = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#search-city");

function formSubmitHandler(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        console.log(cityName);
    }

    // clear old content
    cityInputEl.value = "";
};

cityFormEL.addEventListener("submit", formSubmitHandler);