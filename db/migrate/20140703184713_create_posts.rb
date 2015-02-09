class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :text
      t.integer :subreddit_id, index: true
      t.integer :poster_id, index: true
      t.timestamps
    end
  end
end
