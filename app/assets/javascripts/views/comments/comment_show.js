ProjectSkeleton.Views.CommentShow = Backbone.View.extend({

  template: JST['comments/start_show'],

  initialize: function() {
	  this.listenTo(this.model.comments(), "add remove sort", this.render);
	  this.listenTo(this.model, "fetch", this.render)
  },


  render: function(){
	 var renderedContent = this.template({
		 comment: this.model,
		 templateFn: JST["comments/show"],
		 navTemplateFn: JST["comments/_nav_bar"]

	 });

	 this.$el.html(renderedContent);
	 return this;
  },

  events: {
	  "click .reply a": "showForm",
	  "click .commment-comment input": "submitComment",
	  "click .hot": "sortHot",
	  "click .new": "sortNew",
	  "click .controversial": "sortCon",
	  "click .top": "sortTop",
	  "click .best": "sortBest",
	  "click .downvote": "downvote",
	  "click .upvote": "upvote",
	  "click .new-subreddit": "newSubReddit",
	  "click .new-text": "newPost",
	  "submit .search-posts": "searchPosts"
  },


  updateCommentKarma: function(karma, comment_id){
	  var str = "div[comment-id=" + comment_id + "] > p .karma";
	  var currentKarma = parseInt($(str).html());
	  currentKarma += parseInt(karma);
	  $(str).html(currentKarma);
  },


  submitComment: function(event) {
	  event.preventDefault();
	  var that = this;
	  var params = $(event.currentTarget).closest("form").serializeJSON();
	  var comment = new ProjectSkeleton.Models.Comment(params["comment"]);
	  console.log(params)
	  comment.save({}, {
		  success: function(model){
			  that.model.fetch({
				  success: function(){

					  that.render()
				  }

			  });

		  }
	  });

  },


  showForm: function(event){
	  event.preventDefault();

	  if (ProjectSkeleton.currentUserId) {
		  var dataId = $(event.currentTarget).attr("data-id");
		  var str = "form[data-id=" + dataId + "]";
		  $(str).toggleClass("hidden");

	  } else {
		  $("#login-modal").addClass("is-active");
	  };

  },

  sortHot: function(){
	  var that = this;
	  this.model.comments().changeSort("hotPosts");
	  this.model.comments().sort();
	  this.model.fetch({
		  success: function(model){
			  model.comments().changeSort("hotPosts");
			  model.comments().sort();
			  console.log(model.comments());
		  }
	  })

  },

  sortTop: function(){
	  var that = this;
	  this.model.comments().changeSort("topPosts");
	  this.model.comments().sort();
	  this.model.fetch({
		  success: function(model){
			  model.comments().changeSort("topPosts");
			  model.comments().sort();
			  console.log(model.comments());
		  }
	  })

  },

  sortNew: function(){
	  var that = this;
	  this.model.comments().changeSort("newPosts");
	  this.model.comments().sort();
	  this.model.fetch({
		  success: function(model){
			  model.comments().changeSort("newPosts");
			  model.comments().sort();
			  console.log(model.comments());
		  }
	  })


  },

  sortCon: function(){
	  var that = this;
	  this.model.comments().changeSort("conPosts");
	  this.model.comments().sort();
	  this.model.fetch({
		  success: function(model){
			  model.comments().changeSort("conPosts");
			  model.comments().sort();
			  console.log(model.comments());
		  }
	  })

  },


  sortBest: function(){
	  var that = this;
	  this.model.comments().changeSort("bestPosts");
	  this.model.comments().sort();
	  this.model.fetch({
		  success: function(model){
			  model.comments().changeSort("bestPosts");
			  model.comments().sort();
			  console.log(model.comments());
		  }
	  })

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
		  })
		  .done(function(data){
			  that.updateCommentKarma(data, id);
		  })
	  } else {
		 $("#login-modal").addClass("is-active");
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
		  })
		  .done(function(data){
			  that.updateCommentKarma(data, id);
		  })
	  } else {
	  		  $("#login-modal").addClass("is-active");
	  };
  },

  newSubReddit: function(event){
  	event.preventDefault();
    var that = this;
	  if (ProjectSkeleton.currentUserId) {
		  $("#new-subreddit-modal").addClass("is-active");
		  $("input.new-subreddit").off();
	  	  $("input.new-subreddit").one("click", that.submitSubReddit);

	  } else {

		  $("#login-modal").addClass("is-active");

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

	  };
  },

  submitPost: function(event){
	  event.preventDefault();
	  $("#new-post-modal").removeClass("is-active");
	  var form = $(event.currentTarget).closest("form");
	  var params = form.serializeJSON();
	  var post = new ProjectSkeleton.Models.Post(params);
	  var that = this;

	  post.save({}, {
		  success: function(model){
			  ProjectSkeleton.posts.unshift(model);
		  }
	  });
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
	  })
	  .done(function(data){

		  var results = new ProjectSkeleton.Collections.Posts(data, {parse: true})
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
