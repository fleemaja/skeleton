ProjectSkeleton.Models.SubReddit = Backbone.Model.extend({

	initialize: function(options) {
		this.id = options.id;
	},

	urlRoot: "/api/subreddits",

	parse: function(response) {

		if (response["posts"]) {
			this.posts().set(response["posts"], { parse: true } );
			delete response["posts"];
		}

		if (response["subscribed"]) {

			this.subscription().set(response["subscribed"][0], { parse: true } );
			delete response["subscribed"];
		}

		return response;
	},

	posts: function(){
		if (!this.get('posts')) {
			var posts = new ProjectSkeleton.Collections.Posts(
				[], { subReddit: this }
			);

			this.set({
				posts: posts
			});
		}
		
		return this.get('posts');
	},

	subscription: function(){
		if (!this.get('subscription')) {
			var subscription = new ProjectSkeleton.Models.Subscription({});

			this.set({
				subscription: subscription
			});
		}

		return this.get('subscription');
	}
});
