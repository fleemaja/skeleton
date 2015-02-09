class CommentsController < ApplicationController
  before_action :extract_commentable_type, only: :create
  
  before_action :require_login, only: [ :create, :destroy ]
  
  
  def create
    
    @comment = current_user.comments.new(comment_params)
    @comment.commentable_type = @commentable_type
    @comment.commentable_id = @commentable_id
    
    if @comment.save
      redirect_to :back
    else
      flash[:errors] = @comment.errors.full_messages
      redirect_to :back
    end
    
  end
  
  
  def show
    @comment = Comment.find(params[:id])
    
  end
  
  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to :back
  end
  
  
  private
    
  def comment_params
    params.require(:comment).permit(:content)
  end
  
  def extract_commentable_type
    if params[:post_id]
      @commentable_type = "Post"
      @commentable_id = params[:post_id]      
    elsif params[:comment_id]
      @commentable_type = "Comment"
      @commentable_id = params[:comment_id]      
    else
      raise ActionController::ParameterMissing
    end
    
  end
end
