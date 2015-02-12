class Api::SubredditsController < ApplicationController

  before_action :require_login, only: [:new, :create]

  def new
    @subreddit = Subreddit.new
  end

  def create
    @subreddit = current_user.moderated_subreddits.new(subreddit_params)

    if @subreddit.save
      current_user.subscriptions.create!(subreddit_id: @subreddit.id)
      render json: @subreddit
    else
      render json: @subreddit.errors.full_messages
    end
  end

  def posts
    @posts = SubReddit.find(params[:id]).posts
  end

  def post
    @post = Post.find(params[:id])
  end

  def index
    @subreddits = SubReddit.all
  end

  def show
    @subreddit = SubReddit.find(params[:id])
  end

  def random
    rand_num = 1 + rand(SubReddit.all.size)
    redirect_to "#/subreddits/" + rand_num
  end

  def hot
    @subreddit = SubReddit.find(params[:id])
    @posts = @subreddit.posts.sort_by(&:karma).reverse
    render :show
  end

  def newest
    @subreddit = SubReddit.find(params[:id])
    @posts = @subreddit.posts.sort_by(&:created_at).reverse
    render :show
  end

  def rising
    @subreddit = SubReddit.find(params[:id])
    @posts = @subreddit.posts.sort_by(&:karma).reverse
    render :show
  end

  def controversial
    @subreddit = SubReddit.find(params[:id])
    @posts = @subreddit.posts.sort_by(&:karma).reverse
    render :show
  end

  def top
    @subreddit = SubReddit.find(params[:id])
    @posts = @subreddit.posts.sort_by(&:karma).reverse
    render :show
  end

  private

  def subreddit_params
    params.require(:subreddit).permit(:name, :title, :description)
  end
end
