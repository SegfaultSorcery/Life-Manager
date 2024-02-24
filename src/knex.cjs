const knex = require('knex');
const configuredKnex = knex(require('./knexfile.cjs'));
module.exports = {
    configuredKnex
};
