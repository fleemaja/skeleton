json.(post, :title, :text, :id, :subreddit_id, :updated_at, :created_at, :poster_id, :karma, :hotness, :controversy, :bestness, :subreddit)

json.sum_comments post.sum_comments
json.createInt post.created_at.to_i
json.poster post.user.username
