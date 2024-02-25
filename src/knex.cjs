const knex = require('knex')(require('./knexfile.cjs').development)
module.exports = {
    knex
};
