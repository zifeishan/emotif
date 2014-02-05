## Workflow 

- Home page: welcome
- login
  - initial login: connect to major SNS, etc
- select mood
  - Support a variety of moods
- Recommendations
  - (should we have recommendations if you feel good?)
  - Try another
  - Feeling better
- Mood trend
- Help
  - Example walkthrough

----

## Architecture

- Frontend
  - home page
    - a good design
  - login
    - external authentication
  - select mood
    - colorful / diverse / ...
  - recommendations
    - Support text / image / video rendering
    - Support timer?
  - mood trend
    - basic rendering for input data
    - handle sparse / dense time scales: Zoomable
    - Supported interactions?
    - Prediction?
    - share my mood
      - generate an image (weekly / monthly trend, etc)
      - generate a message


- Backend
  - login
    - Login to Emotif
    - Login with Facebook
    - Login with Twitter
    - Link your blog (new!)
    - Link your gallery (new!)
    - Technical: how to store credentials?
  - data tables (TODO: Yuhao)
    - user info
    - user mood history
    - user credentials with SNS
    - user recommendation base / mapping / ..?
    - user mood gallary
  - recommendation strategy
    - fixed random recommendations
    - random recommendations based on user's history
    - heuristic recommendation strategy 
    - machine learning on recommendation strategy 

