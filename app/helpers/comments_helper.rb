module CommentsHelper
  
  def find_parent_url(comment)
    if comment.commentable.try(:subreddit_id) #see if parent is a link or post
      post = comment.commentable
      if post.try(:url) #we have a link post
        link_post_url(post.id)
      else #we have a text post
        text_post_url(post.id)
      end
    elsif comment.commentable.try(:content) #see if parent is comment
      find_parent_url(comment.commentable)
    else #raise error as parent is neither link, post, nor comment
      raise "Something went wrong! Comment parent is neither link, post, nor comment."
    end
  end
end
