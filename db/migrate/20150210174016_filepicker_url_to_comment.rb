class FilepickerUrlToComment < ActiveRecord::Migration
  def change
    add_column :comments, :filepicker_url, :string
  end
end
