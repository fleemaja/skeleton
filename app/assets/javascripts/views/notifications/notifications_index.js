ProjectSkeleton.Views.NotificationsIndex = Backbone.View.extend({

  template: JST['notifications/index'],

  events: {
	  "click .link-to-content": "updateReadStatus"
  },

  initialize:function () {
    this.render(this);
	  var that = this;
      setInterval(function(){
		  that.collection.fetch()
      }, 10 * 1000);

	  this.listenTo(this.collection, "sync", this.render);
  },

  render: function(){
	  var unRead = this.collection.where({is_read: false})

 	  var renderedContent = this.template({
 		  notifications: this.collection,
	 	  unRead: unRead
 	  });

 	  this.$el.html(renderedContent);
 	  return this;
  },

  updateReadStatus: function(event){
	  var id = $(event.currentTarget).attr("data-id");
	  var notification = this.collection.get(id);

	  notification.set({ is_read: true })
	  notification.save({}, {

		  success: function(response){},

		  error: function(response) {
			  console.log("notification save error", response);
		  }
	  });

	  var count = $(".notifications-num").html();
	  if (count > 0) {
		  count -= 1;
		  $(".notifications-num").html(count);
	  }
  }
});
