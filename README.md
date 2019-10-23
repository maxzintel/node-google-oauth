# node-with-react

### Basic Framework:
Incoming HTTP Requests from the browser will hit ports on the machine running the backend (for now, our local machine). Node will pass those requests on to Express. Express looks at the request and decides which chunk of code will handle it, and sends it to the respective Route Handler. Each Route Handler will process an incoming request from Express and generate an outgoing response (JSON) that will go back to Node, and back to the user in the browser.
