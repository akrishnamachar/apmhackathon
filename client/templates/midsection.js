Template.midsection.helpers({

});

Template.midsection.events({
	'change #main-select': function() {

		var val = $("#main-select").val();

		Session.set("select_val", val);

		// Hide and show the relevant parts of the DOM
		$(".data-container").hide();

		if (val=="shortest_ride") {
			$("#shortest_ride_container").show();
		} else if (val=="longest_ride") {
			$("#longest_ride_container").show();
		} else if (val=="favorite_times") {
			$("#favorite_times_container").show();
		} else if (val=="rider_rating") {
			$("#rider_rating_container").show();
		} else if (val=="vehicle_type") {
			$("#preferred_type_container").show();
		} else if (val=="where_travelled") {
			$("#where_travelled_container").show();
		}
	}
});

Template.midsection.onRendered(function() {
	$(".data-container").hide();
	$("#shortest_ride_container").show();

});
