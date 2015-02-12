class RemoveSidebarAndSubmissionText < ActiveRecord::Migration
  def change
    remove_column :sub_reddits, :sidebar, :text
    remove_column :sub_reddits, :submission_text, :text
  end
end
