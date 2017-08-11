# Integrating Full-Stack Apps with Express and React

## Use create-react-app

- `npm i -g create-react-app`
- `cd ./server && create-react-app client`
- Note that the client is install inside the server directory

## Modify npm run Scripts

- Install concurrently to run multiple scrips simultaneously -`npm i -S concurrently`
- Modify the run scripts in the __server__
```
{...
  "scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },...
}
```
- Set up proxy to the backend in package.json in the __client__
```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": {
    "/auth/google": {
      "target": "http://localhost:4000"
    }
  },
  "dependencies": {
    ...
  },
  "scripts": {
    ...
  }
}
```
