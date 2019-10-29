# node-with-react

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



