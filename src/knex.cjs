const knex = require('knex');
const config = require('./knexfile.cjs').development;

module.exports = knex(config);
