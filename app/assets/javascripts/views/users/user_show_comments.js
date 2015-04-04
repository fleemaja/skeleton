ProjectSkeleton.Views.UserComments = Backbone.View.extend({

  events: {
	  "click .downvote": "downvote",
	  "click .upvote": "upvote",
    "click .shawnas": "pick"
  },

  template: JST['users/show_comments'],

  pick: function (event) {
    var that = this;
    filepicker.pick({}, function (Blob) {

      $(event.currentTarget).removeClass("shawnas");
      $(event.currentTarget).addClass("shawnas-disabled");
      $(event.currentTarget).html("Photo successfully uploaded!")

      that._lastFile = Blob.url;
    }, function (FPError) {

    })
  },

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

  updateCommentKarma: function(karma, comment_id){
	  var str = "div[comment-id=" + comment_id + "] > p .karma";
	  var currentKarma = parseInt($(str).html());
	  currentKarma += parseInt(karma);
	  $(str).html(currentKarma + " points");
  },

  downvote: function(event){
  	event.preventDefault();

	  var that = this;
	  if (ProjectSkeleton.currentUserId) {
		var id = $(event.currentTarget).attr("comment-id")
			  $.ajax({
			    type: "POST",
			    url: "/api/downvote",
			    data: { "comment_id": id }
			  }).done(function(data){
				  that.updateCommentKarma(data, id);
			  })
	  } else {
      $("#login-modal").addClass("is-active");

      $("body > *").not('#login-modal').css("opacity", '0.2');
	  };
  },

  upvote: function(event){
  	event.preventDefault();

	  var that = this;
	  if (ProjectSkeleton.currentUserId) {
		var id = $(event.currentTarget).attr("comment-id")
			  $.ajax({
			    type: "POST",
			    url: "/api/upvote",
			    data: { "comment_id": id }
			  }).done(function(data){
				  that.updateCommentKarma(data, id);
			  })
	  } else {
	  	$("#login-modal").addClass("is-active");

      $("body > *").not('#login-modal').css("opacity", '0.2');
	  };
  }
});
