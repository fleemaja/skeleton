class Api::CommentsController < ApplicationController
  before_action :extract_commentable_type, only: :create

  before_action :require_login, only: [:create, :destroy]

  def create
    @comment = current_user.comments.new(comment_params)
    @comment.commentable_type = @commentable_type
    @comment.commentable_id = @commentable_id

    if @comment.save
      render "show"
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def show
    @comment = Comment.find(params[:id])
    render "show"
  end

  def index
    @comments = Comment.all
    render "index"
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.user_id == current_user.id
      @comment.destroy
      render "show"
    end
  end

  def comments
    @comment = Comment.find(params[:id])
    render json: @comment.comments
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
