// Your API Key
var apiKey = "f4c48b2431b2e1f893e3a6845dcf023c";

// Function to get weather data for a city
function getWeatherData(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      var date = dayjs.unix(data.dt).format("M/D/YYYY");
      document.getElementById("title").textContent = `${data.name} (${date})`;
      document.getElementById("temp").textContent = `Temp: ${data.main.temp}F`;
      document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} MPH`;
      document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
      get5DayForecast(city);
    })
    .catch((error) => {
      // console.error("Error fetching weather data:", error);
    });
}

var apiKey = "f4c48b2431b2e1f893e3a6845dcf023c";

// Function to create the forecast card HTML string
function createForecastCard(day, date, iconUrl, temp, wind, humidity) {
  return '<div class="col-sm-2 mb-3 mb-sm-0 forecast-card">' +
    '<div class="card">' +
    '<div class="card-body">' +
    '<h5 class="card-title">' + date + '</h5>' +
    '<img src="' + iconUrl + '" alt="">' +
    '<p class="temp">' + temp + '</p>' +
    '<p class="wind">' + wind + '</p>' +
    '<p class="humidity">' + humidity + '</p>' +
    '</div></div></div>';
}

// Function to get 5-day forecast for a city
function get5DayForecast(city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var forecastList = data.list;
      var startDate = dayjs.unix(forecastList[0].dt); // Get the start date from the API response
      var forecastHtml = '';
      for (var i = 0; i < 5; i++) {
        var forecastData = forecastList[i];
        var iconCode = forecastData.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        var temp = "Temp: " + forecastData.main.temp + "F";
        var wind = "Wind Speed: " + forecastData.wind.speed + " MPH";
        var humidity = "Humidity: " + forecastData.main.humidity + "%";

        // Calculate the date for each forecast card by adding one day to the previous date
        var date = startDate.add(i, 'day').format("M/D/YYYY");

        forecastHtml += createForecastCard(i + 1, date, iconUrl, temp, wind, humidity);
      }

      // Add forecast cards to the fiveday-forcast container
      document.getElementById("fiveday-forcast").innerHTML = forecastHtml;
    })
    .catch(function (error) {
      console.error("Error fetching 5-day forecast data:", error);
    });
}

// Function to handle search button click
document.getElementById("search-btn").addEventListener("click", function () {
  var city = document.getElementById("city-input").value.trim();
  if (city !== "") {
    getWeatherData(city);
    // Add city to search history
    var listItem = `<li class="list-group-item"><button type="button" class="btn btn-secondary w-100 city-btn">${city}</button></li>`;
    document.querySelector(".search-history").insertAdjacentHTML("beforeend", listItem);
    document.getElementById("city-input").value = "";
  } else {
    alert("Please enter a city name.");
  }
});

// Function to handle click on search history button
document.querySelector(".search-history").addEventListener("click", function (event) {
  if (event.target.classList.contains("city-btn")) {
    var city = event.target.textContent;
    getWeatherData(city);
  }
});