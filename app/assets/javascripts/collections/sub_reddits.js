ProjectSkeleton.Collections.SubReddits = Backbone.Collection.extend({

  model: ProjectSkeleton.Models.SubReddit,

  url: "/api/subreddits/",

  getOrFetch: function(id){
	  var subReddits = this;
	  var subReddit = this.get(id);

	  if (subReddit) {
		  subReddit.fetch();
	  } else {
		  subReddit = new ProjectSkeleton.Models.SubReddit({ id: id });
		  subReddit.fetch({
			  success: function(){
				  subReddits.add(subReddit);
			  }
		  });
	  }

	  return subReddit;
  }
});

var subReddits = ProjectSkeleton.subReddits = new ProjectSkeleton.Collections.SubReddits();
