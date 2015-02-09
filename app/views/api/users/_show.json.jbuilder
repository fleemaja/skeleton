json.(user, :id, :username, :created_at, :post_karma, :comment_karma)
json.avatar_url user.avatar.url
json.moderated_subreddits user.moderated_subreddits do |subreddit|
	json.name subreddit.name
	json.id subreddit.id
end

json.comments user.comments do |comment|
	json.partial!("api/comments/comment", comment: comment)
end

json.posts user.posts do |post|
	json.partial!("api/posts/show", post: post)
end
