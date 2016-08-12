Template.signin.events({

	'click #signin-submit': function() {
		var email = $("#email-input").val()
		Session.set("user_email", email);
		console.log("user email is " + Session.get("user_email"));
		FlowRouter.go("/")
	}
})