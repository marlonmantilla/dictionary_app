Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: redirect(path: '/dictionary')

  resources :dictionary, only: [:index, :create] do
    post :delete, on: :collection
  end
end
