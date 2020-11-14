$(document).ready(function() {
    var cityHistory = localStorage.getItem('cityHistory')
    // poplulate your html
    var cityArray = cityHistory.split(",");
    var top7CityArray = cityArray.slice(0, 7)
    console.log(top7CityArray)
})

var APIKey = "166a433c57516f51dfab1f7edaed8413";
// Here we run our AJAX call to the OpenWeatherMap API


$("#searchButton").on("click", function (event) {
    var city = $("#citySearch").val().trim()
    // Here we are building the URL we need to query the database
    var dailyQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=imperial&cnt=6&appid=" + APIKey;
    // current day
    $.ajax({
        url: dailyQueryURL,
        method: "GET",
        
        success: function (data) {
            
            // get humidity, uv index, wind, for today
            var tempToday = data.list[0].temp.day;
            var city = data.city.name
            var humidityToday = data.list[0].humidity
            var windToday = data.list[0].speed

            // variables for next 5 days
            var fc1icon = data.list[1].weather[0].icon
            var fc1temp = data.list[1].temp.day
            var fc1humidity = data.list[1].humidity
            
            var fc2icon = data.list[2].weather[0].icon
            var fc2temp = data.list[2].temp.day
            var fc2humidity = data.list[2].humidity
            
            var fc3icon = data.list[3].weather[0].icon
            var fc3temp = data.list[3].temp.day
            var fc3humidity = data.list[3].humidity
            
            var fc4icon = data.list[4].weather[0].icon
            var fc4temp = data.list[4].temp.day
            var fc4humidity = data.list[4].humidity
            
            var fc5icon = data.list[5].weather[0].icon
            var fc5temp = data.list[5].temp.day
            var fc5humidity = data.list[5].humidity
            
            // setCityValues(currentTemp, uvVar, windVar, day1tempVar, etc..)
            setCityValues(tempToday, city, humidityToday, windToday)
            
            setForcastValues(fc1icon, fc1temp, fc1humidity, 1)
            setForcastValues(fc2icon, fc2temp, fc2humidity, 2)
            setForcastValues(fc3icon, fc3temp, fc3humidity, 3)
            setForcastValues(fc4icon, fc4temp, fc4humidity, 4)
            setForcastValues(fc5icon, fc5temp, fc5humidity, 5)
            
            
            var historyList = localStorage.getItem('cityHistory')

            if (historyList == null) {
                historyList = city;
            }
            else {
                historyList = city + ',' + historyList;
            }

            localStorage.setItem('cityHistory', historyList)
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            // alert(err.Message);
            alert("Not a valid city, please try again")
        }
        
    });
   
    console.log(dailyQueryURL)
});



function setCityValues(tempToday, city, humidityToday, windToday) {
    $("#city").text(city)
    $("#temp").text("Temperature: " + tempToday + " °F")
    $("#humidity").text("Humidity: " + humidityToday + "%")
    $("#wind").text("Wind Speed: " + windToday + "MPH")
}

function setForcastValues(icon, temp, humidity, day){
    $("#day"+day+"Icon").text("=", icon)
    $("#day"+day+"Temp").text(temp)
    $("#day"+day+"Humidity").text(humidity)

}