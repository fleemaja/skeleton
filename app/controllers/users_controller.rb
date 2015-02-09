class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      params[:remember_user] ? signin_and_remember_user(@user) : sign_in(@user)
      redirect_to :root

    else
      flash.now[:errors] = @user.errors.full_messages
      redirect_to :root
    end
  end

  def update
    @user = User.find(params[:id])
    if (@user.update(user_params))
       if params[:avatar]
         @user.update_attribute(:avatar, params[:avatar])
       end
    end

    redirect_to :back
  end


  def show
    @user = User.find(params[:id])
    @posts = @user.posts
  end

  def upload_avatar
    @user = User.find(params[:id])
    if params[:user][:avatar]
      @user.update_attribute(:avatar, params[:user][:avatar])
    end
    redirect_to :back
  end


  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation, :avatar)
  end
end
