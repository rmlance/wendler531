[![Codeship Status for rmlance/wendler531](https://app.codeship.com/projects/467763a0-8416-0138-246a-5a78e99dabbd/status?branch=master)](https://app.codeship.com/projects/398390)
# README
Ruby version: 
* 2.6.5

System dependencies
* Coming soon (app still in development)

Configuration
* Coming soon (app still in development)

Database creation:
* bundle exec rake db:create

Database initialization:
* bundle exec rake db:migrate

Running the test suite:
* bundle exec rspec  

Heroku Deployment Instructions:
* Clone this repo to your machine, create a new GitHub repo from that project
* Create a new Heroku project
* Link your GitHub repo containing this code to your Heroku project
* Deploy the master branch
* Run heroku run rake db:migrate --app <APP NAME>
