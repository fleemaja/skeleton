json.(subreddit, :id, :user_id, :name, :title, :filepicker_url, :description, :created_at, :updated_at)
json.moderator subreddit.moderator.username
json.moderator_id subreddit.moderator.id
