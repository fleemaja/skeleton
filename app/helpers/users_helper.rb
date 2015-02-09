module UsersHelper
  
  
  def forum_name(post)
    if post.subreddit_id.nil?
      "front page"
    else 
      SubReddit.find(post.subreddit_id).title
    end
  end
    
end
