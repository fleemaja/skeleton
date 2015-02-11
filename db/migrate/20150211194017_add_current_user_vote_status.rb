class AddCurrentUserVoteStatus < ActiveRecord::Migration
  def change
    add_column :comments, :vote_status, :string
  end
end
