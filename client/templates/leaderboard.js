Template.leaderboard.helpers({

	sorted_users: function() {
		var val = Session.get("select_val");	
		var user = Session.get("currUser");
		var users;

		var data_list = []
		if (val=="num_rides") {
			users = UserInfo.find({}, {sort: {"num_rides_taken":-1}}).fetch();
			for (var i=0; i<users.length; i++) {
				var u = users[i];
				data = {
  					name: u.firstname,
 					value: u.num_rides_taken,
 					pic_url: u.profile_pic_url
				}
				data_list.push(data);
			}

		} else if (val=="rider_rating") {
			// TODO HERE
			users = UserInfo.find({}, {sort: {"rating":-1}}).fetch();
			for (var i=0; i<users.length; i++) {
				var u = users[i];
				data = {
  					name: u.firstname,
 					value: u.rating,
 					pic_url: u.profile_pic_url
				}
				data_list.push(data);
			}
		} else if (val=="shortest_ride") {
			users = UserInfo.find({}, {sort: {"rating":-1}}).fetch();
				for (var i=0; i<users.length; i++) {
					var u = users[i];
					// Get the shortest ride dist
					trip = getShortestTripByTime(u);
					data = {
	  					name: u.firstname,
	 					value: trip.trip_duration_seconds,
	 					pic_url: u.profile_pic_url,
	 					units: "seconds"
					}
					data_list.push(data);
				}
		}
		return data_list
	}

});
