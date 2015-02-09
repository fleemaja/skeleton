class SubReddit < ActiveRecord::Base
  belongs_to :moderator, class_name: "User", foreign_key: :user_id
  has_many :posts, class_name: "Post", foreign_key: :subreddit_id, dependent: :destroy

  has_many :subscriptions, class_name: "Subscription", foreign_key: :subreddit_id, dependent: :destroy
  validates :name, presence: true, uniqueness: true
  validates :user_id, presence: true

  has_many :users, through: :subscriptions, source: :user

  before_validation :downcase_name

  def downcase_name
    self.name = self.name.downcase
  end

  def moderator_name
    self.moderator.username
  end

  def subscribed?(user)
    Subscription.where(user_id: user.try(:id), subreddit_id: self.id)
  end

end
