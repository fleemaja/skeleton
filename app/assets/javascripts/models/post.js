ProjectSkeleton.Models.Post = Backbone.Model.extend({

	initialize: function(options) {
		this.id = options.id;
	},

	urlRoot: function() {
		return "/api/posts";
	},

	parse: function(response) {
		if (response["comments"]) {
			this.comments().set(response["comments"], { parse: true} );
			delete response["comments"];
		}

		if (response["subreddit"]) {
			this.subReddit().set(response["subreddit"], { parse: true} );
			delete response["subreddit"];
		}

		return response;
	},

	comments: function(){
		if (!this.get('comments')) {
			var postComments = new ProjectSkeleton.Collections.Comments([]);

			this.set({
				comments: postComments
			});
		}

		return this.get('comments');
	},


	subReddit: function(){
		if (!this.get('subreddit')) {
			var subReddit = new ProjectSkeleton.Models.SubReddit({});

			this.set({
				subreddit: subReddit
			});
		}

		return this.get('subreddit');
	}
});
