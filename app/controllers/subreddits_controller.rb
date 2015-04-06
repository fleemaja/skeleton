class SubredditsController < ApplicationController
  before_action :require_login, only: [:new, :create]

  def new
    @subreddit = Subreddit.new
  end

  def create
    @subreddit = current_user.moderated_subreddits.new(subreddit_params)
    # fail

    if @subreddit.save
      flash.now[:message] = ["Your subreddit has been created"]
      # current_user.subscriptions.create!(subreddit_id: @subreddit.id)
      redirect_to subreddit_url(@subreddit)
    else
      flash.now[:errors] = @subreddit.errors.full_messages
      render :new
    end
  end

  def edit
    @subreddit = SubReddit.find(params[:id])
  end

  def update
    @subreddit = SubReddit.find(params[:id])
    if (@subreddit.update(subreddit_params))
    end

    redirect_to :back
  end

  def show
    @subreddit = SubReddit.find(params[:id])
    @posts = @subreddit.posts.sort_by(&:created_at).reverse
  end

  def random
    rand_num = 1 + rand(SubReddit.all.size)
    redirect_to "#/subreddits/#{rand_num}"
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

  def index
    @subreddits = SubReddit.all
  end

  private

  def subreddit_params
    params.require(:subreddit).permit(:name, :title, :description, :filepicker_url)
  end
end
