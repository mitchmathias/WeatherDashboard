var APIKey = "166a433c57516f51dfab1f7edaed8413";
// Here we run our AJAX call to the OpenWeatherMap API
var top7CityArray = [];


$(document).ready(function() {
    var cityHistory = localStorage.getItem('cityHistory')
    // poplulate your html
    top7CityArray = cityHistory.split(",")
    
    if(top7CityArray.length > 7){
        top7CityArray = top7CityArray[0,7]
        
    }
    console.log(top7CityArray)
    for(var i = top7CityArray.length - 1; i >= 0; i--){
        console.log(top7CityArray[i])
        $(".cityList").append("<li class= 'cityItem'>" + top7CityArray[i] + "</li>")
    }
})



function getWeatherData (clickedCity) {
    var city;
    if (clickedCity) {
        city = clickedCity;
    }
    else {
        city = $("#citySearch").val().trim()
    }

    $("#citySearch").val('')
    // Here we are building the URL we need to query the database
    var dailyQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=imperial&cnt=6&appid=" + APIKey;
    // current day
    $.ajax({
        url: dailyQueryURL,
        method: "GET",
        
        success: function (data) {
            
            // get humidity, uv index, wind, for today
            
            var iconToday = data.list[0].weather[0].icon
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
            setCityValues(tempToday, city, humidityToday, windToday, iconToday)
            
            setForcastValues(fc1icon, fc1temp, fc1humidity, 1)
            setForcastValues(fc2icon, fc2temp, fc2humidity, 2)
            setForcastValues(fc3icon, fc3temp, fc3humidity, 3)
            setForcastValues(fc4icon, fc4temp, fc4humidity, 4)
            setForcastValues(fc5icon, fc5temp, fc5humidity, 5)

            if (top7CityArray == null) {
                top7CityArray = [city];
                $(".cityList").append("<li class='cityItem cityBtn'>" + city + "</li>")
            }
            else if (top7CityArray.indexOf(city)==-1) {
                top7CityArray = [city, ...top7CityArray];
                $(".cityList").append("<li class='cityItem cityBtn'>" + city + "</li>")
            }

            localStorage.setItem('cityHistory', top7CityArray)
            
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            // alert(err.Message);
            alert("Not a valid city, please try again")
        }
        
    });
   
    console.log(dailyQueryURL)
};



function setCityValues(tempToday, city, humidityToday, windToday, icon) {
    var date = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
    date = mo + "-" + da + "-" + ye

    $("#city").text(city + " " + date)
    $("#temp").text("Temperature: " + tempToday + " °F")
    $("#humidity").text("Humidity: " + humidityToday + "%")
    $("#wind").text("Wind Speed: " + windToday + "MPH")
    $("#icon").attr("src", iconSrc)
}

function setForcastValues(icon, temp, humidity, day){
    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";

    var date = new Date();
    if (day == 1) {
        date.getDate() + 1
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const da = parseInt(new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)) + 1;
        date = mo + "-" + da + "-" + ye
    }
    else if (day == 2) {
        date.getDate() + 2
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const da = parseInt(new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)) + 2;
        date = mo + "-" + da + "-" + ye
    }
    else if (day == 3) {
        date.getDate() + 3
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const da = parseInt(new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)) + 3;
        date = mo + "-" + da + "-" + ye
    }
    else if (day == 4) {
        date.getDate() + 4
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const da = parseInt(new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)) + 4;
        date = mo + "-" + da + "-" + ye
    }
    else if (day == 5) {
        date.getDate() + 5
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const da = parseInt(new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)) + 5;
        date = mo + "-" + da + "-" + ye
    }

    $("#day"+day+"Date").text(date)
    $("#day"+day+"Icon").attr("src", iconSrc)
    $("#day"+day+"Temp").text("Temp: " + temp + " °F")
    $("#day"+day+"Humidity").text("Humidity: " + humidity + "%")

}

$("ul").on("click", "li.cityItem", function(){
    var clickedCity = $(this).text()
    getWeatherData(clickedCity);
})