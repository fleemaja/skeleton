ProjectSkeleton.Views.PostShow = Backbone.View.extend({

  template: JST['posts/show'],

  initialize: function() {
	  this.listenTo(this.model.comments(), "add remove sort", this.render);
	  this.listenTo(this.model, "fetch", this.render)
  },

  events: {
	  "click .post-comment input": "submit",
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
	  "submit .search-posts": "searchPosts",
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

  render: function(){
    console.log(this.model);
	  var renderedContent = this.template({
		  post: this.model,
		  textTemplateFn: JST["posts/_show_text_no_delete"],
		  navTemplateFn: JST["posts/_nav_bar"],
		  commentTemplate: JST["comments/show"]
	  });

	  this.$el.html(renderedContent);
	  return this;
  },

  updatePostKarma: function(karma){
	  var currentKarma = parseInt($(".post .karma").html());
	  currentKarma += parseInt(karma);
	  $(".post .karma").html(currentKarma + " points");
	  if (this.model.get("poster_id") === ProjectSkeleton.currentUserId) {
		  this.updateCurrentUserKarma(karma)
	  }
  },

  updatePostCommentsNum: function(change){
    var currentNum = parseInt($(".post .num-comments").html());
  	currentNum += parseInt(change);
  	$(".post .num-comments").html(currentNum);
  },

  updateCurrentUserKarma: function(karma) {
	  var currentKarma = parseInt($("span.user-karma").html());
	  currentKarma += parseInt(karma);
	  $("span.user-karma").html(currentKarma);
  },

  updateCommentKarma: function(karma, comment_id) {
	  var str = "div[comment-id=" + comment_id + "] > p .karma";
	  var currentKarma = parseInt($(str).html());
	  currentKarma += parseInt(karma);
	  $(str).html(currentKarma + " points");
  },

  submit: function(event) {
	  event.preventDefault();

	  var that = this;
	  var params = $("form.post-comment").serializeJSON();
	  var comment = new ProjectSkeleton.Models.Comment(params["comment"]);
    comment.save({ filepicker_url: this._lastFile}, {
		  success: function(){
		    that.model.comments().add(comment);
        that._lastFile = "";
        $("input.submit-post-comment").prop('disabled', true);
        $("input.submit-post-comment").val("Comment Submitted!")
		  }
	  });
    setInterval(function () {
      $("input.submit-post-comment").prop('disabled', false);
      $("input.submit-post-comment").val("submit")
    }, 5000);

  },

  submitComment: function(event) {
	  event.preventDefault();

	  var that = this;
	  var params = $(event.currentTarget).closest("form").serializeJSON();
	  var comment = new ProjectSkeleton.Models.Comment(params["comment"]);
	  comment.save({ filepicker_url: this._lastFile}, {
		  success: function(model){
			  that.model.fetch({
				  success: function(){
            that._lastFile = "";
				  	that.updatePostCommentsNum(1);
					  that.render()
				  }
			  });

        $("input.submit-comment-comment").prop('disabled', true);
        $("input.submit-comment-comment").val("Comment Submitted!")
		  }
	  });

    setInterval(function () {
      $("input.submit-comment-comment").prop('disabled', false);
      $("input.submit-comment-comment").val("submit")
    }, 5000);
  },

  showForm: function(event){
	  event.preventDefault();

	  if (ProjectSkeleton.currentUserId) {
		  var dataId = $(event.currentTarget).attr("data-id");
		  var str = "form[data-id=" + dataId + "]";
		  $(str).toggleClass("hidden");

	  } else {
		  $("#login-modal").addClass("is-active");

      $("body > *").not('#login-modal').css("opacity", '0.2');

  	  $("input[type=password]").val("");
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
		  }
	  })
  },

  downvote: function(event){
  	event.preventDefault();
    $(event.currentTarget).toggleClass("orange");

	  var that = this;
	  if (ProjectSkeleton.currentUserId) {
		  var id = $(event.currentTarget).attr("post-id")
  		  if (id){
  			  $.ajax({
  			    type: "POST",
  			    url: "/api/downvote",
  			    data: { "post_id": $(event.currentTarget).attr("post-id")}
  			  }).done(function(data){
				    that.updatePostKarma(data);
  			  });

        } else {
  			  id = $(event.currentTarget).attr("comment-id")
  			  $.ajax({
  			    type: "POST",
  			    url: "/api/downvote",
  			    data: { "comment_id": id }
  			  })
  			  .done(function(data){
  				  that.updateCommentKarma(data, id);
  			  })
  		  }
	  } else {
      $("#login-modal").addClass("is-active");

      $("body > *").not('#login-modal').css("opacity", '0.2');

	  	$("input[type=password]").val("");
	  };
  },

  upvote: function(event){
    event.preventDefault();
    $(event.currentTarget).toggleClass("orange");

	  var that = this;
	  if (ProjectSkeleton.currentUserId) {
		  var id = $(event.currentTarget).attr("post-id")
  		  if (id){
  			  $.ajax({
  			    type: "POST",
  			    url: "/api/upvote",
  			    data: { "post_id": id }
  			  }).done(function(data){
				    that.updatePostKarma(data);
  			  });

        } else {
  			  id = $(event.currentTarget).attr("comment-id")
  			  $.ajax({
  			    type: "POST",
  			    url: "/api/upvote",
  			    data: { "comment_id": id }
  			  }).done(function(data){
  				  that.updateCommentKarma(data, id);
  			  })
  		  }
	  } else {
      $("#login-modal").addClass("is-active");

      $("body > *").not('#login-modal').css("opacity", '0.2');

	  	$("input[type=password]").val("");
	  };
  },

  newSubReddit: function(event){
  	event.preventDefault();
	  if (ProjectSkeleton.currentUserId) {
		  $("#new-subreddit-modal").addClass("is-active");
		  $("input.new-subreddit").off();
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
	  $(event.currentTarget).closest('form').find("input[type=text], textarea").val("");

	  var subReddit = new ProjectSkeleton.Models.SubReddit(params);
	  var that = this;

	  subReddit.save({ filepicker_url: that._lastFile }, {
		  success: function(model){
			  ProjectSkeleton.subReddits.unshift(model);
        that._lastFile = "";
        Backbone.history.navigate("/subreddits/" + subReddit.get("id"), { trigger: true })
        window.location.reload(true);
      },
      error: function () {
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
			  // that.model.fetch()
        Backbone.history.navigate("/posts/" + post.get("id"), { trigger: true })
		  }
	  });
  },

  showDeleteModal: function(event){
	  event.preventDefault();
	  var type;
    var typeId;
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
	  $(str).remove();

  	$(".post .num-comments").html("view");
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
