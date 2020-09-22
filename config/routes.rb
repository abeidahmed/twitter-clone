Rails.application.routes.draw do
  defaults format: :json do
    resources :users, only: [:index, :create, :show, :update]
    resources :sessions, only: [:create, :show]
  end
end
