Rails.application.routes.draw do
  defaults format: :json do
    resources :users, only: [:index, :create, :show, :update] do
      member do
        get :following, :followers, :tweets, :liked_tweets
      end
    end

    resources :sessions, only: [:create, :show]

    resources :relationships, only: [:create, :destroy]

    resources :tweets, only: [:index, :show, :create, :destroy] do
      resources :comments, only: [:create], module: :tweets
      member do
        post :vote
        get :likers
      end
    end

    resources :comments, only: [:create, :destroy] do
      member do
        post :vote
      end
      resources :comments, only: [:create], module: :comments
    end
  end
end
