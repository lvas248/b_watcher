class UserSerializer < ActiveModel::Serializer
  attributes :email

  has_many :posts
  has_many :birds
  
end
