class Place < ApplicationRecord

    validates :longitude, presence: { message: "Must select location"}



    belongs_to :post


    reverse_geocoded_by :latitude, :longitude, :address => :address

    after_validation :reverse_geocode, :if => lambda{ |obj| obj.address.blank? || obj.longitude_changed? || obj.latitude_changed? }

end