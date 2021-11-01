// DOTENV VARIABLES
require('dotenv').config({path: '../.env'});
const BACKEND_HOST = process.env.BACKEND_HOST;
const BACKEND_PORT = process.env.BACKEND_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

// Importing required modules
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// Importing middlewares
const logger = require('./middlewares/logger');
const passport = require("passport");
const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(passport.initialize());
require("./middlewares/passport")(passport);

// Database Connection
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
.then(result => {console.log(`Database ${DB_NAME} has successfully connected`)})
.catch(error => {
    console.log(`An Error Occured ${error}`); 
    handleError(error);
})

// Defining route middleware
app.use('/api/users', require('./routes/api/users_route'));
app.use('/api/divs', require('./routes/api/divs_route'));
app.use('/api/questions', require('./routes/api/questions_route'))
app.use('/api/evalresults', require('./routes/api/results_route'))
app.use('/api/evalstats', require('./routes/api/evalstats_route'))

// Listening to port
app.listen(BACKEND_PORT, () => console.log(`
Initialize Server on PORT: ${BACKEND_PORT},
Use: http://localhost:${BACKEND_PORT} to access`));

module.exports = app;