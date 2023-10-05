class PostsController < ApplicationController

    def create
        user = get_user
        post = user.posts.create!(post_params)
        post.upload_and_create_image(params[:image])
        render json: post, status: :created
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
        permit_attributes(post, [:id, :location_attributes, :caption, :bird_id, :image_url, :bird_attributes])
    end

    
      
end
