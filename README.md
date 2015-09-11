# Sails-server-template

a [Sails](http://sailsjs.org) application - server side template with File system and User system, including: Local, Facebook and Google authentication.

## Installation
Clone and run  
```sh
$ npm install
```

## Configuration
1. Change mongo url connection at **config/connections.js**
2. Change hostname variable at **config/passport.js** 

#### For Facebook and Google authentication
3. Create developer account and register the hostname
4. Change clientID and secretID at **config/passport.js**

#### For Amazon S3 File system
5. Change key, secret and bucket at **api/controllers/FileController.js**

## Usage
run 
```sh
$ sails lift
```

**/auth/isloggedin** for isLoggedIn check

**/auth/logout** for logout

**/file** (loggedIn users only) for uploading files

#### Local
**/login** for login

**/signup** for signup

#### Facebook
**/auth/facebook** for Facebook login

#### Google
**/auth/google** for Google login


