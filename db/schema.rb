# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_10_04_195607) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "birds", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "images", force: :cascade do |t|
    t.string "url"
    t.string "public_id"
    t.string "imageable_type"
    t.bigint "imageable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["imageable_type", "imageable_id"], name: "index_images_on_imageable"
  end

  create_table "locations", force: :cascade do |t|
    t.string "address"
    t.float "latitude"
    t.float "longitude"
    t.bigint "post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_locations_on_post_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "bird_id", null: false
    t.string "caption"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bird_id"], name: "index_posts_on_bird_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "locations", "posts"
  add_foreign_key "posts", "birds"
  add_foreign_key "posts", "users"
end
