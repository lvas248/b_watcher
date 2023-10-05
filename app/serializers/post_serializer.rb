class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :location, :filtered_bird, :image_url

  def filtered_bird
    {id: self.object.bird.id ,name: self.object.bird.name, description: self.object.bird.description}
  end

  def image_url
    self.object.image.url
  end





end
