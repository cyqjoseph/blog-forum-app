class CommentsController < ApplicationController
    before_action :get_user
    before_action :get_blog

    def index
        @comments = @blog.comments

        render json: @comments
    end


    def create
        @comment = @blog.comments.create(comment_params)
    end

    private
    def blog_params
        params.require(:blog).permit(:title, :body, :creator,:likes, :dislikes, :creatorId, :tags_list)
    end

    def get_user
        @user = User.find(params[:user_id])
    end

    def comment_params
        params.require(:comment).permit(:body, :commenter ,:likes, :dislikes, :commenterId, :blogId)
    end

    def get_blog
        @blog = Blog.find(params[:blog_id])
    end
end
