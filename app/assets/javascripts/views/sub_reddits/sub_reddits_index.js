ProjectSkeleton.Views.SubRedditsIndex = Backbone.View.extend({

  template: JST['sub_reddits/index'],

  initialize: function(){
	  this.listenTo(ProjectSkeleton.subscriptions, "sync add remove", this.collFetch);
	  this.listenTo(this.collection, "sync add", this.render);
  },

  events: {
	  "click .subscribe-button": "showLoginModal",
	  "click .unsubscribe": "unsubscribe",
	  "click .subscribe": "subscribe"
  },

  collFetch: function(){
	  this.collection.fetch()
  },

  showLoginModal: function(event){
	  event.preventDefault();
	  $("#login-modal").addClass("is-active");
  },

  unsubscribe: function(event){
  	event.preventDefault();
	  var that = this;
	  var form = $(event.currentTarget).closest("form")
	  var subscriptionId = form.attr("sub-id");
	  var subredditId = form.attr("data-id")
	  var subscription = ProjectSkeleton.subscriptions.getOrFetch(subscriptionId);
	  subscription.destroy({
		  wait: true,

		  success: function(model){
			  ProjectSkeleton.subReddits.fetch({reset: true})
		  }
	  });

	  var str = "li[sub-id=" + subredditId + "]";
	  $(str).remove()
  },

  subscribe: function(event){
  	event.preventDefault();
	  var that = this;
	  var subredditId = $(event.currentTarget).closest("form").attr("data-id");
	  var subscription = new ProjectSkeleton.Models.Subscription({
		  user_id: ProjectSkeleton.currentUserId,
		  subreddit_id: subredditId
	  });

	  subscription.collection = ProjectSkeleton.subscriptions;
	  subscription.save({}, {
		  success: function(){
 			  that.collection.fetch();
		  }
	  });

	  var subredditName = ProjectSkeleton.subReddits.get(subredditId).get("name").toUpperCase();
	  var html = "<li sub-id=" + subredditId + "><a href=\"#/subreddits/" + subredditId + "\">" + subredditName + "</a></li>"
	  $(".random-subreddits > ul").append(html);
	  $("ul.dropdown-subreddits").append(html);
  },

  render: function(){
	  var renderedContent = this.template({ subReddits: this.collection })
	  this.$el.html(renderedContent);
	  return this;
  }
});
