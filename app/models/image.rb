class Image < ApplicationRecord\
    
    belongs_to :imageable, polymorphic: true

    before_destroy :delete_cloud_image

    private

    def delete_cloud_image
        Cloudinary::Uploader.destroy(self.public_id)
    end

end
