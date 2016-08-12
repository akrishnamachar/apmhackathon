Template.rider_rating.helpers({
	rider_rating: function() {
		user = Session.get("currUser");
		return user.rating;
	}
});