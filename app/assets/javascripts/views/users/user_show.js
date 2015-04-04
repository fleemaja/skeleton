ProjectSkeleton.Views.UserShow = Backbone.View.extend({

  events: {
    "click .downvote": "downvote",
    "click .upvote": "upvote"
  },

  template: JST['users/show_posts'],

  render: function(){
    var renderedContent = this.template({
  	  user: this.model,
  		textTemplate: JST["posts/_show_text"],
  		commentTemplate: JST["comments/_show"],
  		navTemplate: JST["users/_nav_bar"]
  	});

  	this.$el.html(renderedContent);
  	return this;
  },

  updatePostKarma: function(karma, postId){
 	  var str = "div[post-id=" + postId + "] > p .karma";
 	  var currentKarma = parseInt($(str).html());
 	  currentKarma += parseInt(karma);
 	  $(str).html(currentKarma + " points");
 	  if (this.model.posts().get(postId).get("poster_id") === ProjectSkeleton.currentUserId) {
 	    this.updateCurrentUserKarma(karma)
 	  }
  },

  updateCurrentUserKarma: function(karma) {
 	  var currentKarma = parseInt($("span.user-karma").html());
 	  currentKarma += parseInt(karma);
 	  $("span.user-karma").html(currentKarma);
   },

  downvote: function(event){
   	event.preventDefault();

 	  var that = this;
 	  if (ProjectSkeleton.currentUserId) {
 		  var id = $(event.currentTarget).attr("post-id")
   		  if (id){
   			  $.ajax({
   			    type: "POST",
   			    url: "/api/downvote",
   			    data: { "post_id": id}
   			  }).done(function(data){
 				    that.updatePostKarma(data, id);
   			  });
   		  }
 	  } else {
 	    $("#login-modal").addClass("is-active");

      $("body > *").not('#login-modal').css("opacity", '0.2');
 	  };
   },

  upvote: function(event){
   	event.preventDefault();

 	  var that = this;
 	  if (ProjectSkeleton.currentUserId) {
 		  var id = $(event.currentTarget).attr("post-id")
   		  if (id){
   			  $.ajax({
   			    type: "POST",
   			    url: "/api/upvote",
   			    data: { "post_id": id }
   			  }).done(function(data){
 				    that.updatePostKarma(data, id);
   			  });
   		  }
 	  } else {
 		  $("#login-modal").addClass("is-active");

      $("body > *").not('#login-modal').css("opacity", '0.2');
 	  };
  }
});
