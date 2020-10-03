Rails.application.routes.draw do
  defaults format: :json do
    resources :users, only: [:index, :create, :show, :update] do
      resources :bookmarks, only: [:index]
      member do
        get :following, :followers, :liked_tweets, :media_tweets, :commented_tweets
      end
    end

    resources :sessions, only: [:create, :show]

    resources :relationships, only: [:create, :destroy]

    resources :tweets, only: [:index, :show, :create, :destroy] do
      resources :comments, only: [:create], module: :tweets
      resources :bookmarks, only: [:create], module: :tweets
      resources :retweets, only: [:create], module: :tweets
      member do
        post :vote
        get :likers
      end
    end

    resources :retweets, only: [:create] do
      resources :retweets, only: [:create], module: :retweets
    end

    resources :comments, only: [:create, :destroy] do
      resources :bookmarks, only: [:create], module: :comments
      resources :retweets, only: [:create], module: :comments
      member do
        post :vote
      end
      resources :comments, only: [:create], module: :comments
    end

    resources :bookmarks, only: [:destroy]
  end
end
