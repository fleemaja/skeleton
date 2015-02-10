ProjectSkeleton.Views.UserShow = Backbone.View.extend({

  events: {
    "click .downvote": "downvote",
    "click .upvote": "upvote",
    "change #user-avatar-input": "fileSelect",
    "submit form": "submitAvatar"
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
 	  $(str).html(currentKarma);
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
 	  };
   },

   fileSelect: function(event){
     var that = this;
     var imageFile = event.currentTarget.files[0];
     var reader = new FileReader();

     reader.onloadend = function(){
       that.model.set("avatar", this.result);
       that._updatePreview(this.result);
     }

     if(imageFile){
       reader.readAsDataURL(imageFile);
     } else {
       this._updatePreview("");
     }
   },

   _updatePreview: function(imageData){
     this.$el.find(".avatar-section img").attr("src", imageData);
   },

  submitAvatar: function(event){
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();

    event.preventDefault();
    this.model.save({
      success: function(){
        ProjectSkeleton.users.add(that.model);

          // Remove the image attribute with raw data
          // from the model after uploading it.
          delete that.model.attributes.avatar;

          Backbone.history.navigate("/users/" + that.model.id, { trigger: true });
        },

	  	error: function(response){
			  console.log(response);
	    }
    })
  }
});
