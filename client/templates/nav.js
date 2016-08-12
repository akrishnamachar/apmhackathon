Template.nav.events({

	'click #logout-button-link': function() {
		FlowRouter.go("/signin")
	}

});

Template.nav.onRendered(function() {
	$(".navbar-right").hide();
});