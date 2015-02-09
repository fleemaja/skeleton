class CreateSubReddits < ActiveRecord::Migration
  def change
    create_table :sub_reddits do |t|
      t.references :user, index: true
      t.string :title
      t.text :description
      t.text :sidebar
      t.text :submission_text
      t.string :name, null: false

      t.timestamps
    end
  end
end
