function calculateAndDisplayRoute(service, display) {
	var u = Session.get("currUser");
	var trip = getShortestTripByTime(u);
	var origin = new google.maps.LatLng(trip.begintrip_lat, trip.begintrip_lng);
	var dest = new google.maps.LatLng(trip.dropoff_lat, trip.dropoff_lng);

    directionsService.route({
      origin: origin,
      destination: dest,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
          console.log('Directions request failed due to ' + status);
        }
    });
  }

Template.shortest_ride.helpers({

  exampleMapOptions: function() {
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


Template.shortest_ride.onCreated(function() {
  //We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
  	directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });

     var map = GoogleMaps.maps.exampleMap.instance
     calculateAndDisplayRoute(directionsService, directionsDisplay);
     directionsDisplay.setMap(map);
  });

  	// Tracker.autorun(function () {

	  //   };    
	  // });

});

Template.shortest_ride.onRendered(function() {
	GoogleMaps.load();

});

Template.shortest_ride.events({

})