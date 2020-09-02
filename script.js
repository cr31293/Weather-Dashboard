var cityArray = [""];
var stateArray = [""]; 

$("#searchInputBtn").on("click", function(event) {
    event.preventDefault();

    $(".card-group").empty();

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
    var  list = document.getElementById("recentSearch");
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

                    // // conditional to only get data 1 per day

            console.log(i);
            var date = response.list[i].dt_txt.split(" ")[0];
            console.log(date);
            console.log(date[8]);
            console.log(date[9]);
            var day = date.split("-")[2];
            var month = date.split("-")[1].charAt(1);
            var year = date.split("-")[0];
            var currentDate =  month + "/" + day + "/" + year ;
            var temperature = ((response.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(0) + "\xB0 F";
            var humidity = response.list[i].main.humidity;
            var windSpeed = response.list[i].wind.speed;
            var icon = response.list[0].weather[0].discription;
            var iconAddress = "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                
                var card = $("<div>").attr("class", "card m-1 mt-n2");
                    // var img
                var cardBody = $("<div>").attr("class", "card-body bg-primary");
                

                    $(".card-group").append(card);
                    
                    card.append(cardBody);
                
                var cardDate = $("<h4>").attr("class", "card-title").text(currentDate);
                    cardBody.append(cardDate);
                var cardTemp = $("<p>").attr("class", "card-text small").text("temp: " + temperature);
                    cardBody.append(cardTemp);
                var cardHumid = $("<p>").attr("class", "card-text small").text("Humidity: " + humidity);
                    cardBody.append(cardHumid);
                var cardWind = $("<p>").attr("class", "card-text small").text("Wind Speed: " + windSpeed + " m/s");
                    cardBody.append(cardWind);
                var cardIcon = $("<img>").attr("src", iconAddress).addClass("img-fluid card-img-top").attr("alt",icon);
                    cardBody.append(cardIcon);

                 // add state searched and date  to dash header
                document.getElementById("wDash");
                $("#wDash").text(city + ", " + state + ": " + response.list[0].dt_txt.split());

                
                
            }
        }

           
        
            // add today's temp to dash
            document.getElementById("#temp");
            $("#temp").text("Temperature: " + temperature);

            // add today's humidity to dash
             document.getElementById("humidity");
             $("#humidity").text("Humidity: " + humidity + "%");

            // add today's windspeed to dash
             document.getElementById("windSpeed");
             $("#windSpeed").text("Wind Speed: " + windSpeed + " meters per second");

console.log(response);

            })
        


});

    

console.log(cityArray);
console.log(stateArray);

