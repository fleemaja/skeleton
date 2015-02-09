ProjectSkeleton.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",

	initialize: function(options) {
		this.id = options.id;
	},

	parse: function(response) {

		if (response["comments"]) {
			this.comments().set(response["comments"], { parse: true } );
			delete response["comments"];
		}

		if (response["posts"]) {
			this.posts().set(response["posts"], { parse: true } );
			delete response["posts"];
		}

		return response;
	},

	comments: function(){
		if (!this.get('comments')) {
			var comments = new ProjectSkeleton.Collections.Comments([]);

			this.set({
				comments: comments
			});
		}

		return this.get('comments');
	},


	posts: function(){
		if (!this.get('posts')) {
			var posts = new ProjectSkeleton.Collections.Posts([]);

			this.set({
				posts: posts
			});
		}

		return this.get('posts');
	}
});
