const express = require('express');
// Above gives access to the express library.
// If we do set this constant, the Node Runtime only has access to common js modules.

const app = express();
// By calling express() like a function, it generates a new application.
// Represents a running express app
// Majority of projects use a single application inside of them.
// This app is used to set up configuration for listening to incoming requests from the Node side of the app...
// ... to the Express side and route those requests on to different route handlers.
// Route Handlers we set up in the future will be registered with the Express app, somehow.

app.get('/', (req, res) => {
  res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
