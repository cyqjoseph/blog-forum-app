#app/controllers/users_controller.rb
class UsersController < ApplicationController
    def index
        @users = User.all
           if @users
              render json: {
              users: @users
           }
          else
              render json: {
              status: 500,
              errors: ['no users found']
          }
         end
    end
    def show
       @user = User.find(params[:id])
           if @user
              render json: {
              user: @user
           }
           else
              render json: {
              status: 500,
              errors: ['user not found']
            }
           end
      end
      
      def create
         @user = User.new(new_user_params)
             if @user.save
                 login!  
                 render json: {
                 status: :created,
                 user: @user
             }
            else 
                render json: {
                status: 500,
                errors: @user.errors.full_messages
            }
            end
      end

      def update
        @user = User.find(params[:id])
        if @user
            if @user.update(user_params)
                @blogs = Blog.where(creatorId: params[:id])
                @blogs.update(creator: @user.username)

                @comments = Comment.where(commenterId: params[:id])
                @comments.update(commenter: @user.username)
                
                render json: @blogs
            else
                render :edit, status: :unprocessable_entity
            end

        end
      end
      
private
    def user_params
        params.require(:user).permit(:username, :password)
    end
      
    def new_user_params
         params.require(:user).permit(:username, :password, :password_confirmation)
     end
end