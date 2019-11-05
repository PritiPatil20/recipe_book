Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/recipes', to: "static_pages#index"
  get '/recipes/new', to: "static_pages#new"
  get '/recipes/:id', to: "static_pages#index"
  get '/recipes/:id/edit', to: "static_pages#new"
  get '/mealplans', to: "static_pages#new"
  get '/mealplans/new', to: "static_pages#new"
  get '/mealplans/:id', to: "static_pages#new"
  get '/mealplans/:id/edit', to: "static_pages#new"
  get '/stores', to: "stores#index"

  namespace :api do
    namespace :v1 do
      post 'recipes/search', to: 'recipes#search'
      resources :recipes, only: [:index, :create, :show, :update, :destroy]
      resources :mealplans, only: [:index, :create, :show, :update, :destroy]
    end
  end
end
