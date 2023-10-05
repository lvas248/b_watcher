class Bird < ApplicationRecord

    validates :name, uniqueness: true, presence: true

    has_many :posts
    has_many :users, through: :posts
    has_one :image, as: :imageable


end
