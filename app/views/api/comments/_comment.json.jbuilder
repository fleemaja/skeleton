json.(comment, :content, :created_at, :id, :user_id, :author_username, :karma, :hotness, :controversy, :bestness, :filepicker_url)
json.rootPost comment.root_post
json.sum_comments comment.sum_comments
json.createInt comment.created_at.to_i

json.comments comment.comments do |child|
	json.partial!("api/comments/comment", comment: child)
end

json.subreddit do
	json.partial!("api/subreddits/subreddit_no_posts", subreddit: comment.subreddit)
end
