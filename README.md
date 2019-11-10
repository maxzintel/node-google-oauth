# Node-Google-OAuth

### Server Directory:
Incoming HTTP Requests from the browser will hit ports on the machine running the backend (for now, our local machine). Node will pass those requests on to Express. Express looks at the request and decides which chunk of code will handle it, and sends it to the respective Route Handler. Each Route Handler will process an incoming request from Express and generate an outgoing response (JSON) that will go back to Node, and back to the user in the browser.

### CI/CD
Using Basic Gitlab CI/CD and Github.

After code is pushed...
#### "Verify" (CI)
* Automated build of app and test.
* Analyze source code quality.
* Determine preformance impact with browser performance testing.
* Perform container and dependency scans.
* Push code fixes for bugs uncovered by testing.
* If all is 'green', deploy a 'Review App'

#### "Package"
* Review, Approve, and Merge
* Store docker images in a container registry (Docker Hub)
* Store npm packages with an npm registry.

#### "Release" (CD)
* Automated build and test.
* Deploy to production.
  * If automated, 'Continuous Deployment'
  * If manual, 'Continuous Delivery'
* Monitor health of k8s cluster.
* More complex options:
  * Canary Deployment - ship to a percentage of customers by deploying to a specific portion of pods.
  * Deploy features behind 'Feature Flags'.


### Google OAuth - With PassportJS!
* OAuth Flow:
  * When a user clicks login their request will be forwarded to the Google OAuth api.
  * Google will ask the user if this app has permission to authenticate through google.
  * If the user grants permission, direct to a callback endpoint.
  * Code is taken from the URL, user is put on hold.
  * Send a request to google with the 'code' from the last step.
  * Google sees the 'code' in the url and replies back with details about the user.
  * Get user details, make a new user record in the database.
  * Set user id in a cookie for the user.

* Simple Secret Protection:
  * In config/keys.js, we create an object `module.exports = {}` that contains out client ID and secret.
    * Files like index.js can import these values for authenticating via Google.
  * In the future we will add some additional config such that prod deployments use the environment variables set in gitlab.
  * ID and Secret for dev environment added to `.gitignore`.

* MongoDB and Mongoose setup:
  * MongoDB instance was manually provisioned on MongoDB Atlas - best to containerize instead, but for this project we will leave this as is for the timebeing.
  * `server/models/Users.js`
    * We construct a schema (where we define all possible parameters in the data).
    * From this schema, we create a new model class, which corresponds to a collection in MongoDB.
    * For now this just identifies one field, googleId, of type `String` that will be used to store google profile id's to uniquely identify users.
  * `server/services/passport.js`
    * Import the Users model class.
    * In the passport callback function, line by line:
      * (14) Query our mongoDB instance, return a promise containing the profile.id of a user if it already exists in the database.
      * (15) Pass that profile.id into a conditional, note that it is `null` if the profile.id does not exist in the database yet.
      * (16) If profile.id exists...
      * (18) Resolve the promise, return the existing user record in the database.
      * (19) else; if profile.id does not match anything currently in the database...
      * (21) Create a distinct model instance in the User collection with googleID = profile.id. Save the model instance to the database for persistent storage.
      * (23) Pass through the new model instance, resolve the promise and return the new user record.
  * `server/index.js`
    * Require in the User model.
      * The config from the mongoose models file will load and Mongoose will be informed it is responsible for creating a collection of users.
    * Connect to the MongoDB via the mongo URI.
