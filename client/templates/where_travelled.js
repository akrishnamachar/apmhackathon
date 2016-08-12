Template.where_travelled.helpers({
  whereBeenMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
});

Template.where_travelled.onRendered(function() {
  GoogleMaps.load();
});

Template.where_travelled.onCreated(function() {
  console.log("WHERE TRAVELLED ON CREATED")

  Tracker.autorun(function() {
    var val = Session.get("select_val");
  GoogleMaps.ready('whereBeenMap', function(map) {


    user = Session.get("currUser");
    trips = TripInfo.find({"client_uuid":user.uuid});

    for (var i=0; i<trips.length; i++) {
      var trip = trips[i]
      tripStartLoc = new google.maps.LatLng(trip.request_lat, trip.request_lng);
      var newMarker = new google.maps.Marker({
        position:tripStartLoc,
        map: map.instance
      })
    }

    // var marker1 = new google.maps.Marker({
    //   position: map.options.center,
    //   map: map.instance
    // });

    // var marker2 = new google.maps.Marker({
    //   position: new google.maps.LatLng(-37.86, 144.31),
    //   map: map.instance
    // });
  });
  })
  // We can use the `ready` callback to interact with the map API once the map is ready.

});