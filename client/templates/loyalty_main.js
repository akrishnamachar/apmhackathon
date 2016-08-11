Template.loyalty.helpers({



})

Template.loyalty.events({

	'change #main-select': function() {

		var val = $("#main-select").val();

		// Hide and show the relevant parts of the DOM
		if (val=="num_rides") {
			$(".num-rides-taken").show();
			$(".amt-money-spent").hide();
			$(".num-miles-travelled").hide();

		} else if (val=="money_spent") {
			$(".num-rides-taken").hide();
			$(".amt-money-spent").show();
			$(".num-miles-travelled").hide();

		} else if (val=="miles_travelled"){
			$(".num-rides-taken").hide();
			$(".amt-money-spent").hide();
			$(".num-miles-travelled").show();
		}
	}
});

Template.loyalty.onRendered(function() {

	$(".num-rides-taken").show();
	$(".amt-money-spent").hide();
	$(".num-miles-travelled").hide();

})