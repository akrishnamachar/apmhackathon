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

	  // Get the user data
	  //Meteor.call("testProfileQuery");
	  Meteor.call('loadProfileData');
	  Meteor.call('loadTripHistoryData');

	  // TODO: Get the user email or uuid from server here. 

	  var user_info = UserInfo.findOne({"email":"akrishnamachar@uber.com"})
	  console.log("user info: ");
	  console.log(user_info);
	  if (user_info) {
		  Session.set("username",user_info.first_name);
		  Session.set("profile_pic", user_info.picture);
	  }

	  // We can use the `ready` callback to interact with the map API once the map is ready.
	  GoogleMaps.ready('exampleMap', function(map) {
	    // Add a marker to the map once it's ready
	    var marker = new google.maps.Marker({
	      position: map.options.center,
	      map: map.instance
	    });
	  });
});


Meteor.startup(function() {
	GoogleMaps.load();
});