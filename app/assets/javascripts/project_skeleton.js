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
    new ProjectSkeleton.Routers.Users(users, $rootEl);


    $(".shawnas").on("click", function(event) {
      var that = this;
      var user = users.getOrFetch( { id: ProjectSkeleton.currentUserId })
      filepicker.pick({}, function (Blob) {

        $(event.currentTarget).removeClass("shawnas");
        $(event.currentTarget).addClass("shawnas-disabled");
        $(event.currentTarget).html("Photo successfully uploaded!")

        that._lastFile = Blob.url;
        user.save({ filepicker_url: that._lastFile })
        that.lastFile = ""
      }, function (FPError) {

      })
    });

	  // monitor modal clicks
	  $(".hide-modal").on("click", function(event){
  	  event.preventDefault();
  	  $("#login-modal").removeClass("is-active");
  	  $("#new-post-modal").removeClass("is-active");
  		$("#compose-modal").removeClass("is-active");
  		$("#new-subreddit-modal").removeClass("is-active");
  	  $("#delete-modal").removeClass("is-active");
      $("#preferences-modal").removeClass("is-active");
      $("body > *").css("opacity", '1');
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

        $("body > *").not('#login-modal').css("opacity", '0.2');
	  });

	  $(".show-register").on("click", function(event){
 	      event.preventDefault();
	      $("#login-modal").addClass("is-active");
  	  	$("input[type=password]").val("");

        $("body > *").not('#login-modal').css("opacity", '0.2');
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

    //stuff for preferences form

	  $("#preferences-link").on("click", function(event){
		  event.preventDefault();
		  $("#preferences-modal").addClass("is-active");
  	  	  $("input[type=password]").val("");
		  var username = $(".user-info > li > a:first").html()
		  $(".edit-user-form input[type=text]:first").val(username)
      $("body > *").not('#preferences-modal').css("opacity", '0.2');
	  })

	  ProjectSkeleton.subRedditsRouter = new ProjectSkeleton.Routers.SubReddits(subReddits, $rootEl);
	  new ProjectSkeleton.Routers.Posts(posts, $rootEl);
	  new ProjectSkeleton.Routers.Comments(comments, $rootEl);
	  new ProjectSkeleton.Routers.Pages(posts, frontPosts, $rootEl);
	  ProjectSkeleton.notificationsRouter = new ProjectSkeleton.Routers.Notifications(notifications, $notificationsEl)
	  Backbone.history.start();
  }
};
