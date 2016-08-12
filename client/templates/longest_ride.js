function calculateAndDisplayRoute(service, display) {
  var u = Session.get("currUser");
  var trip = getShortestTripByTime(u);
  var origin = new google.maps.LatLng(trip.begintrip_lat, trip.begintrip_lng);
  var dest = new google.maps.LatLng(trip.dropoff_lat, trip.dropoff_lng);

    directionsService2.route({
      origin: origin,
      destination: dest,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay2.setDirections(response);
      } else {
          console.log('Directions request failed due to ' + status);
        }
    });
  }

Template.longest_ride.helpers({

  exampleMapOptions2: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {

      var haight = new google.maps.LatLng(37.7699298, -122.4469157);
      return {
        center: haight,
        zoom: 8
      };
    }
  },

  getShortestTripByTime: function() {
    var user = Session.get("currUser");
    return getShortestTripByTime(user);
  }
 
});


Template.longest_ride.onCreated(function() {

  // GoogleMaps.load();
  //We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap2', function(map) {
    directionsService2 = new google.maps.DirectionsService;
    directionsDisplay2 = new google.maps.DirectionsRenderer;
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });

     var map = GoogleMaps.maps.exampleMap2.instance
     calculateAndDisplayRoute(directionsService2, directionsDisplay2);
     directionsDisplay2.setMap(map);
  });

    // Tracker.autorun(function () {

    //   };    
    // });

});

Template.longest_ride.onRendered(function() {
  // GoogleMaps.load();

});

Template.longest_ride.events({

})