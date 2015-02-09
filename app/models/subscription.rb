class Subscription < ActiveRecord::Base
  belongs_to :subreddit, class_name: "SubReddit", foreign_key: :subreddit_id
  belongs_to :user, class_name: "User", foreign_key: :user_id
end
