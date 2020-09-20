Rails.application.routes.draw do
  defaults format: :json do
    resources :users, only: [:create]
  end
end
