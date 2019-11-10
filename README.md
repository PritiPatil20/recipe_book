## Recipe Book
[![Codeship Status for PritiPatil20/recipe_book](https://app.codeship.com/projects/b6ffbd20-d67d-0137-9c00-6273a50fbf0b/status?branch=master)](https://app.codeship.com/projects/370591)
Recipe Book application will help user to streamline their cooking needs by searching recipes according to the ingredient they have or by the name of the recipe. It will help user to customize their recipes. It also provides functionality to user to make meal plans and receive email reminder of their meal plans.

## Heroku Link
https://recipebooklaunch.herokuapp.com/

*Due to api key dependencies, please use the Heroku link to access the app's full functionality.*


## Technologies

* Ruby 2.6.5
* Rails 5.2.3
* React 16.8.0
* Devise
* SendGrid
* React-Datepicker 2.9.6
* Sidekiq 5.2.7
* Carrierwave
* React-dropzone 10.1.10
* Geocoder
* Google_places

## To Run Locally
1. Download the repository.
2. Run `yarn install` and `bundle install`.
3. To setup database run `bundle exec rake db:create` and `bundle exec rake db:migrate`.
4. See the file `.env.example` for required variables that must be set up to run the          application.
5. Run the application locally by running following commands in separate windows in your terminal
```
rails server
yarn run start
redis-server
bundle exec sidekiq

```
6. Navigate your browser to localhost:3000 to view application.
