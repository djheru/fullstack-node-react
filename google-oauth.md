# Set up OAuth with Google

## Create app
- https://console.developers.google.com
- Pulldown menu in header next to google brand logo
  - Select "Create project" and name it
  - Wait for notification that it's done
- Enable google OAuth API
  - Click "+Enable API" from dashboard
  - Select "Google+ API"
  - Enable API
- Create credentials
  - Click "Credentials" in side nav
  - Select "OAuth"
  - Configure consent screen
    - Enter product name (e.g. "emaily-dev") and save
  - Select "Web application" as Application type
  - Enter name
  - Set Authorized JavaScript origins
    - http://localhost:4000
  - Set Authorized redirect URIs
    - http://localhost:4000/*
  - Save and take note of the client ID and secret provided
    - Client ID
      - Public token
    - clientSecret
      - Private token
  
  
  
