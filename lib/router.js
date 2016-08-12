FlowRouter.route('/signin', {
    action: function(params) {
        Tracker.autorun(function() {
      BlazeLayout.render('layout1', {main: "signin"});
        });
      }
});

FlowRouter.route('/', {
    action: function(params) {
        Tracker.autorun(function() {

          if (Session.get('user_email')) {
              BlazeLayout.render('layout1', {main: "main"});
          }
          else {
            BlazeLayout.render('layout1', {main: "signin"});
          }
			
        });
      }
});