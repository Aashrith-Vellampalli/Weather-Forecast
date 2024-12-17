function showSidebar() {
  var sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}
function closeSidebar() {
  var sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}
function getCityFromSearchBar() {
  var searchBar = document.querySelector('#search-bar');
  var city = searchBar.value;
  return city;
}


var searchButton = document.querySelector('#search-bar');
searchButton.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    updateWeatherData();
    UpdateforecastweatherData();
  }
});
var searchButton = document.querySelector('#search-icon');
searchButton.addEventListener('click', function() {
  updateWeatherData();
  UpdateforecastweatherData();
});


function updateWeatherData() {
  var url = 'https://api.weatherapi.com/v1/forecast.json?key=94def430442c47ffbb8164131241312&q='+getCityFromSearchBar()+'&days=7&aqi=no&alerts=no'
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var element = document.getElementById('city-name');
        element.textContent = data.location.name;
      element = document.getElementById('date');
        element.textContent = data.location.localtime;
      element = document.getElementById('temperature');
        element.textContent = data.current.temp_c + '°C';
      element = document.getElementById('weatherdesc');
        element.textContent = data.current.condition.text;
      element = document.getElementById('weather-icon');
        element.src = data.current.condition.icon;
      element = document.getElementById('humidity');
        element.textContent = 'Humidity:' + data.current.humidity + '%';
      element = document.getElementById('winds');
        element.textContent = 'windSpeed: ' + data.current.wind_kph + 'km/h' + ' ' + data.current.wind_dir;
      element = document.getElementById('atp');
        element.textContent = 'Pressure: ' + data.current.pressure_mb + 'mb';
      element = document.getElementById('precipitation');
        element.textContent = 'Precipitation: ' + data.current.precip_mm + 'mm';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('City not found');
    });
}

function UpdateforecastweatherData(){
  city = getCityFromSearchBar();
  var url = 'https://api.weatherapi.com/v1/forecast.json?key=94def430442c47ffbb8164131241312&q='+city+'&days=7&aqi=no&alerts=no'
  fetch(url)
    .then(response => response.json())
    .then(data => {
      for(let i=1; i<7; i++){
        var element = document.getElementById('date'+i);
        element.textContent = data.forecast.forecastday[i].date;
        element = document.getElementById('temperature'+i);
        element.textContent = data.forecast.forecastday[i].day.maxtemp_c + '°C' + ' / ' + data.forecast.forecastday[i].day.mintemp_c + '°C';
        element = document.getElementById('Wd'+i);
        element.textContent = data.forecast.forecastday[i].day.condition.text;
        element = document.getElementById('Wi'+i);
        element.src = data.forecast.forecastday[i].day.condition.icon;
        element = document.getElementById('cor'+i);
        element.textContent = 'rain probability: ' + data.forecast.forecastday[i].day.daily_chance_of_rain + '%';
      }
      })
      .catch(error => {
        console.error('Error:', error);
      });


}