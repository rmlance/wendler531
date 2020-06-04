Rails.application.routes.draw do
  root 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :lifts, only: [:index] do
        resources :workouts
      end
    end
  end

  devise_for :users
end
