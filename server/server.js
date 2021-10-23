// Importing required modules
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// Importing middlewares
const logger = require('./middleware/logger');

// parse env variables
require('dotenv').config();

// Configuring port
const port = process.env.PORT || 9000;
const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.set('view engine', 'html');

// Database Connection
mongoose.connect('mongodb://localhost:27017/WPESMFU_DB')
.then(result => {console.log('Database has successfully connected')})
.catch(error => {
    console.log(`An Error Occured ${error}`); 
    handleError(error);
})

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
app.use('/api/users', require('./routes/api/users_route'));
app.use('/api/divs', require('./routes/api/divs_route'));
app.use('/api/questions', require('./routes/api/questions_route'))
app.use('/api/evalresults', require('./routes/api/results_route'))
app.use('/api/evalstats', require('./routes/api/evalstats_route'))
// Listening to port
app.listen(port, () => console.log(`Initialize Server on PORT: ${port},
Use: http://localhost:${port} to access`));

module.exports = app;