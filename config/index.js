require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  password: process.env.PASSWORD,
  jwtSecret: process.env.SECRET,
  mysql: {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  mysqlService: {
    host: process.env.MYSQL_SERVICE_HOST || 'localhost',
    port: process.env.MYSQL_SERVICE_PORT || 3001,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  clear: {
    host: process.env.CLEAR_HOST,
    user: process.env.CLEAR_USER,
    password: process.env.CLEAR_PASS,
    database: process.env.CLEAR_DB,
  }
};

module.exports = { config };