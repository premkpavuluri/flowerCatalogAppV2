const { createRouter, logRequestHandler, notFoundHandler, urlParserHandler }
  = require('myserver');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { protectedHandler } = require('./handlers/protectedHandler.js');
const { serveFileContent } = require('./handlers/fileHandler.js');
const { handleGuestBook } = require('./handlers/guestBookHandler.js');
const { loadCommentsHandler } = require('./handlers/loadComments.js');
const { authenticateSession } = require('./handlers/authenticateSession.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { loginPageHandler } = require('./handlers/loginPageHandler.js');
const { loadLoginForm } = require('./handlers/loadLoginForm.js');

const sessions = {};
const usersDb = {
  'pk': {
    username: 'prem'
  },
  'john': {
    username: 'Mr.john'
  }
};

const connectHandlers = (appConfig) => {
  const sessionHandler = injectSession(sessions);
  const loginUserHandler = loginHandler(sessions, usersDb);
  const logout = logoutHandler(sessions);

  const handlers = [
    urlParserHandler,
    parseBodyParams,
    logRequestHandler,
    loadLoginForm,
    injectCookie,
    sessionHandler,
    loginPageHandler,
    loginUserHandler,
    protectedHandler,
    authenticateSession,
    loadCommentsHandler(appConfig.db),
    handleGuestBook,
    serveFileContent(appConfig.resource),
    logout,
    notFoundHandler];

  return createRouter(handlers);
};

module.exports = { connectHandlers };
