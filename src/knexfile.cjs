module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: '../db/life-manager-databse.db',
        },
        migrations: {
            directory: '../db/migrations', 
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: '../db/seeds',
        },
        useNullAsDefault: true,
    }
}
