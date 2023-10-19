class Place < ApplicationRecord\

    belongs_to :post

    before_update :reverse_geolocate

    before_create :reverse_geolocate

    private


    def reverse_geolocate
        result = Geocoder.search([self.latitude, self.longitude])
        self.address = "#{result.first.data['address']['road']}, #{result.first.data['address']['city'] || result.first.data['address']['town'] || result.first.data['address']['village'] } , #{result.first.data['address']['state']}"
    end
end