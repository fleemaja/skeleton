class CreateFilepickerUrlToSubs < ActiveRecord::Migration
  def change
    add_column :sub_reddits, :filepicker_url, :string
  end
end
