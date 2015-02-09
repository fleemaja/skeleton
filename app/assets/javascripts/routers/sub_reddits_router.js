ProjectSkeleton.Routers.SubReddits = Backbone.Router.extend({

	initialize: function(subReddits, $rootEl) {
		this.subReddits = subReddits;
		this.$rootEl = $rootEl;
	},

	routes: {
		"subreddits": "index",
		"subreddits/index": "index",
		"subreddits/random": "random",
		"subreddits/:id": "show"
	},

	index: function(){
		var router = this;
		this.subReddits.fetch({
			success: function(collection){
				var subRedditIndexView = new ProjectSkeleton.Views.SubRedditsIndex({
					collection: collection
				});

				router._swapView(subRedditIndexView);
			},

			error: function(response){

				console.log("an error has occurred...", response)
			}

		})
	},

	random: function(){

		var router = this;
		this.subReddits.fetch({
			success: function(collection){
				var num = collection.size();
				var randNum = Math.floor((Math.random() * num) + 1);
				router.navigate("#/subreddits/" + randNum, { trigger: true });
				router.show(randNum)
			},

			error: function(response){
				console.log("an error has occurred...", response)
			}
		})
	},

	show: function(id){
		var that = this;
		this._getSubReddit(id, function(subReddit){

			var subRedditView = new ProjectSkeleton.Views.SubRedditShow({
				model: subReddit
			});

			that._swapView(subRedditView);
		});
	},


	_getSubReddit: function(id, callback){
		var that = this;
		var subReddit = ProjectSkeleton.subReddits.get(id);
		if (!subReddit){
			subReddit = new ProjectSkeleton.Models.SubReddit({
				id: id
			});

			subReddit.collection = this.subReddits;
			subReddit.fetch({
				success: function(){
					that.subReddits.add(subReddit);
					callback(subReddit);
				}
			});
		} else {
			subReddit.fetch({
				success: function(model){
					callback(model);
				}
			})
		}
	},

	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	}

});
