var cityArray = [""];
var stateArray = [""]; 



$("#searchInputBtn").on("click", function(event) {
    event.preventDefault();

    // API var
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" 
                + curCity + "," + 
                curState + "," + "&appid=09805680974b4dff3f7eaa5bd163820d";


    // setting up city/state vars and pushing them to respective arrays
    var cityState = $("#searchInput").val().split(", ");
    var city = cityState[0];
    var state = cityState[1];

    cityArray.push(city);
    stateArray.push(state);

    //  set curCity & curState to last indexed for arrays
    var curCity = cityArray.slice().pop();
    var curState = cityState.slice().pop();
    console.log(curCity);
    console.log(curState);

    // creating AJAX callback for last searched city/state
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        
        // conditional to only get data 1 per day
        if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {

        // get temp and display
        var temperature = response.temperature;
            document.getElementById("temp");

        // get humidity
        var humid = response.humidity;

        // get windspeed
        var wSpeed = response.windSpeed;
        
        }

    })



});

    

console.log(cityArray);
console.log(stateArray);

