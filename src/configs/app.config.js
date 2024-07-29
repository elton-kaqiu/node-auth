const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 3002,
  db: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
  },
  jwtSecret: process.env.JWT_SECRET,
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
};
