class Api::FrontController < ApplicationController
  
  def index
    @posts = collect_front_posts
    @posts.sort_by(&:created_at).reverse
  end
  
  
  def collect_front_posts
    if !current_user      
      @posts = Post.all
    else
      @posts = Post.joins("JOIN subscriptions ON subscriptions.subreddit_id = posts.subreddit_id").where("subscriptions.user_id = ?", current_user.id)
    end
  end
  
  
  def show
    @post = Post.find(params[:id])
  end
  
end
