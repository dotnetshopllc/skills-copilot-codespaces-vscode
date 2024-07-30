// create web server    
const express = require('express');
const app = express();
const port = 3000;

// create a middleware function
app.use((req, res, next) => {
  console.log('Middleware function called');
  next();
});

// create a route
app.get('/', (req, res) => {
  res.send('This is the home page');
});

// create a route
app.get('/about', (req, res) => {
  res.send('This is the about page');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
