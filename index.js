const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to serve the registration form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route to handle form submission
app.post('/register', (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  
    // Save the user to the database
    newUser.save((err) => {
      if (err) {
        res.send('Error registering user.');
      } else {
        res.send('User registered successfully!');
      }
    });
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
  });