ProjectSkeleton.Routers.Users = Backbone.Router.extend({

	initialize: function(users, $rootEl) {
		this.users = users;
		this.$rootEl = $rootEl;
	},

	routes: {
		"users": "index",
		"users/:id/posts": "show",
		"users/:id/comments": "showComments",
		"users/:id": "show"
	},

	index: function(){
		var router = this;
		this.users.fetch({
			success: function(collection){
				var userIndexView = new ProjectSkeleton.Views.UsersIndex({
					collection: collection
				});

				router._swapView(userIndexView);
			},

			error: function(response){

				console.log("an error has occurred...", response)
			}

		});

	},

	show: function(id){
		var that = this;
		this._getUser(id, function(user){
			var userView = new ProjectSkeleton.Views.UserShow({

				model: user

			});

			that._swapView(userView);

		});

	},


	showComments: function(id){

		var that = this;
		this._getUser(id, function(user){
			var userView = new ProjectSkeleton.Views.UserComments({

				model: user

			});

			that._swapView(userView);

		});

	},


	_getUser: function(id, callback){
		var that = this;
		var user = ProjectSkeleton.users.get(id);
		if (!user){
			user = new ProjectSkeleton.Models.User({
				id: id
			});

			user.collection = this.users;
			user.fetch({
				success: function(){
					that.users.add(user);
					callback(user);
				}
			});
		} else {
			callback(user);
		}

	},


	_swapView: function(view) {

		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);

	}

});
