ProjectSkeleton.Routers.Comments = Backbone.Router.extend({

	initialize: function(comments, $rootEl) {
		this.comments = comments;
		this.$rootEl = $rootEl;
	},

	routes: {
		"comments/:id": "show",
	},

	show: function(id) {
		var that = this;
		this._getComment(id, function(comment){
			var commentView = new ProjectSkeleton.Views.CommentShow({

				model: comment

			});

			that._swapView(commentView);
		});

	},

	_getComment: function(id, callback){
		var that = this;
		var comment = ProjectSkeleton.comments.get(id);
		if (!comment){
			comment = new ProjectSkeleton.Models.Comment({
				id: id
			});

			comment.collection = this.comments;
			comment.fetch({
				success: function(){
					that.comments.add(comment);
					callback(comment);
				}
			});
		} else {
			callback(comment);
		}

	},

	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	}
});
