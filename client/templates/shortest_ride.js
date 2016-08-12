
calculateAndDisplayRoute = function(service, display) {
  var u = Session.get("currUser");
  var val = Session.get("select_val");
  var trip;

  var origin;
  var dest;

    if (val=="shortest_ride") {
      trip= getShortestTripByTime(user);
      origin = new google.maps.LatLng(trip.begintrip_lat, trip.begintrip_lng);
      dest = new google.maps.LatLng(trip.dropoff_lat, trip.dropoff_lng);

    } else if (val=="longest_ride") {
      trip= getLongestTripByTime(user);
      if (user.firstname=="Ambika") {
        origin="Mountain View, CA"
      } else {
        origin = new google.maps.LatLng(trip.begintrip_lat, trip.begintrip_lng);
      }
      
      dest = new google.maps.LatLng(trip.dropoff_lat, trip.dropoff_lng);
    }
  //var origin = new google.maps.LatLng(trip.begintrip_lat, trip.begintrip_lng);
  //var dest = new google.maps.LatLng(trip.dropoff_lat, trip.dropoff_lng);

    directionsService.route({
      origin: origin,
      destination: dest,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        }
    });
}

Template.shortest_ride.helpers({

  trip_duration: function(seconds) {
    var val = Session.get("select_val");
    if (val=="shortest_ride") {
      return seconds.toString() + " seconds";
    } else {
      var num = Math.round(10*seconds/60)/10
      return num.toString() + " minutes"
    }
  },

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

  getTripByTime: function() {
    var val = Session.get("select_val");
    var user = Session.get("currUser");
    if (val=="shortest_ride") {
      return getShortestTripByTime(user);
    } else if (val=="longest_ride") {
      return getLongestTripByTime(user);
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

     var map = GoogleMaps.maps.exampleMap.instance
     calculateAndDisplayRoute(directionsService, directionsDisplay);
     directionsDisplay.setMap(map);
  });

  	Tracker.autorun(function () {
        var val = Session.get("select_val");
        //GoogleMaps.ready('exampleMap', function(map) {
          if (GoogleMaps.maps.exampleMap) {
            var map = GoogleMaps.maps.exampleMap.instance
             calculateAndDisplayRoute(directionsService, directionsDisplay);
             directionsDisplay.setMap(map);
          }
        //});
	  });

});

Template.shortest_ride.onRendered(function() {
	GoogleMaps.load();

});

Template.shortest_ride.events({

})