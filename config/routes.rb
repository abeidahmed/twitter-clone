Rails.application.routes.draw do
  defaults format: :json do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :show]
  end
end
