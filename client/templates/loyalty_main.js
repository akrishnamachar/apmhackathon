Template.loyalty.helpers({

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

Template.loyalty.events({

	'change #main-select': function() {

		var val = $("#main-select").val();

		// Hide and show the relevant parts of the DOM
		if (val=="num_rides") {
			Session.set("type", "num_rides");

			$(".num-rides-taken").show();
			$(".amt-money-spent").hide();
			$(".num-miles-travelled").hide();
			$(".map-container").hide();
			$(".rank-nums").show()

		} else if (val=="money_spent") {
			Session.set("type", "money_spent");

			$(".num-rides-taken").hide();
			$(".amt-money-spent").show();
			$(".num-miles-travelled").hide();
			$(".map-container").hide();
			$(".rank-nums").show()

		} else if (val=="miles_travelled"){
			Session.set("type", "miles_travelled");

			$(".num-rides-taken").hide();
			$(".amt-money-spent").hide();
			$(".num-miles-travelled").show();
			$(".map-container").hide();
			$(".rank-nums").show()

		} else if (val=="where_been") {
			$(".num-rides-taken").hide();
			$(".amt-money-spent").hide();
			$(".num-miles-travelled").hide();
			$(".map-container").show();
			$(".rank-nums").hide()
		}

	}
});

Template.loyalty.onRendered(function() {

	$(".num-rides-taken").show();
	$(".amt-money-spent").hide();
	$(".num-miles-travelled").hide();

	$(".map-container").hide();
});

Template.loyalty.onCreated(function() {

	  GoogleMaps.ready('exampleMap', function(map) {

	    // Add a marker to the map once it's ready
	    var marker1 = new google.maps.Marker({
	      position: map.options.center,
	      map: map.instance
	    });
	  });



	Session.set("type", "num_rides");
	
	Tracker.autorun(function () {


	  // Meteor.call('loadProfileData');
	  // Meteor.call('loadTripHistoryData');

		var user_info = UserInfo.findOne({"email":"akrishnamachar@uber.com"})
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


