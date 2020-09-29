Rails.application.routes.draw do
  defaults format: :json do
    resources :users, only: [:index, :create, :show, :update] do
      member do
        get :following, :followers
      end
    end
    resources :sessions, only: [:create, :show]
    resources :relationships, only: [:create, :destroy]
    resources :tweets, only: [:index, :show, :create, :destroy] do
      member do
        post :vote
      end
    end
  end
end
