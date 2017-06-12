const port = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET || 'my awesome secret';
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/wdi-ldn-project-1-${env}`;
module.exports = { port, env, dbURI, sessionSecret };
