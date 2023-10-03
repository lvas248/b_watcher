class Bird < ApplicationRecord

    has_many :posts
    has_many :users, through: :posts
    has_one :image, as: :imageable
end
