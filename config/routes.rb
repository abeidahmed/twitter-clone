Rails.application.routes.draw do
  defaults format: :json do
    resources :users, only: [:index, :create, :show, :update] do
      member do
        get :following, :followers
      end
    end
    resources :sessions, only: [:create, :show]
  end
end
