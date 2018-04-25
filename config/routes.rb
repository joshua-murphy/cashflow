Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    get 'professions/random', to: 'professions#random_profession'
    post 'professions/:title', to: 'professions#select_profession'
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
