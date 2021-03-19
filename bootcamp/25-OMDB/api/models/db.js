const Sequelize  = require("sequelize");


const sequelize = new Sequelize('omdb', 'gisse', 'postgress', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;