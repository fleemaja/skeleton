ProjectSkeleton.Routers.Notifications = Backbone.Router.extend({

	initialize: function(notifications, $notificationsEl) {
		this.notifications = notifications;
		this.$notificationsEl = $notificationsEl;
		var router = this;
		if (ProjectSkeleton.currentUserId) {
			this.notifications.fetch({

				success: function(collection){
					var notificationsView = new ProjectSkeleton.Views.NotificationsIndex({
						collection: collection
					});

					router._swapView(notificationsView);
				}
			});
		}
	},

	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$notificationsEl.html(view.render().$el);
	}
});
