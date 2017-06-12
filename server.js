const express = require('express');
const app = express();
const { port, env, dbURI, sessionSecret } = require('./config/environment');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const router = require('./config/routes');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('express-flash');
const session = require('express-session');
const morgan = require('morgan');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');
const errorHandler = require('./lib/errorHandler');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

// set up our middleware
if(env !== 'test') app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.locals.moment = require('moment');

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(customResponses);
app.use(authentication);

app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
