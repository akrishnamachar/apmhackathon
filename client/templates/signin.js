Template.signin.events({

	'click #signin-submit': function() {
		var email = $("#email-input").val()
		Session.set("user_email", email);
		FlowRouter.go("/")
	}
})