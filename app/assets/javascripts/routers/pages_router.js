ProjectSkeleton.Routers.Pages = Backbone.Router.extend({

	initialize: function(posts, frontPosts, $rootEl) {
		this.frontPosts = frontPosts;
		this.$rootEl = $rootEl;
	},

	routes: {
		"": "front",
		"#": "front",
		"front": "front"
	},

	front: function(){
		var router = this;
		this.frontPosts.fetch({

			success: function(collection){
				var frontView = new ProjectSkeleton.Views.FrontShow({
					collection: collection
				});

				router._swapView(frontView);
			}
		});
	},

	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	}
});
