require 'httparty'

class Bird < ApplicationRecord

    before_create :get_bird_image

    has_many :posts, dependent: :nullify # will dissassociate from post if post is destroyed, it will not be destroyed
    has_many :users, through: :posts

    validates :name, uniqueness: true, presence: true
    validates :description, presence: true


    private

    def get_bird_image
        response = HTTParty.get("https://api.unsplash.com/search/photos?client_id=#{ENV['UNSPLASH_API_KEY']}&page=1&per_page=1&query=#{self.name}&orientation=squarish")
        self.thumbnail = response['results'][0]['urls']['thumb']
    end

end
