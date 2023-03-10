#config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do 
    allow do
      origins 'http://localhost:3000','https://blog-forum-app-cyqjoseph.netlify.app'
    
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
    end
  end

  # By default, the React app will run on “http://localhost:3000”. The above code gives all requests from that address access to all server resources and allows them to utilize all HTTP methods.