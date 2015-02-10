class PostsController < ApplicationController

  before_action :require_login, only: [:new, :create]

  def new

  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      redirect_to current_user
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  private

  def post_params
    params.require(:post).permit(:title, :text, :subreddit)
  end
end
