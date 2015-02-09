json.(subreddit, :id, :user_id, :name, :title, :description, :sidebar, :submission_text, :created_at, :updated_at)
json.moderator subreddit.moderator.username
json.moderator_id subreddit.moderator.id
