const config = require('./config/config');
const app = require('./server');
const log4js = require('log4js');
const logger = log4js.getLogger();

app.listen(config.port);

logger.debug(`listening on http://localhost:${config.port}`);
