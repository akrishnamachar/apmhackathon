Template.content.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  },

  name: function() {
  	return Session.get("username");
  },

  profile_pic_url: function() {
  	return Session.get("profile_pic");
  }

});

// Template.content.onRendered(function() {
// 	Meteor.call("testProfileQuery");

// })

Template.content.onCreated(function() {

	Tracker.autorun(function () {

	  // Meteor.call('loadProfileData');
	  // Meteor.call('loadTripHistoryData');

		var user_info = UserInfo.findOne({"email":"akrishnamachar@uber.com"})
	    if(user_info) { 
	    	console.log("user info in tracker autorun");
	    	Session.set("username",user_info.first_name);
			Session.set("profile_pic", user_info.picture);

			  GoogleMaps.ready('exampleMap', function(map) {

			  	var trips = QuerybuilderTripData.find().fetch();

			  	//var trips = TripHistory.find({"uuid": "b4418b25-da8a-4f1e-adb0-80dd7bc500d6"}).fetch()
			  	if (trips) {
			  		console.log(trips)
				  	for (var i=0; i<trips.length; i++) {
				  		var trip = trips[i];
				  		var startLat = trip.request_lat;
				  		var startLong = trip.request_lng;
				  		var latlng = {lat: startLat, lng: startLong}
				  		var new_marker = new google.maps.Marker({
					      position: latlng,
					      map: map.instance
					    });

				  	}
			  	}
			  });

	    };    
	  });


		  // We can use the `ready` callback to interact with the map API once the map is ready.
		  // GoogleMaps.ready('exampleMap', function(map) {

		  // 	var myLatLng = {lat: -25.363, lng: 131.044};

		  //   // Add a marker to the map once it's ready
		  //   var marker1 = new google.maps.Marker({
		  //     position: map.options.center,
		  //     map: map.instance
		  //   });

		  //  	var marker2 = new google.maps.Marker({
		  //     position: myLatLng,
		  //     map: map.instance
		  //   });
		  // });
});


Meteor.startup(function() {
	GoogleMaps.load();
});