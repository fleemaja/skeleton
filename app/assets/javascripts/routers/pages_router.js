ProjectSkeleton.Routers.Pages = Backbone.Router.extend({

	initialize: function(posts, frontPosts, $rootEl) {
		this.frontPosts = frontPosts;
		this.$rootEl = $rootEl;
	},

	routes: {
		"": "front",
		"#": "frontSort",
		"front": "frontSort"
	},

	front: function(){
		var router = this;
		this._generateLoadingScreen();

		this.frontPosts.fetch({

			success: function(collection){
				var frontView = new ProjectSkeleton.Views.FrontShow({
					collection: collection
				});

				router._swapView(frontView);
			}
		});
	},

	frontSort: function(){
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
	},

	_generateLoadingScreen: function () {
    var loading = new ProjectSkeleton.Views.Loading();
    this._swapView(loading);
  }
});
