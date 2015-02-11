class RemoveCurrentUserVote < ActiveRecord::Migration
  def change
    remove_column :comments, :vote_status, :string
  end
end
