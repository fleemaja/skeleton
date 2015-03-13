class Api::PagesController < ApplicationController

  def front
    @posts = collect_front_posts
    @posts.sort_by(&:created_at).reverse
    render "front"
  end

  def collect_front_posts
    if !current_user
      @posts = Post.all
    else
      @posts = Post.joins("JOIN subscriptions ON subscriptions.subreddit_id = posts.subreddit_id").where("subscriptions.user_id = ?", current_user.id)
    end
  end

  def hot
    @posts = collect_front_posts.sort_by(&:karma).reverse
    render "front"
  end

  def newest
    @posts = collect_front_posts.sort_by(&:created_at).reverse
    render "front"
  end

  def rising
    @posts = collect_front_posts.sort_by(&:karma).reverse
    render "front"
  end

  def controversial
    @posts = collect_front_posts.sort_by(&:karma).reverse
    render "front"
  end

  def top
    @posts = collect_front_posts.sort_by(&:karma).reverse
    render "front"
  end

  def all_hot
    @posts = Post.all
    @posts.sort_by(&:karma).reverse
    render "all"
  end

  def all_newest
    @posts = Post.all
    @posts.sort_by(&:created_at).reverse
    render "all"
  end

  def all_rising
    @posts = Post.all
    @posts.sort_by(&:karma).reverse
    render "all"
  end

  def all_controversial
    @posts = Post.all
    @posts.sort_by(&:karma).reverse
    render "all"
  end

  def all_top
    @posts = Post.all
    @posts.sort_by(&:karma).reverse
    render "all"
  end
end
