// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    var cameras;
    var markers = [];
    var image = 'img/traffic-cam-img.svg';

    $.getJSON('https://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            cameras = data;

            data.forEach(function(camera, itemIndex) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(camera.location.latitude),
                        lng: Number(camera.location.longitude)
                    },
                    map: map,
                    icon: image,
                    animation: google.maps.Animation.DROP
                });
                markers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<p>' + camera.cameralabel + '</p>';
                    html += '<p>' + '<img src="' + camera.imageurl.url + '"/>' + '</p>';


                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                    var pan = marker.getPosition();
                    map.panTo(pan);
                })
            });
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {

        });

    $('#search').bind('search keyup', function() {
        var input = $(this).val().toLowerCase();
        cameras.forEach(function(camera, itemIndex) {
            var compare = camera.cameralabel.toLowerCase().indexOf(input);
            if (compare >= 0 || !input) {
                console.log(markers[itemIndex]);
                markers[itemIndex].setMap(map);
            }
            else {
                markers[itemIndex].setMap(null);
            }
        });
        console.log(input);
    });

});

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

