Rails.application.routes.draw do
  root 'homes#index'
  get '/start', to: 'homes#index'
  get '/lifts/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :lifts, only: [:index, :show, :create, :update] do
        resources :workouts do
          resources :setts
        end
      end
    end
  end

  devise_for :users
end
