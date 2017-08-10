# Integrating Full-Stack Apps with Express and React

## Use create-react-app

- `npm i -g create-react-app`
- `cd ./server && create-react-app client`
- Note that the client is install inside the server directory

## Modify npm run Scripts

- Install concurrently to run multiple scrips simultaneously -`npm i -S concurrently`
- Modify the run scripts in the __server__
```
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "engines": {
    "node": "8.1.1",
    "npm": "5.0.3"
  },
  "scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "concurrently": "^3.5.0",
    "cookie-session": "^1.3.0",
    "express": "^4.15.3",
    "mongoose": "^4.11.6",
    "nodemon": "^1.11.0",
    "passport": "^0.3.2",
    "passport-google-oauth20": "^1.0.0"
  }
}
```
