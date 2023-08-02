// Import necessary modules and initialize the app.
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Initialize an express application.
const app = express();
const PORT = process.env.PORT || 3001;

// Configure the session middleware.
const sess = {
  secret: process.env.SECRET_KEY,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use the session middleware with the express app.
app.use(session(sess));

// Set up the express-handlebars view engine with helpers and custom directories.
const hbs = exphbs.create({
  helpers,
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: [
    path.join(__dirname, 'views/partials'),
    path.join(__dirname, 'views')
  ]
});

// Set handlebars as the view engine for the express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use middleware for parsing JSON and urlencoded form data and serving static files.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes with the express app.
app.use(routes);

// Sync the database and start the server.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
