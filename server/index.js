const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy()); 
// Creates a new instance of the passport google strategy.
// Tells the app that we want to be able to authenticate users via Google.
// Add options to configure how this strategy works in our environment. ClientID and ClientSecret. Given to us by Google's oauth service.
// console.developers.google.com
// http://localhost:5000/auth/google/callback Add this rather than a wildcard to the redirect, wildcards now deprecated.

const PORT = process.env.PORT || 5000;
app.listen(PORT);
