class UsersController < ApplicationController

    # signup 
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id        
        render json: user, status: :created
    end

    #refresh
    def show
        user = get_user
        render json: user, status: :ok
    end

    #edit email address
    def update
        user = get_user
        user.update!(user_params)
        render json: user, status: :ok
    end

    def destroy
        user = get_user
        user.destroy
        session.delete :user_id
        head :no_content
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end

    def get_user
        User.find(session[:user_id])
    end

end
