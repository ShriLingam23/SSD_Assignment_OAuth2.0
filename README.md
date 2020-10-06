# SSD_Assignment_OAuth2.0
 
 ## Introduction

* This application was developed to upload the photo of a particular user to their google drive. For user authorization, Google OAuth2.0 authorization framework has been used. 
* You can checkout the implementation and use of Google OAuth 2.0 in demo application deployed to [Heroku](https://ssd-oauth-assignment.herokuapp.com)
<div style="text-align:center;">
	<table cellspacing="0" cellpadding="0" style="border: 0px solid #cfcfcf;">
		<tr>
			<td><img src="https://github.com/ShriLingam23/SSD_Assignment_OAuth2.0/blob/master/demo/LandingPage.jpg" height="200"></td>
			<td><img src="https://github.com/ShriLingam23/SSD_Assignment_OAuth2.0/blob/master/demo/UploadPage.jpg" height="200"></td>
		</tr>
	</table>
</div>

#### Technology Stack

* **NodeJs**: server-side implementation
* **Visual Studio**: Integrated Development Environment (IDE)
* **Google Drive API**: the resource server API
* **OAuth 2.0**: the authorization framework

## Getting Started

### Prerequisites

* Git command line tool [download here](https://git-scm.com/download/win)
* NodeJs version 12.18.0: [download here](https://nodejs.org/en/)
* Visual Studio Code(Recommended) [download here](https://code.visualstudio.com/)

### Install

* Clone or download the sample application 
* Navigate into backend folder, `cd backend`
* Run `npm install` to install all related dependencies.

### Google Application (Already done, can skip! - Unless you want own configuration) 

* Navigate to [Google Developer Console](https://console.developers.google.com/) to create an application for the demo. Use the client id and secret of created application in the below section to run the demo.

### Configure .env setup (Already done, can skip! - Unless you want own configuration) 

* Modify .env file in root containing the following information

```
CLIENT_ID = "Your application client Id"
CLIENT_SECRET = "Your client secret"
REDIRECT_URL = "http://localhost:3000/api/oauthcallback"
```

### Run

* Run the application using the following command `nodemon server.js` or `node server.js`
