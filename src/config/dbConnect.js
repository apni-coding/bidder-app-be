const { Sequelize } = require("sequelize");
const config = require('./database')[process.env.NODE_ENV || 'development']


const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: "mysql",
  // logging: false 
});

module.exports = sequelize;
