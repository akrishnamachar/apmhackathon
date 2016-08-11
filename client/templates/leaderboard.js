Template.leaderboard.helpers({

	sorted_users: function() {
		var type = Session.get("type");
		var user = Session.get("currUser");
		var data_list = []
		if (type=="num_rides") {
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

		} else if (type=="miles_travelled") {

		} else if (type=="time_riding") {

		}
		return data_list
	}

});
