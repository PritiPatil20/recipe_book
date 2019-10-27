Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/recipes', to: "static_pages#index"
  get '/recipes/new', to: "static_pages#new"
  get '/recipes/:id', to: "static_pages#index"
  get '/recipes/:id/edit', to: "static_pages#index"
  get '/mealplans', to: "static_pages#new"
  get '/mealplans/new', to: "static_pages#new"

  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :create, :show, :update, :destroy]
      resources :mealplans, only: [:index, :create]
    end
  end
end
