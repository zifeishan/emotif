Emotif
======

**Emotif** is a mobile web application to track your mood and make you feel better!

Current TODO
====


- Define a new data schema

    Recommendation
      rectype: String ( photo / video / friend ...)
      url: String (videoURL, photoURL, ...)
      time_shown: int (how many times shown to user)
      time_likes: int (how many likes in total)
      time_better: int (how many times user see this and feel better)

- Link buttons to update Recommendation schema!
  - like button
  - better button


- Give an interface to get user email at any page (write a doc how to do so)

- Write a "Connect to Facebook" button, and register a click listener

- Write a skeleton to calculate all recommendations, store this into window.localStorage. (after Select mood)


Dependencies
----

- npm: `$ sudo brew install npm` 
- grunt: `$ sudo npm install -g grunt-cli`
- bower: `$ sudo npm install -g bower`
- yo: `$ sudo npm install -g yo`
- coffeescript: `$ sudo npm install -g coffee-script`
- mongodb: `$ brew install mongodb`
- jade

How to's
----

### Initiate

- Run `$ npm install`
- Run `$ bower install`

### How to host a local server

- Run `$ mongod` to start your local database.
- Run `$ grunt serve` to start the server

### How to compile & push to Heroku

- Run `$ grunt` to compile the whole project
- `cd` into `dist/`, then push it into Heroku.

- For the first push on heroku:
  - Add addon `mongohq`
  - Run `$ heroku config:set NODE_ENV=production`

Development Plan
====

## Week 5

- Set up version control
- Set up Heroku application
- Initialize spreadsheet with tasks
- Formalize spreadsheet after discussion
- Write up formal list of changes
- Bootstrap the app with Yeoman, etc
- Design a home screen
- Code a skeleton "select mood" page
- Code empty recommendation placeholders
- Code a skeleton "mood trend" page
- Test skeleton and provide feedback
- (Stretch) plot application architecture

## Week 6

- Determine related frameworks to use: Yeoman, MongoDB, Heroku?
- Determine & plot application architecture
- Design tables in database
- Set up database
- Link "select mood" result to a database
- Implement random recommendations on a fixed bag of various recommendation types
- Gather ideas to broaden recommendations
- (Stretch) random recommendations based on user's history: photos, interest, etc
- link mood trend to user mood history in database
- Support Login with one major SNS: e.g. Facebook
- Import user's history with Facebook 
- Test with some users and iterate on the feedback

## Week 7

- Login with Facebook
- Login with Twitter
- Link your blog
- Link your gallery

- heuristic recommendation strategy 
- (stretch) machine learning recommendation strategy 
- bug fixes and user testing
- help pages and sample "walkthrough"

- Mood trend: Zoomable and more interactions
- share mood trend to SNS

## Week 8--10

- User testing and evaluation
- Gather data to optimize recommendation strategy
- Try predicting user's emotions, and see how it can help
- Report interesting findings how the app can improve emotions



