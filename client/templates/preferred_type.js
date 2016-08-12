var Highcharts = require('highcharts/highstock');

// Stuff for chart
var return_count = function(user, type) {
	if (type=="uberX") {
		if (user.uberX_count) {
			return user.uberX_count;
		}
		return 0;

	} else if (type=="uberPOOL") {
		if (user.uberPOOL_count) {
			return user.uberPOOL_count;
		}
		return 0;

	} else if (type=="uberSELECT") {
		if (user.uberSELECT_count) {
			return user.uberSELECT_count;
		}
		return 0;
	} else if (type=="uberEATS") {
		if (user.uberEATS_count) {
			return user.uberEATS_count;
		}
		return 0;

	} else if (type=="uberBLACK") {
		if (user.uberBLACK_count) {
			return user.uberBLACK_count;
		}
		return 0;

	} else if (type=="uberXL") {
		if (user.uberXL_count) {
			return user.uberXL_count;
		}
		return 0;

	}
}

Template.preferred_type.helpers({

		yourUberText: function() {
			return "UberX, the low-cost Uber!"			
		},

	    createChart: function () {
      // Gather data: 

      		var user = Session.get("currUser")
	        tasksData = [{
	            y: return_count(user, "uberX"),
	            name: "UberX"
	         }, {
	             y: return_count(user, "uberPOOL"),
	             name: "UberPOOL"
	         },{
	             y: return_count(user, "uberEATS"),
	             name: "UberEATS"
	         }, {
	             y: return_count(user, "uberBLACK"),
	             name: "UberBLACK"
	         }, {
	             y: return_count(user, "uberSELECT"),
	             name: "UberSELECT"
	         }];
	      // Use Meteor.defer() to craete chart after DOM is ready:
		      Meteor.defer(function() {
		        // Create standard Highcharts chart with options:
		        Highcharts.chart('chart', {
		         	series: [{
		            	type: 'pie',
		            	data: tasksData
		          	}],
		            tooltip: {
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			        },
			        plotOptions: {
	            		pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
	            	}
			        },
			        title:{
					    text:''
					}
			    });
		      });
    	}
})