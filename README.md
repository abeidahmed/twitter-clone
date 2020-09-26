# Twitter clone

The app is in development stage.

### Setup

- Clone this repository
- `cd` into the folder
- Run `bundle install`
- `cd` into the client folder
- Run `yarn install`

### Setup credentials file

This app uses [cloudinary](https://cloudinary.com/) to store the images. Eg: user avatar, user banner, to name a few. Run `rails credentials:edit` and store the keys in the format:

```yml
cloudinary:
  cloud_name: your_cloud_name
  api_key: your_api_key
  api_secret: your_api_secret_key
```

Save the file and run `foreman start -f Procfile.dev` from the root directory.
