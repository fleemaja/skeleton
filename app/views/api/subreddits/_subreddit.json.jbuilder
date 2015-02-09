json.(subreddit, :id, :user_id, :name, :title, :description, :sidebar, :submission_text, :created_at, :updated_at)
json.moderator subreddit.moderator.username
json.moderator_id subreddit.moderator.id

json.posts subreddit.posts do |post|
	json.(post, :title, :text, :id, :subreddit_id, :updated_at, :created_at, :poster_id, :karma, :hotness, :controversy, :bestness, :subreddit, :sum_comments)

	json.createInt post.created_at.to_i
	json.poster post.user.username

end
