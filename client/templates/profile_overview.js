Template.profile_overview.helpers({
	profile_pic: function() {
		return Session.get("currUser").profile_pic_url;
	},

	first_name: function() {
		return Session.get("currUser").firstname
	},
})