ProjectSkeleton.Collections.Comments = Backbone.Collection.extend({

	model: ProjectSkeleton.Models.Comment,

	initialize: function(models, options){
	},

  url: "api/comments",

  comparator: function(comment) {
	  return comment.get("karma");
  },

  sortingOptions: {
	  newPosts: function(comment) { return -comment.get("createInt"); },
	  topPosts: function(comment) { return -comment.get("karma"); },
	  hotPosts: function(comment) { return -comment.get("hotness"); },
	  conPosts: function(comment) { return -comment.get("controversy"); },
	  bestPosts: function(comment) { return -comment.get("bestness"); }
  },

  changeSort: function(sortProperty) {
	  this.comparator = this.sortingOptions[sortProperty]; 
  },

  getOrFetch: function(id){
		var comment = this.get(id);
	  var comments = this;

	  if (comment) {
		  comment.fetch();
	  } else {
		  comment = new ProjectSkeleton.Models.Comment({ id: id });
		  comment.fetch({
			  success: function(){
				  comments.add(comment);
			  }
		  });
	  }

	  return comment;
  }
});

var comments = ProjectSkeleton.comments = new ProjectSkeleton.Collections.Comments();
