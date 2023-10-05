class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :location, :filtered_bird, :image_url, :created_date

  def filtered_bird
    {id: self.object.bird.id ,name: self.object.bird.name, description: self.object.bird.description}
  end

  def image_url
    self.object.image.url
  end

  def created_date
    self.object.created_at.strftime("%B %d, %Y")
  end
  





end
