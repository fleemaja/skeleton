Rails.application.routes.draw do

  root to: "pages#root"

  resources :users, only: [:new, :create, :show]

  resources :subreddits, only: [:new, :create, :show, :update]

  resource :session, only: [:new, :create, :destroy]


  namespace :api do

    resources :posts, only: [:show, :index, :create, :destroy] do
    end

    resources :front, only: [:index, :show]


    resources :subreddits, only: [:index, :show, :create]
    resources :comments, only: [:show, :index, :create, :destroy]
    resources :users, only: [:show]

    post "upvote", to: "user_votes#upvote"
    post "downvote", to: "user_votes#downvote"

    get "search_posts", to: "posts#search"

    resources :users, only: [:new, :create, :show]

    resource :session, only: [:new, :create, :destroy]

    resources :subscriptions, only: [:create, :destroy, :show, :index]

    resources :notifications, only: [:index, :show, :update]
  end
end
