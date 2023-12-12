var apiKey="ffe5ad5271334f04eed5498a02a4c9816"
var titleEl=document.getElementById("SearchResult");
var tempEl=document.getElementById("temp")
var windEl=document.getElementById("wind")
var humidityEl=document.getElementById("humidity")
var searchBtn=document.getElementById("search-btn")
var searchHistoryEl=document.getElementById("search-history");
var cityInput=document.getElementById("city-input")
var forecastCardsEl = document.getElementById("forecast-cards");
var cityArr= [];


function weatherSearch (){
    if (!cityArr.toLowerCase().includes(cityInput.value.toLowerCase())){
        cityArr.push(cityInput.value);
            localStorage.setItem('city' , JSON.stringify(cityArr));
   
displayWeather(cityInput.value);
createCityBtn();
cityInput.value = '';
    }

}
 function getCity(){
    var gottenCity=localStorage.getItem('city');
    if (gottenCity) {
        cityArr=JSON.parse(localStorage.getItem('city'));
        return;
 }

 }

function createCityBtn(){
    console.log(cityArr);
    searchHistoryEl.textContent = "";
    for (let i = 0; i < cityArr.length; i++) {
        var li = document.createElement('li');
        var cityBtn = document.createElement('button');
        cityBtn.innerHTML = cityArr[i];
        cityBtn.classList.add("btn", "btn-secondary", "w-100");
        li.classList.add("list-group-item", "border-0");
        li.appendChild(cityBtn);
        searchHistoryEl.appendChild(li);
        cityBtn.addEventListener('click', function (event) {
            displayWeather(event.target.textContent);
        })
    }

    }













function displayWeather(cityName){
    var url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ apiKey+"&units=imperial"

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(currentData){
        console.log(currentData)
        titleEl.innerHTML=currentData.name + dayjs.unix(currentData.dt).format(" (MM/DD/YYYY)")+ "<img src='https://openweathermap.org/img/wn/"+ currentData.weather[0].icon+"@2x.png'>"
    })


    var forecastUrl="https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey+"&units=imperial"

    fetch(forecastUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(forecastData){
        console.log(forecastData)
        //grab every 12pm for each day for 5 days
        var forecastArr=forecastData.list
  
        for (let i = 3,j=1; i < forecastArr.length; i=i+8,j++) {
             console.log(forecastArr[i])
               var cardTitle=document.getElementById("card-title"+j)
               console.log("card-title"+j)
               cardTitle.textContent=dayjs.unix(forecastArr[i].dt).format(" (MM/DD/YYYY)")
               var temp=document.getElementById("temp"+j)

               temp.textContent=forecastArr[i].main.temp
        }

    })
}


searchBtn.addEventListener("click", searchCity)