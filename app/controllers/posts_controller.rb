class PostsController < ApplicationController

    def create
        # binding.pry
        user = get_user
        post = user.posts.create!(post_params)
        post.upload_and_create_image(params[:image])
        render json: post, status: :created
    end

    def update
        user = get_user
        post = user.posts.find(params[:id])
        post.update!(update_params)
        render json: post, status: :created
    end

    def destroy
        user = get_user
        post = user.posts.find(params[:id])
        post.destroy
        head :no_content
    end

    private

    def get_user
        User.find(session[:user_id])
    end

    def post_params

        def permit_attributes(obj, attributes)
            obj.filter { |key,_| attributes.include?(key.to_sym)}
        end

        post = JSON.parse(params[:post])
        permit_attributes(post, [:id, :place_attributes, :caption, :bird_id, :image_url, :bird_attributes])
    end

    def update_params
        params.require(:post).permit(:bird_id, :caption, place_attributes: [ :id, :latitude, :longitude ])
    end

    
      
end
