ProjectSkeleton.Collections.Posts = Backbone.Collection.extend({

  model: ProjectSkeleton.Models.Post,

  url: function(){
  	return "/api/posts";
  },

  comparator: function(post) {
	  return -post.get("karma");
  },

  sortingOptions: {
	  newPosts: function(post) { return -post.get("createInt"); },
	  topPosts: function(post) { return -post.get("karma"); },
	  hotPosts: function(post) { return -post.get("hotness"); },
	  conPosts: function(post) { return -post.get("controversy"); },
	  bestPosts: function(post) { return -post.get("bestness"); }
  },

  changeSort: function(sortProperty) {
	  this.comparator = this.sortingOptions[sortProperty]; 
  },

  getOrFetch: function(id){
	  var posts = this;
	  var post = this.get(id);

	  if (post) {
		  post.fetch();
	  } else {
		  post = new ProjectSkeleton.Models.Post({id: id});
		  post.fetch({
			  success: function(){
				  posts.add(post);
			  }
		  });
	  }

	  return post;
  }
});
