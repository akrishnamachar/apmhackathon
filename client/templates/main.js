Template.main.helpers({

	profile_pic: function() {
		return Session.get("currUser").profile_pic_url;
	},

	first_name: function() {
		return Session.get("currUser").firstname
	},

	star_rating: function() {
		return 4.5;
	},

	user_num_rides: function() {
		return Session.get("currUser").num_rides_taken
	},


	exampleMapOptions: function() {
	// Make sure the maps API has loaded
	if (GoogleMaps.loaded()) {
	  // Map initialization options
	  return {
	    center: new google.maps.LatLng(-37.8136, 144.9631),
	    zoom: 8
	  };
	}
	}


})

Template.main.events({

});



Template.main.onCreated(function() {

	Session.set("type", "num_rides");
	
	Tracker.autorun(function () {


	  // Meteor.call('loadProfileData');
	  // Meteor.call('loadTripHistoryData');

	  	var user_email = Session.get("user_email");
		var user_info = UserInfo.findOne({"email":user_email})
	    if(user_info) { 
	    	console.log("user info in tracker autorun");
	    	console.log(user_info);
	    	Session.set("currUser", user_info);
	    };    
	  });


});

Meteor.startup(function() {
	GoogleMaps.load();
})


