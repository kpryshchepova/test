var weather = new XMLHttpRequest();
weather.open('GET', 'https://api.wunderground.com/api/90566a2ed16e8cef/conditions/q/Belarus/Gomel.json', false);
weather.send(null);

if (weather.status !== 200) {
    var fail = document.createElement("div");
    fail.className = "alert alert-danger";
    fail.innerHTML = "<strong>Danger! </strong>" + weather.status + " : " + weather.statusText;

    document.getElementById("parent").removeChild(document.getElementById("weather"));
    var notAvail = document.createElement("div");
    notAvail.id = "noweather";
    notAvail.innerHTML = "Weather not available";
    document.getElementById("parent").appendChild(notAvail);
    document.getElementById("parent").appendChild(fail);

} else {
    var success = document.createElement("div");
    success.className = "alert-success";
    success.innerHTML = "<strong>Success!</strong> Weather loaded successfully";
    document.getElementById("parent").appendChild(success);

    var r = JSON.parse(weather.response);
    var dis = r.current_observation.display_location.full;
    var temp = r.current_observation.temperature_string;
    var wind = r.current_observation.wind_string;

    document.getElementById('weather').innerHTML = dis;

    weather.abort();
}



