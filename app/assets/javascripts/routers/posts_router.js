ProjectSkeleton.Routers.Posts = Backbone.Router.extend({
	initialize: function(posts, $rootEl) {
		this.posts = posts;
		this.$rootEl = $rootEl;
	},

	routes: {
		"posts/:id": "show",
		"posts/index": "index"
	},

	show: function(id){

		var that = this;
		this._getPost(id, function(post){
			var postView = new ProjectSkeleton.Views.PostShow({

				model: post

			});
			that._swapView(postView);

		});

	},

	index: function() {
		this.posts.fetch();

		var postView = new ProjectSkeleton.Views.PostIndex({
			collection: this.posts
		});

		that._swapView(postView);
	},

	_getPost: function(id, callback){
		var that = this;
		var post = ProjectSkeleton.posts.get(id);
		if (!post){
			post = new ProjectSkeleton.Models.Post({
				id: id
			});

			post.collection = this.posts;
			post.fetch({
				success: function(){
					that.posts.add(post);
					callback(post);
				}
			});
		} else {
			callback(post);
		}

	},


	_swapView: function(view) {

		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);

	}

});
