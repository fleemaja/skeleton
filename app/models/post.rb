class Post < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_posts, against: [:title, :text, :url]

  belongs_to :subreddit, class_name: "SubReddit", foreign_key: "subreddit_id"
  belongs_to :user, class_name: "User", foreign_key: :poster_id
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :user_votes, as: :votable, dependent: :destroy

  validates :title, :poster_id, :subreddit_id, presence: true

  has_many :notifications, as: :notifiable, inverse_of: :notifiable, dependent: :destroy
  after_commit :set_notification, on: [:create]


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

  def sum_comments
    count = self.comments.length
    self.comments.each do |comment|
      count += comment.sum_comments
    end

    count
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


  def subreddit=(subreddit)
    #implement code to procure subreddit id. For now return nil.
    self.subreddit_id = SubReddit.find_by(name: subreddit.downcase).try(:id)
  end

  private

  def set_notification
    notification = self.notifications.unread.event(:new_post_in_subreddit).new
    notification.user = self.subreddit.moderator
    notification.save
  end


end
