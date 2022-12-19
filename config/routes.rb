#config/routes.rb
Rails.application.routes.draw do
  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  get '/all_blogs', to: 'blogs#all_blogs'
  get '/all_blogs/:tag', to: 'blogs#filter'
  # resources :blogs, only: [:show, :index]
  resources :users, only: [:create, :show, :index] do 
      resources :blogs do
        resources :comments
   end
  end
end