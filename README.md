# SSD_Assignment_OAuth2.0

You can checkout the sample implementation and use of Google OAuth 2.0 in demo application deployed to [Heroku](https://ssd-oauth-assignment.herokuapp.com)

## Getting Started

### install

clone or download the sample application. and run

`npm install`

to install all related dependencies.

### Google Application

navigate to [Google Developer Console](https://console.developers.google.com/) to create an application for the demo. Use the client id and secret of created application in the below section to run the demo.

### .env setup

modify .env file in root containing the following information (Already done!)

```
CLIENT_ID = "Your application client Id"
CLIENT_SECRET = "Your client secret"
REDIRECT_URL = "http://localhost:3000/api/oauthcallback"
```

### run

run the application using the following command

`nodemon server`

or

`node server`
