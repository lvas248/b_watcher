class Post < ApplicationRecord

  belongs_to :user
  belongs_to :bird
  has_one :image, as: :imageable, dependent: :destroy
  has_one :place, dependent: :destroy

  validates :caption, presence: { message: 'Must include a caption'}
  
  accepts_nested_attributes_for :bird, :place

  def upload_and_create_image(image_file)

    result =  Cloudinary::Uploader.upload(image_file.tempfile.path, transformation: { width: 800, height: 800, crop: "fill" })

    self.create_image(url: result['url'], public_id: result['public_id'])
  end

  def bird_attributes=(bird_attributes)
    if !self.bird && ( bird_attributes[:name] != '' && bird_attributes[:description] != '')
      self.bird = Bird.create(bird_attributes)
    end
  end

end
