class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|
      t.string :address
      t.float :latitude
      t.float :longitude
      t.references :post, null: false, foreign_key: true
      t.timestamps
    end
  end
end
