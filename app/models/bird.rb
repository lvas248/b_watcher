class Bird < ApplicationRecord

    has_many :posts, dependent: :nullify # will dissassociate from post if post is destroyed, it will not be destroyed
    has_many :users, through: :posts
    has_one :image, as: :imageable

    validates :name, uniqueness: true, presence: true
    validates :description, presence: true

end
