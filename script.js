var cityArray = [""];
var stateArray = [""]; 

$("#searchInputBtn").on("click", function(event) {
    event.preventDefault();



    var cityArray = [""];
    var stateArray = [""]; 

    // we're going to use this array to show our recent searches. 
    var cityList = cityArray.splice(-9);
    var stateList = stateArray.splice(-9);

    // setting up city/state vars and pushing them to respective arrays
    var cityState = $("#searchInput").val().split(", ");
    var city = cityState[0];
    var state = cityState[1];

    cityArray.push(city);
    stateArray.push(state);

    //  set curCity & curState to last indexed for arrays
    var curCity = cityArray.slice().pop();
    var curState = stateArray.slice().pop();
    console.log(curCity);
    console.log(curState);

    // save search to recent list
    var list = document.getElementById("recentSearch");
    var listLen = $("#recentSearch").length;
    
        var li = document.createElement("li");
        li.setAttribute("class","list-group-item");
        li.setAttribute("type","button");
        li.textContent = curCity + ", " + curState;
        list.appendChild(li);


    // API var
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" 
                + curCity + "," + 
                curState + "," + "&appid=09805680974b4dff3f7eaa5bd163820d";

    // creating AJAX callback for last searched city/state
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        
        for (var i = 0; i < response.list.length; i++) {
            var temperature = ((response.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(0) + "\xB0 F";
            var date = response.list[i].dt_txt.split(" ")[0]
            var day = date.split("-")[2];
            var month = date.split("-")[1].charAt(1);
            var year = date.split("-")[0];
            var currentDate =  month + "/" + day + "/" + year ;
            var humidity = response.list[i].main.humidity;
            var windSpeed = response.list[i].wind.speed;

        // // conditional to only get data 1 per day
        if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {


            // add state searched and date  to dash header
            document.getElementById("wDash");
            $("#wDash").text(city + ", " + state + ": " + currentDate);
        
            // add today's temp to dash
            document.getElementById("#temp");
            $("#temp").text("Temperature: " + temperature);

            // add today's humidity to dash
             document.getElementById("humidity");
             $("#humidity").text("Humidity: " + humidity + "%");

            // add today's windspeed to dash
             document.getElementById("windSpeed");
             $("#windSpeed").text("Wind Speed: " + windSpeed + " meters per second");



            }
        


        }

    })

});

    

console.log(cityArray);
console.log(stateArray);

