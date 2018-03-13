module.exports = {
  auth: {
    username: process.env.api_username,
    password: process.env.api_password
  },
  database: {
    host     : process.env.db_host,
    user     : process.env.db_user,
    port: 3306,
    password : process.env.db_password,
    database: 'nbasidekick'
  }
}