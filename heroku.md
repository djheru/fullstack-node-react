# Deploy to Heroku

## Get Heroku CLI
- https://devcenter.heroku.com/articles/heroku-cli
`wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh`

## Add Heroku App
- Login - `heroku login`
- Create new app - `heroku create`
  - This gives you the app url and the git repo url
    - https://secret-basin-36896.herokuapp.com/
    - https://git.heroku.com/secret-basin-36896.git
    
## Deploy via webhooks
- Push to remote - `git push heroku master`
- It automatically builds it
- View it - `heroku open`

## Build client side

