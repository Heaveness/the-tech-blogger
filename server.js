const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const helpers = require('./utils/helpers'); // Import your custom helpers module

const app = express();
const PORT = process.env.PORT || 3001;

// Set up session middleware
const sess = {
  secret: 'YourSecretKey',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up handlebars as the template engine
const hbs = exphbs.create({
  helpers: {
    formatDate: helpers.formatDate,
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
