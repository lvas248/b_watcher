
# Bird Watcher



WALKTHROUGH: 

DEMO: https://b-watcher.onrender.com




## Overview

Bird Watcher is a simple and user-friendly diary app designed for bird enthusiasts. It allows you to create entries about the birds you come across, including images, captions, bird kind, and location information.

One of the standout features of our app is its map function, which plots all of your bird sightings, providing you with a visual representation of your birdwatching experiences.




## Installation

Install Bird Watcher by visiting the github repo and cloning:


```bash
$ git clone git@github.com:lvas248/b_watcher.git
$ cd project_name
$ bundle install
```

cd into the root of the react app (client folder) and install packages using npm

```bash
$ cd client
$ npm install
``` 



Now create the db and seed the data, in the root of the rails app:

```bash
$ rails db:create db:migrate db:seed
```

This app requires the following api keys: 

[Mapbox](https://www.mapbox.com/)
[Cloudinary](https://cloudinary.com/)
[Unsplash](https://unsplash.com/)

There are free levels of api keys for each of these.  

Next, create an environment file in the root of your app and include the following:

```bash
CLOUD_NAME= your_cloudinary_cloud_name_key
CLOUD_API_KEY= your_cloudinary_api_key
CLOUD_API_SECRET= your_cloudinary_cloud_api_secret_key

UNSPLASH_API_KEY= your_unsplash_api_key
```

Finally, create an env.local file in the root of the react app and include the mapbox api key:

```bash
REACT_APP_MAPBOX_ACCESS_TOKEN= your_mapbox_api_key

```

## Features

#### 1. Secure User Accounts
- Create a secure account for a personalized experience.
- Easily delete your account, with all data removed from the databse and the cloud.

![register](./media/gif/register.gif)

#### 2. Create an Entry
- Record your bird sightings with images, captions, bird details, and geographic locations.

![entry](./media/gif/entry.gif)

#### 3. Entry Listing
- Browse a list of all of your entries.
- Quickly Filter entries by bird type.

![browse](./media/gif/browse.gif)

#### 4. Map
- Visualize and interact with all of your bird sightings on a map.

![map](./media/gif/map.gif)

#### 5. Responsive Design
- Enjoy a user friendly expereience on any device

## Backend

### API Endpoints

**Authentication**:  
- `POST /signup`: Create a new user account.
- `POST /login`: Log in with an existing user account.

**Session**
- `GET /me`: Retrieve the user that is currently in session.
- `DELETE /logout`: Remove current user from session.

**Entries**
- `POST /post`: create an entry.
- `PATCH /post/:id`: Update and entry.
- `DELETE /post/:id`: Delete and Entry

**Birds**
- `GET /birds`: Get a list of all birds in the Database.

**Account**
- `PATCH /update_user`: Update user email.
- `DELETE /delete_account`: Delete your account and all of your content.


### Database

The backend uses the following data models:

Users
- `_id`
- `email`
- `password_digest`

Posts
- `_id`
- `bird_id`
- `user_id`
- `caption`

Images (polymorphic)
- `_id`
- `imageable_id`
- `imageable_type`
- `url`
- `public_id`

Places
- `_id`
- `post_id`
- `address`
- `latitude`
- `longitude`

Birds
- `_id`
- `name`
- `description`
- `thumbnail`



### Table Associations

USER
- user has_many :posts
- user has_many :birds, through: :posts

POST
- belongs_to :user
- belongs_to :bird
- has_one :image, as :imageable
- has_one :place

PLACE
- belongs_to :post

IMAGE
- belongs_to :imageable, polymorphic: true

BIRD
- has_many :posts
- has_many :users, through: :posts
- has_one :image, as: :imageable








## License

[MIT](https://choosealicense.com/licenses/mit/)

