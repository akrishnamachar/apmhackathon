import { Meteor } from 'meteor/meteor';

// UBER API tokens
// For now will just log in as me
// var CLIENT_ID = Meteor.settings.private.oAuth.uber.clientId;
// var CLIENT_SECRET = Meteor.settings.private.oAuth.uber.secret;
// var ACCESS_TOKEN = Meteor.settings.private.access_token;

// var client_uuid = "b4418b25-da8a-4f1e-adb0-80dd7bc500d6";

Meteor.methods({

    dumpJsonToUserInfo: function(path) {
        var myjson = {};
        myjson = JSON.parse(Assets.getText(path));
        for (var i=0; i<myjson.length; i++) {
            obj = myjson[i];
            UserInfo.insert(obj);
        }
    },

    dumpJsonToTripInfo: function(path) {
        var myjson = {};
        myjson = JSON.parse(Assets.getText(path));
        for (var i=0; i<myjson.length; i++) {
            obj = myjson[i];
            TripInfo.insert(obj);
        }
    },

    // Fix - Don't need callback here.
    // Should call this server-side on load. 
	loadProfileData: function(){
		var res = HTTP.call("GET","https://api.uber.com/v1/me", {
        	headers: {
            	Authorization: "Bearer " + ACCESS_TOKEN,
            	"Content-Type": "application/x-www-form-urlencoded"
         	}, function(err, result) {
         		if (err) {
         			console.log("Error, couldn't get the profile ");
         			console.log(err);
         		} else {
         			console.log("profile result: ");
         			console.log(result);

         		}
         	}
		});

        // insert data
        UserInfo.insert(res.data);

	},


    loadTripHistoryData: function() {
        var res = HTTP.call("GET","https://api.uber.com/v1.2/history", {
            headers: {
                Authorization: "Bearer " + ACCESS_TOKEN,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        var history_items = res.data.history;
        
        for (var i=0; i<history_items.length; i++) {
            var item = history_items[i];
            item.uuid = client_uuid;
            console.log(item);
            TripHistory.insert(item);
        }

    },


	// Takes the authorization code we got from the
	// redirect URL and get the access token.
	getAccessToken: function(auth_code) {
		console.log("in the beginning of getAccessToken");

		var headers= {
		      "Content-Type": "application/x-www-form-urlencoded"
		  };

    	var params = {
    		client_secret:CLIENT_SECRET,
    		client_id: CLIENT_ID,
    		grant_type: "authorization_code",
    		redirect_uri: "http://localhost:3000",
    		code:auth_code
    	};

    	var data = {
    		headers: headers, 
    		params: params
    	}

    	// Unset now
    	var access_token;

    	HTTP.call("POST","https://login.uber.com/oauth/v2/token", data, function(err, result) {
    		if (err) {
    			console.log("Error, couldn't get the access token. ")
    			console.log(err)
    		} else {
    			console.log("Result: ");
    			console.log(result.data.access_token);

    			access_token = result.data.access_token;
    		}
    	});
	},
})


Meteor.startup(() => {
    // UserInfo._ensureIndex('user_uuid', {unique: true});
    // TripHistory._ensureIndex('request_id', {unique: true});

    // var obj = HTTP.get("http://localhost:3000/ambika_trip_data.csv").data;
    // console.log(obj);

    // Let's try talking to Python
    // var test = HTTP.call("GET", "http://127.0.0.1:5000/test");   
    // console.log("TESTING HTTP CALL TO PYTHON");
    // console.log(test);

});
