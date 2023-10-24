class Place < ApplicationRecord\

    belongs_to :post

    reverse_geocoded_by :latitude, :longitude, :address => :address

    after_validation :reverse_geocode, :if => lambda{ |obj| obj.longitude_changed? || obj.latitude_changed? }

end