ProjectSkeleton.Views.PostIndex = Backbone.View.extend({

  template: JST['posts/index'],

  render: function(){

	  var renderedContent = this.template({
		  posts: this.collection,
		  textTemplateFn: JST["posts/_show_text"]
	  });

	  this.$el.html(renderedContent);
	  return this;
  }
});
