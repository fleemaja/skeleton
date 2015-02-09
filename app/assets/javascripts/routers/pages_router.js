ProjectSkeleton.Routers.Pages = Backbone.Router.extend({
	initialize: function(posts, frontPosts, $rootEl) {
		this.allPosts = posts;
		this.frontPosts = frontPosts;
		this.$rootEl = $rootEl;

	},

	routes: {
		"": "front",
		"#": "front",
		"front": "front",
		"all":"all"
	},

	front: function(){
		var router = this;
		this.frontPosts.fetch({

			success: function(collection){
				var frontView = new ProjectSkeleton.Views.FrontShow({
					collection: collection
				});

				router._swapView(frontView);
			},

			error: function(response){
				console.log("an error has occurred...", response)
			}
		});
	},


	all: function(){
		var router = this;
		this.allPosts.fetch({

			success: function(collection){
				var allView = new ProjectSkeleton.Views.AllShow({
					collection: collection
				});

				router._swapView(allView);
			},

			error: function(response){
				console.log("an error has occurred...", response)
			}
		});
	},


	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	}

});
