getShortestTripByTime = function(user) {
  	ride_id = user.shortest_ride_id;
  	var trip = TripInfo.findOne({"uuid":ride_id});
  	return trip;
};

getShortestTripByDist = function(user) {
	ride_id = user.shortest_ride_id_miles;
  	var trip = TripInfo.findOne({"uuid":ride_id});
  	return trip;
};

getLongestTripByTime = function(user) {
  	ride_id = user.longest_ride_id;
  	var trip = TripInfo.findOne({"uuid":ride_id});
  	return trip;
};

getLongestTripByDist = function(user) {
	ride_id = user.longest_ride_id_miles;
  	var trip = TripInfo.findOne({"uuid":ride_id});
  	return trip;
}

