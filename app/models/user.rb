class User < ApplicationRecord

    has_many :posts, dependent: :destroy
    has_many :birds, -> { distinct }, through: :posts

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

    has_secure_password

    private

 
end
