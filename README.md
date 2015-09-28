# Sails-server-template

a [Sails](http://sailsjs.org) application - server side template with File system and User system, including: Local, Facebook and Google authentication.
For more information: http://sailsjs.org/documentation/concepts/
enjoy :)

## Installation
Clone and run  
```sh
$ npm install
```

## Configuration
1. Change mongo url connection at **config/connections.js**

#### For Facebook and Google authentication
3. Create developer account and register http://localhost/callback as valid callback
4. Change clientID and secretID at **config/passport.js**

#### For Amazon S3 File system
5. Change key, secret and bucket at **config/locals.js**

## Usage
run 
```sh
$ sails lift
```

routes

* **/auth/isloggedin** for isLoggedIn check

* **/auth/logout** for logout

* **/file** (loggedIn users only) for uploading files


#### Local
* **/login** for login

* **/signup** for signup


#### Facebook
* **/auth/facebook** for Facebook login


#### Google
* **/auth/google** for Google login

