class BlogsController < ApplicationController
    # before_action :get_user
    def all_blogs 
        @blogs = Blog.all()

        render json: @blogs
    end

    def filter 
        ActsAsTaggableOn.force_lowercase = true
        @blogs = Blog.tagged_with(params[:tag], wild: true)

        render json: @blogs
    end

    def index
        @user = User.find(params[:user_id])
        @blogs = @user.blogs

        render json: @blogs
    end

    def show 
        @user = User.find(params[:user_id])
        @blog = Blog.where(id: params[:id])

        render json: @blog
    end

    def create
        @user = User.find(params[:user_id])
        ActsAsTaggableOn.force_lowercase = true
        @blog = @user.blogs.create(blog_params)
    end

    def edit
        @user = User.find(params[:user_id])
        @blog = Blog.find(params[:id])
        render json :@blog
    end

    def update
        @user = User.find(params[:user_id])
        @blog = Blog.find(params[:id])

        if @blog.update(blog_params)
            
        else 
            render :edit, status: :unprocessable_entity
        end
    end



    def destroy
        @user = User.find(params[:user_id])
        @blog = Blog.find(params[:id])
        if @blog.destroy
        else
            render status: 409
        end
        
    end

    


    private
        def blog_params
            params.require(:blog).permit(:title, :body, :creator,:likes, :dislikes, :creatorId, :tag_list)
        end

        def get_user
            @user = User.find(params[:user_id])
        end
end
