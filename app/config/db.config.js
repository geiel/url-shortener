module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'shorturl_db',
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
}