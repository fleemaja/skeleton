
json.array!(@subreddits) do |subreddit|
	json.partial!("subreddit_no_posts", subreddit: subreddit)
	json.subscribed subreddit.subscribed?(current_user)
end
