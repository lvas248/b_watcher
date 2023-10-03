class User < ApplicationRecord

    has_many :posts
    has_many :birds, through: :posts

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

    has_secure_password

    private

 
end
