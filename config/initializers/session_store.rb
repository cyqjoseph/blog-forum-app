#config/initializers/session_store.rb
if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: '_NUSForum', domain: 'NUSForum-app-json-api'
  else
    Rails.application.config.session_store :cookie_store, key: '_NUSForum'
  end