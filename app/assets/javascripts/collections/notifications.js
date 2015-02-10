ProjectSkeleton.Collections.Notifications = Backbone.Collection.extend({

  model: ProjectSkeleton.Models.Notification,

  initialize: function(models, options){
  },

  url: "api/notifications",

  comparator: function(notification){
		return (-1 * notification.get("createdInt"));
  },

  getOrFetch: function(id){
	  var notifications = this;
	  var notifications = this.get(id);

	  if (notification) {
		  notification.fetch();
	  } else {
		  notification = new ProjectSkeleton.Models.Notification({ id: id });
		  notification.fetch({
			  success: function(){
				  notifications.add(notification);
			  }
		  });
	  }

	  return notification;
  }
});
