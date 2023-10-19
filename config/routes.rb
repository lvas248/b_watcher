Rails.application.routes.draw do
  

  get '/birds', to: 'birds#index'

  post '/post', to: 'posts#create'
  patch '/post/:id', to: 'posts#update'
  delete '/post/:id', to: 'posts#destroy'


  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/update_user', to: 'users#update'
  delete '/delete_account', to: 'users#destroy'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
