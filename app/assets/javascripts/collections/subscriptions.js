ProjectSkeleton.Collections.Subscriptions = Backbone.Collection.extend({

  model: ProjectSkeleton.Models.Subscription,

	url: '/api/subreddits/',

  getOrFetch: function(id){
	  var subscriptions = this;
	  var subscription = this.get(id);

	  if (subscription) {
		  subscription.fetch();
   } else {
		  subscription = new ProjectSkeleton.Models.Subscription({ id: id });
		  subscription.fetch({
			  success: function(){
				  subscriptions.add(subscription);
			  }
		  });
	  }

	  return subscription;
  }
});

var subscriptions = ProjectSkeleton.subscriptions = new ProjectSkeleton.Collections.Subscriptions();
