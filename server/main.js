import { Meteor } from 'meteor/meteor';

// UBER API tokens
// For now will just log in as me
var CLIENT_ID = "I2DTr5dVTRayGl9XRMxbJ5039T8eEmDk";
var CLIENT_SECRET = "ZGaRJJYGzFls29L-BEQMJ04wOFogRxd2iW_xbqhb";
var SERVER_TOKEN = "dNjo-RmtiBNTIr9f1pN5VdyYoCCbj2SWE-DwlMVv";

// this may expire etc
var ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsicHJvZmlsZSIsImhpc3RvcnkiXSwic3ViIjoiYjQ0MThiMjUtZGE4YS00ZjFlLWFkYjAtODBkZDdiYzUwMGQ2IiwiaXNzIjoidWJlci11czEiLCJqdGkiOiIzMzNjNjE5OS1kYWNmLTRjMDMtYTM5Yy04NzIwOWQzYWYyMDEiLCJleHAiOjE0NzM0NDA4OTQsImlhdCI6MTQ3MDg0ODg5MywidWFjdCI6Ill3eDBzeUVtcE44NFptNFJpMXkxNEU4R2JkMmFNNCIsIm5iZiI6MTQ3MDg0ODgwMywiYXVkIjoiSTJEVHI1ZFZUUmF5R2w5WFJNeGJKNTAzOVQ4ZUVtRGsifQ.XiZUL4c21Ml68NxUrUbP5zQpQVEL6V_xjyr5q6P4lxKpf25fHXd2lbvo4E4Agz4OPPBtIN-81-AO7d34m2or4sN3F6oai26vF036ikiq0Z3YQAf8gONoUNjySMAfR2gvA7k8IHA7L_ya9ytyTLwsukfu-5bPVSo90YclpmGOFjnqAoT7EGRN53YBrw7t0KdUdq0ZyKKLfCIWXt6JAxy1SHjbMH_lOAQ7DMQIEptZZnQsJPnE1OoCbwC-jql00BNd_OAbVW5wyQ5bG_fafFlkzx0VZdTYEBbwKSC5yrRDe7X5cD8mkhsktJ-Ut3V3mUKKpzOSsUd05Kelet3GpacgLg"

Meteor.methods({

	testProfileQuery: function(access_token){
		res = HTTP.call("GET","https://api.uber.com/v1/me", {
        	headers: {
            	Authorization: "Bearer " + access_token,
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
		console.log(res);

	},

	testHistoryQuery: function(access_token){
		HTTP.call("GET","https://api.uber.com/v1.2/history", {
        	headers: {
            	Authorization: access_token,
            	"Content-Type": "application/x-www-form-urlencoded"
         	}, function(err, result) {
         		if (err) {
         			console.log("Error, couldn't get the history. ");
         			console.log(err);
         		} else {
         			console.log("history result: ");
         			console.log(result);
         		}
         	}
		});
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

});
