class Post < ApplicationRecord

  after_destroy :destroy_bird_if_not_associated

  
  belongs_to :user
  belongs_to :bird
  has_one :location, dependent: :destroy
  has_one :image, as: :imageable, dependent: :destroy

  validates :caption, presence: true
  
  accepts_nested_attributes_for :bird, :location

  def upload_and_create_image(image_file)
    result =  Cloudinary::Uploader.upload(image_file.tempfile.path, :transformation => 
    {:width => 600, :height => 600, :crop=> :lfill})
    self.create_image(url: result['url'], public_id: result['public_id'])
  end

  def bird_attributes=(bird_attributes)
    if !self.bird && ( bird_attributes[:name] != '' && bird_attributes[:description] != '')
      self.bird = Bird.create(bird_attributes)
    end
  end

  private

  def destroy_bird_if_not_associated
    
    unless self.bird.posts.count > 0
      self.bird.destroy
    end
  end





end
