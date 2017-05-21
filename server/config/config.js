const _ = require('lodash');

const config = {
  dev: 'development',
  preprod: 'preproduction',
  prod: 'production',
  port: process.env.PORT || 3001,
  expireTime: 14400,
  secrets: { jwt: process.env.JWT }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;
let envConfig;
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch (err) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig);
