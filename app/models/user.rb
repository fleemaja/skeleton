class User < ActiveRecord::Base

  attr_reader :password

  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }, confirmation: true
  validates :password_confirmation, presence: true, on: :create

  has_many :posts, class_name: "Post", foreign_key: :poster_id, inverse_of: :user

  has_many :moderated_subreddits, class_name: "SubReddit", foreign_key: :user_id

  has_many :subscriptions, class_name: "Subscription", foreign_key: :user_id

  has_many :subscribed_subreddits, through: :subscriptions, source: :subreddit

  has_many :comments

  has_many :user_votes

  has_many :notifications, inverse_of: :user, dependent: :destroy

  has_attached_file :avatar, styles: {big: "600x600", small: "50x50"}
  validates_attachment :avatar, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"] }

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def post_karma
    self.posts.inject(0) { |sum, p| sum + p.karma }
  end

  def comment_karma
    self.comments.inject(0){|sum, c| sum + c.karma }
  end
end
