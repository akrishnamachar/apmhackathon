FlowRouter.route('/dash', {
    action: function(params) {
        Tracker.autorun(function() {
      BlazeLayout.render('layout1', { top: "dashboard", main: "content"});
        });
      }
});

FlowRouter.route('/win', {
    action: function(params) {
        Tracker.autorun(function() {
      BlazeLayout.render('layout1', {main: "loyalty"});
        });
      }
});


FlowRouter.route('/', {
    action: function(params) {
        Tracker.autorun(function() {
			BlazeLayout.render('layout1', { top: "home", main: "content"});
        });
      }
});