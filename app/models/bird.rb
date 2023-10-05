class Bird < ApplicationRecord

    has_many :posts
    has_many :users, through: :posts
    has_one :image, as: :imageable

    validates :name, uniqueness: true, presence: true
    validates :description, presence: true

end
