class Api::PostsController < ApplicationController

  before_action :require_login, only: [ :new, :create ]

  def new

  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render "show"
    else
      render json: @post.errors.full_messages
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def index
    @posts = Post.all
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.poster_id == current_user.id
      @post.destroy
      render "show"
    end
  end

  def search
    @posts = Post.search_posts(params[:search]).to_a
    render "search_results"
  end

  private

  def post_params
    params.require(:post).permit(:title, :text, :subreddit)
  end
end
