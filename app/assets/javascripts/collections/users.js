ProjectSkeleton.Collections.Users = Backbone.Collection.extend({

  model: ProjectSkeleton.Models.User,
  url: "/api/users",

  getOrFetch: function(id){
	  var users = this;
	  var user = this.get(id);

	  if (user) {
		  user.fetch();
	  } else {
		  user = new ProjectSkeleton.Models.User({ id: id });
		  user.fetch({
			  success: function(){
				  users.add(user);
			  },

			  error: function(error){
				  console.log("error fetching user", error)
			  }
		  });
	  }

	  return user;
  }
});

var users = ProjectSkeleton.users = new ProjectSkeleton.Collections.Users();
