var APIKey = "166a433c57516f51dfab1f7edaed8413";


// Here we run our AJAX call to the OpenWeatherMap API


var cities = [];

$("#searchButton").on("click", function (event) {
    var city = $("#citySearch").val().trim()
    // Here we are building the URL we need to query the database
    var dailyQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=imperial&cnt=6&appid=" + APIKey;
// current day
    $.ajax({
        url: dailyQueryURL,
        method: "GET",
        success: function (data) {
            
            var tempToday = data.list[0].temp.day;
            var city = data.city.name
            var humidityToday = data.list[0].humidity
            var windToday = data.list[0].speed

                // get humidity, uv index, wind, next 5 days, etc.

                setCityValues(tempToday, city, humidityToday, windToday)
            // setCityValues(currentTemp, uvVar, windVar, day1tempVar, etc..)
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            // alert(err.Message);
            alert("error :(")
        }
    });
    
});

function setCityValues(tempToday, city, humidityToday, windToday) {
    $("#city").text(city)
    $("#temp").text("Temperature: " + tempToday + " °F")
    $("#humidity").text("Humidity: " + humidityToday + "%")
    $("#wind").text("wind Speed: " + windToday + "MPH")
}

