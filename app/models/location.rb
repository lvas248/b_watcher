class Location < ApplicationRecord
    belongs_to :post

    validates :address, presence: true
end
