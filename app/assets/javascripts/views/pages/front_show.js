ProjectSkeleton.Views.FrontShow = Backbone.View.extend({

  template: JST['pages/show'],

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
	  "click .delete": "showDeleteModal",
	  "click #cancel-deletion": "cancelDelete"
   },

  initialize: function() {
	  this.listenTo(this.collection, "sort", this.render);
	  this.listenTo(this.collection, "sync fetch", this.render);
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
	  this.collection.changeSort("hotPosts");
	  this.collection.sort();
	  this.collection.fetch({
		  success: function(collection){
			  collection.changeSort("hotPosts");
			  collection.sort();
			  console.log(collection);
		  }
	  })
  },

  sortTop: function(){
	  var that = this;
	  this.collection.changeSort("topPosts");
	  this.collection.sort();
	  this.collection.fetch({
		  success: function(collection){
			  collection.changeSort("topPosts");
			  collection.sort();
		  }
	  })
  },

  sortNew: function(){
	  var that = this;
	  this.collection.changeSort("newPosts");
	  this.collection.sort();
	  this.collection.fetch({
		  success: function(collection){
			  collection.changeSort("newPosts");
			  collection.sort();
		  }
	  })
  },

  sortCon: function(){
	  var that = this;
	  this.collection.changeSort("conPosts");
	  this.collection.sort();
	  this.collection.fetch({
		  success: function(collection){
			  collection.changeSort("conPosts");
			  collection.sort();
		  }
	  })
  },


  sortBest: function(){
	  var that = this;
	  this.collection.changeSort("bestPosts");
	  this.collection.sort();
	  this.collection.fetch({
		  success: function(collection){
			  collection.changeSort("bestPosts");
			  collection.sort();
		  }
	  })
  },

  newSubReddit: function(event){
  	event.preventDefault();
	  if (ProjectSkeleton.currentUserId) {
		  $("#new-subreddit-modal").addClass("is-active");
		  $("input.new-subreddit").off();
	  	$("input.new-subreddit").one("click", this.submitSubReddit);

	  } else {
		  $("#login-modal").addClass("is-active");
  	  $("input[type=password]").val("");
	  };
  },

  submitSubReddit: function(event){
	  event.preventDefault();
	  $("#new-subreddit-modal").removeClass("is-active");

	  var form = $(event.currentTarget).closest("form");
	  var params = form.serializeJSON();
	  $(event.currentTarget).closest('form').find("input[type=text], textarea").val("");

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
		  $("input.new-post").off();
	  	$("input.new-post").one("click", that.submitPost);

    } else {
		  $("#login-modal").addClass("is-active");
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
			  ProjectSkeleton.posts.unshift(model);
			  // that.collection.fetch();
        Backbone.history.navigate("/posts/" + post.get("id"), { trigger: true })
      }
	  });

	  $("a.new").click();
  },

  render: function(){
	  var renderedContent = this.template({
		  posts: this.collection,
		  navTemplate: JST["pages/_front_nav_bar"],
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
 	  $(str).html(currentKarma);
 	  if (this.collection.get(postId).get("poster_id") === ProjectSkeleton.currentUserId) {
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
	  	  $("input[type=password]").val("");
	  };
  },

  searchPosts: function(event){
	  event.preventDefault();

	  var data = $(event.currentTarget).serializeJSON();
	  var that = this;
	  console.log(data)
	  $.ajax({
	    type: "GET",
	    url: "/api/search_posts",
	    data: data
	  }).done(function(data){
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
