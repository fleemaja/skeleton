class Notification < ActiveRecord::Base

  include Rails.application.routes.url_helpers

  EVENTS = {
    1 => :new_comment_on_post,
    2 => :new_comment_on_comment,
    3 => :new_post_in_subreddit
  }

  EVENT_IDS = EVENTS.invert

  belongs_to :user, inverse_of: :notifications
  belongs_to :notifiable, inverse_of: :notifications, polymorphic: true

  validates :event_id, inclusion: { in: EVENTS.keys }
  validates :is_read, inclusion: { in: [true, false] }
  validates :notifiable, :user, presence: true

  scope :read, -> { where(is_read: true) }
  scope :unread, -> { where(is_read: false) }
  scope :event, ->(event_name) { where(event_id: EVENT_IDS[event_name]) }


  def url
    case self.event_name
    when :new_comment_on_post
      comment = self.notifiable
      root_url + "#/posts/#{comment.commentable_id}"
    when :new_comment_on_comment
      comment = self.notifiable
      root_url + "#/comments/#{comment.commentable_id}"
    when :new_post_in_subreddit
      post = self.notifiable
      root_url + "#/subreddits/#{post.subreddit_id}"
    end
  end


  def text
    case self.event_name
    when :new_comment_on_post
      comment = self.notifiable
      comment_user = comment.user
      post = comment.commentable

      "#{comment_user.username} commented on your post: #{post.title}"

    when :new_comment_on_comment
      comment = self.notifiable
      comment_user = comment.user
      comment = comment.commentable

      "#{comment_user.username} commented on your comment: #{comment.content}"

    when :new_post_in_subreddit
      post = self.notifiable
      post_user = post.user
      subreddit = post.subreddit

      "#{post_user.username} posted in your subreddit: #{subreddit.title}"
    end
  end

  def event_name
    EVENTS[self.event_id]
  end

  def default_url_options
    options = {}
    options[:host] = Rails.env.production? ? "projectskeleton.herokuapp.com" : "localhost:3000"
    options
  end
end
