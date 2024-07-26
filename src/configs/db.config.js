const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log(`Connected successfully to the database`))
  .catch((error) =>
    console.log(`Failed to connect to database: ${error.message}`)
  );

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Role = require("../models/role.model")(sequelize, DataTypes);
db.User = require("../models/user.model")(sequelize, DataTypes);

//relations
const { User, Role } = db;
User.belongsTo(Role, { foreignKey: "role_id" });

sequelize
  .sync({ force: false })
  .then(() => console.log(`Synced successfully with database!`))
  .catch((error) => console.log(`Failed to sync with database!`));

module.exports = db;
