FlowRouter.route('/dash', {
    action: function(params) {
        Tracker.autorun(function() {
      BlazeLayout.render('layout1', { top: "dashboard", main: "content"});
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