$(document).ready(function() {

});
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
var resultsArr;
var searchLocation = getLocation();

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: searchLocation,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: searchLocation,
        radius: 1000,
        keyword: ['taco'],
    }, callback);
}

function callback(results, status) {
    resultsArr = results;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    //     "<br>Longitude: " + position.coords.longitude;
    console.log(position.coords.latitude, position.coords.longitude);
    searchLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
}
// $.ajax({
//     url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC-9zxeNdRlMgwNUuz7cG9d0kl73hKFQW0&libraries=places&callback=initMap',
//     method: 'get',
//     dataType: 'jsonp',
//     success: function(success) {
//         console.log(success);
//     },
//     error: function (error) {
//         console.log(error);
//     }
// });