class RemoveFilepickerFromSub < ActiveRecord::Migration
  def change
    remove_column :sub_reddits, :filepicker_url, :string
  end
end
