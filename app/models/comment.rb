class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user, inverse_of: :comments

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :user_votes, as: :votable, dependent: :destroy

  has_many :notifications, as: :notifiable, inverse_of: :notifiable, dependent: :destroy

  after_commit :set_notification, on: [:create]

  validates :commentable, presence: true

  def karma
    self.user_votes.sum(:value)
  end

  def num_votes
    self.user_votes.count
  end

  def ups
    self.user_votes.where(value: 1).count
  end

  def downs
    self.user_votes.where(value: -1).count
  end

  def hotness
    s = self.karma
    order = Math.log10([s, 1].max)
    if s > 0
      sign = 1
    elsif s < 0
      sign = -1
    else
      sign = 0
    end
    seconds = (self.created_at - 1134028003).to_i
    order + sign * seconds.fdiv(45000)
  end

  def self._bestness(ups, downs)
    n = ups + downs
    return 0 if n == 0
    z = 1.281551565545 # 80% confidence
    p = ups.fdiv(n)
    left = p + 1.fdiv(2 * n) * z * z
    right = z * Math.sqrt(p * (1 - p).fdiv(n) + z * z.fdiv(4 * n * n))
    under = 1 + 1.to_f.fdiv(n * z * z)
    (left - right).fdiv(under)
  end

  def self._best_arr
    best_arr = []
    400.times do |i|
      100.times do |j|
        best_arr << self._bestness(i, j)
      end
    end
    best_arr
  end

  def bestness
    return 0 if self.num_votes.zero?
    if (self.ups < 400 && self.downs < 100)
      self.class._best_arr[self.downs + self.ups * 100]
    else
      self.class._bestness(self.ups, self.downs)
    end
  end

  def controversy
    return 0 if (self.ups <= 0 || self.downs <= 0)

    magnitude = self.num_votes
    balance = self.karma > 0 ? self.downs.fdiv(self.ups) : self.ups.fdiv(self.downs)
    magnitude ** balance

  end

  def sum_comments
    count = self.comments.length
    self.comments.each do |comment|
      count += comment.sum_comments
    end

    count
  end

  def author_username
    self.user.username
  end

  def root_post
    parent = self.commentable
    while (parent.class.to_s == "Comment")
      parent = parent.commentable
    end

    parent
  end

  def subreddit
    self.root_post.subreddit
  end

  private

  def set_notification
    class_type = self.commentable.class.to_s
    if (class_type == "Post")
      notification = self.notifications.unread.event(:new_comment_on_post).new
    elsif (class_type == "Comment")
      notification = self.notifications.unread.event(:new_comment_on_comment).new
    end
    notification.user = commentable.user
    notification.save
  end
end
