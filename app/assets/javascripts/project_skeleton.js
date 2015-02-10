window.ProjectSkeleton = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	  // timeago library
	  jQuery("abbr.timeago").timeago();

	  // pull divs from root
	  var $rootEl = $("#content");
	  var $notificationsEl = $("#notifications-li");

	  // monitor modal clicks
	  $(".hide-modal").on("click", function(event){
  	  event.preventDefault();
  	  $("#login-modal").removeClass("is-active");
  	  $("#new-post-modal").removeClass("is-active");
  		$("#compose-modal").removeClass("is-active");
  		$("#new-subreddit-modal").removeClass("is-active");
  	  $("#delete-modal").removeClass("is-active");
    	$("#preferences-modal").removeClass("is-active");
	  });


	  $("#cancel-deletion").on("click", function(event){
		  event.preventDefault();
  	  $("#delete-modal").removeClass("is-active");
	  })

	  $("#login-modal").on("click", function(event){
	    if(event.target.id == this.id){
	      event.preventDefault();
	      $("#login-modal").removeClass("is-active");
	    }
	  })

	  $("#new-post-modal").on("click", function(event){
	    if(event.target.id == this.id){
	      event.preventDefault();
	      $("#new-post-modal").removeClass("is-active");
	    }
	  })

	  $("#delete-modal").on("click", function(event){
	    if(event.target.id == this.id){
	      event.preventDefault();
	      $("#delete-modal").removeClass("is-active");
	    }
	  })

	  $("#preferences-modal").on("click", function(event){
	    if(event.target.id == this.id){
	      event.preventDefault();
	      $("#preferences-modal").removeClass("is-active");
	    }
	  })

	  $("#compose-modal").on("click", function(event){
	    if(event.target.id == this.id){
	      event.preventDefault();
	      $("#compose-modal").removeClass("is-active");
	    }
	  })

	  $("#new-subreddit-modal").on("click", function(event){
	    if(event.target.id == this.id){
	      event.preventDefault();
	      $("#new-subreddit-modal").removeClass("is-active");
	    }
	  })

	  $(".show-login").on("click", function(event){
 	    event.preventDefault();
  	    $("input[type=password]").val("");
	      $("#login-modal").addClass("is-active");
	  });

	  $(".show-register").on("click", function(event){
 	      event.preventDefault();
	      $("#login-modal").addClass("is-active");
  	  	$("input[type=password]").val("");
	   });

		$("#guest-sign-in").on("click", function(event){
			event.preventDefault();
			$(".sign-in-form input[type=text]").val("guest");
			$(".sign-in-form input[type=password]").val("password");
			$(".sign-in-form input[type=submit]").click();
		})

	  $(".new-text-form .clickable-subreddits a").on("click", function(event){
  	  event.preventDefault();
  		var input = $("input#text-post-subreddit-input")
  		var str = $(event.currentTarget).html()
  		input.val(str)
	  })

	  $("#preferences-link").on("click", function(event){
		  event.preventDefault();
		  $("#preferences-modal").addClass("is-active");
  	  $("input[type=password]").val("");
		  var username = $(".user-info > li > a:first").html()
		  $(".edit-user-form input[type=text]:first").val(username)
	  })

	  var subReddits = ProjectSkeleton.subReddits = new ProjectSkeleton.Collections.SubReddits();
	  var users = ProjectSkeleton.users = new ProjectSkeleton.Collections.Users();
	  var posts = ProjectSkeleton.posts = new ProjectSkeleton.Collections.Posts();
	  var comments = ProjectSkeleton.comments = new ProjectSkeleton.Collections.Comments();
	  var frontPosts = ProjectSkeleton.frontPosts = new ProjectSkeleton.Collections.FrontPosts();
	  var subscriptions = ProjectSkeleton.subscriptions = new ProjectSkeleton.Collections.Subscriptions();
	  var notifications = ProjectSkeleton.notifications = new ProjectSkeleton.Collections.Notifications();

	  ProjectSkeleton.subRedditsRouter = new ProjectSkeleton.Routers.SubReddits(subReddits, $rootEl);
	  new ProjectSkeleton.Routers.Users(users, $rootEl);
	  new ProjectSkeleton.Routers.Posts(posts, $rootEl);
	  new ProjectSkeleton.Routers.Comments(comments, $rootEl);
	  new ProjectSkeleton.Routers.Pages(posts, frontPosts, $rootEl);
	  ProjectSkeleton.notificationsRouter = new ProjectSkeleton.Routers.Notifications(notifications, $notificationsEl)
	  Backbone.history.start();
  }
};
