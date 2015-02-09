module SubredditsHelper
  
  def subscribed?(subreddit)
    
    subscription = Subscription.find_by(user_id: current_user.id, subreddit_id: subreddit.id )
    !!subscription
  end
  
end
