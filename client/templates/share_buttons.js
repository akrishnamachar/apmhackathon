Template.share_buttons.helpers({
	tweet_text: function() {
		var user = Session.get("currUser");
		var seconds = getShortestTripByTime(user).trip_duration_seconds;
		return "My shortest Uber ride ever was " + seconds + " seconds! Check out your own crazy stats. "
	},

	fb_text: function() {

	}
});

Template.share_buttons.events({

	'click #tweet': function(ev) {
    ev.preventDefault();
    // Remove existing iframe
    $('#tweetBtn iframe').remove();
    // Generate new markup
    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .addClass('big-twitter-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-url', 'http://test.com')
        .attr('data-text', $('#tweetText').val());
    $('#tweetBtn').append(tweetBtn);
    twttr.widgets.load();
	}
})