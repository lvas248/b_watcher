class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.string :url
      t.string :public_id
      t.references :imageable, polymorphic: true, index: true

      t.timestamps
    end
  end
end