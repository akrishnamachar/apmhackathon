Template.home.helpers({



})

Template.home.events({

	'click #dummy_button': function() {
		console.log("dummybutton clicked");

		// TODO: Remove hard-coded Client ID here. 
		window.location.replace("https://login.uber.com/oauth/v2/authorize?client_id=I2DTr5dVTRayGl9XRMxbJ5039T8eEmDk&response_type=code");
	}
});

Template.home.onCreated(function() {

	var current_route = FlowRouter.current();

	if (current_route.queryParams.code) {
		// Means we have an auth code
		var auth_code = current_route.queryParams.code;

		// Pass the value to the server
		Meteor.call("getAccessToken", auth_code);
	}


});