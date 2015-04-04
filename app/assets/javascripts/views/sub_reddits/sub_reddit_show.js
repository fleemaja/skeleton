ProjectSkeleton.Views.SubRedditShow = Backbone.View.extend({
  template: JST['sub_reddits/show'],

  events: {

	  "click .hot": "sortHot",
	  "click .new": "sortNew",
	  "click .controversial": "sortCon",
	  "click .top": "sortTop",
	  "click .best": "sortBest",
	  "click .downvote": "downvote",
	  "click .upvote": "upvote",
	  "click .new-subreddit": "newSubReddit",
	  "click .new-text": "newPost",
	  "submit .search-posts": "searchPosts",
    "submit .new-subreddit-form": "submitSubReddit",
	  "click .delete": "showDeleteModal",
	  "click #cancel-deletion": "cancelDelete",
    "click .shawnas": "pick"
   },

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

  initialize: function() {
	  this.listenTo(this.model.posts(), "sort add remove", this.render);
	  this.listenTo(this.model, "fetch", this.render);
	  this.listenTo(ProjectSkeleton.subReddits, "add remove", this.render);
  },

  showDeleteModal: function(event){
	  event.preventDefault();
	  var type; var typeId;
	  var outerDiv = $(event.currentTarget).closest("div")

	  if (outerDiv.attr("post-id")){
		  type = "post";
		  typeId = outerDiv.attr("post-id")

	  } else {
		  type = "comment";
		  typeId = outerDiv.attr("comment-id");
	  }

	  $("input#confirm-deletion").off();
	  $("input#confirm-deletion").attr("data-type", type);
	  $("input#confirm-deletion").attr("data-id", typeId);
  	$("input#confirm-deletion").one("click", this.deleteItem);
	  $("#delete-modal").addClass("is-active");
  },

  cancelDelete: function(event){
	  event.preventDefault();
	  $("#delete-modal").removeClass("is-active");
	  $("input#confirm-deletion").off();
	  $("input#confirm-deletion").attr("data-type", "");
	  $("input#confirm-deletion").attr("data-id", "");
  },

  deleteItem: function(event) {
	  event.preventDefault();
	  $("#delete-modal").removeClass("is-active")
	  var type = $(event.currentTarget).attr("data-type");
	  var typeId = $(event.currentTarget).attr("data-id");

	  if (type == "post") {
		  item = ProjectSkeleton.posts.getOrFetch(typeId);
	  } else {
		  item = ProjectSkeleton.comments.getOrFetch(typeId);
	  }
	  item.destroy();

	  var str = "div." + type + "[" + type + "-id=\"" + typeId + "\"]";
	  $(str).closest("li").remove();
  },

  sortHot: function(){
	  var that = this;
	  this.model.posts().changeSort("hotPosts");
	  this.model.posts().sort();
	  this.model.fetch({
		  success: function(model){
			  model.posts().changeSort("hotPosts");
			  model.posts().sort();
		  }
	  })
  },

  sortTop: function(){
	  var that = this;
	  this.model.posts().changeSort("topPosts");
	  this.model.posts().sort();
	  this.model.fetch({
		  success: function(model){
			  model.posts().changeSort("topPosts");
			  model.posts().sort();
		  }
	  })
  },

  sortNew: function(){
	  var that = this;
	  this.model.posts().changeSort("newPosts");
	  this.model.posts().sort();
	  this.model.fetch({
		  success: function(model){
			  model.posts().changeSort("newPosts");
			  model.posts().sort();
		  }
	  })
  },

  sortCon: function(){
	  var that = this;
	  this.model.posts().changeSort("conPosts");
	  this.model.posts().sort();
	  this.model.fetch({
		  success: function(model){
			  model.posts().changeSort("conPosts");
			  model.posts().sort();
		  }
	  })
  },

  sortBest: function(){
	  var that = this;
	  this.model.posts().changeSort("bestPosts");
	  this.model.posts().sort();
	  this.model.fetch({
		  success: function(model){
			  model.posts().changeSort("bestPosts");
			  model.posts().sort();
		  }
	  })
  },

  newSubReddit: function(event){
  	event.preventDefault();
	  if (ProjectSkeleton.currentUserId) {
		  $("#new-subreddit-modal").addClass("is-active");

      $("body > *").not('#new-subreddit-modal').css("opacity", '0.2');

		  $(event.currentTarget).closest('form').find("input[type=text], textarea").val("");
		  $("input.new-subreddit").off()
	  	$("input.new-subreddit").one("click", this.submitSubReddit);

	  } else {
		  $("#login-modal").addClass("is-active");

      $("body > *").not('#login-modal').css("opacity", '0.2');

  	  $("input[type=password]").val("");
	  };
  },

  submitSubReddit: function(event){

	  event.preventDefault();
	  $("#new-subreddit-modal").removeClass("is-active");
	  var form = $(event.currentTarget).closest("form");
	  var params = form.serializeJSON();
	  var subReddit = new ProjectSkeleton.Models.SubReddit(params);
	  var that = this;

	  subReddit.save({}, {
		  success: function(model){
			  ProjectSkeleton.subReddits.unshift(model);
        Backbone.history.navigate("/subreddits/" + subReddit.get("id"), { trigger: true })
        window.location.reload(true);
      }
	  });
  },

  newPost: function(event){
  	event.preventDefault();
	  var that = this;
	  if (ProjectSkeleton.currentUserId) {
		  $("#new-post-modal").addClass("is-active");

      $("body > *").not('#new-post-modal').css("opacity", '0.2');

		  $("input.new-post").off();
	  	$("input.new-post").one("click", this.submitPost);

    } else {
		  $("#login-modal").addClass("is-active");

      $("body > *").not('#login-modal').css("opacity", '0.2');

  	  $("input[type=password]").val("");
	  };
  },

  submitPost: function(event){
	  event.preventDefault();
	  $("#new-post-modal").removeClass("is-active");

	  var form = $(event.currentTarget).closest("form");
	  var params = form.serializeJSON();
	  $(event.currentTarget).closest('form').find("input[type=text], textarea").val("");

	  var post = new ProjectSkeleton.Models.Post(params);
	  var that = this;

	  post.save({}, {
		  success: function(model){
			  ProjectSkeleton.posts.unshift(post);
			  // that.model.fetch();
        Backbone.history.navigate("/posts/" + post.get("id"), { trigger: true })
        $("body > *").not('#new-post-modal').css("opacity", '1');
		  }
	  });

	  $("a.new").click();
  },


  render: function(){

	  var renderedContent = this.template({
		  subReddit: this.model,
		  navTemplate: JST["sub_reddits/_nav_bar"],
		  textTemplate: JST["posts/_show_text"]
	  })

	  this.$el.html(renderedContent);
	  return this;
  },

  renderPosts: function(){
	  var el = $(".subreddit-posts.")
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

	  	  $("input[type=password]").val("");
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

	  	$("input[type=password]").val("");
	  };
  },

  searchPosts: function(event){
	  event.preventDefault();

	  var data = $(event.currentTarget).serializeJSON();
	  var that = this;
	  $.ajax({
	    type: "GET",
	    url: "/api/search_posts",
	    data: data
	  })
	  .done(function(data){
		  var results = new ProjectSkeleton.Collections.Posts(data, { parse: true })
		  that.renderSearch(results);
	  });
  },

  renderSearch: function(collection){
	  var renderedContent = JST["pages/show"]({
		  posts: collection,
		  navTemplate: JST["pages/_search_nav_bar"],
		  textTemplate: JST["posts/_show_text"]
	  })

	  this.$el.html(renderedContent);
	  return this;
  }
});
