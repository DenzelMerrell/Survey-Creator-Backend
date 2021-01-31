/*
   Sequelize model for storing new users
*/
const { DataTypes } = require('Sequelize');
const { sequelize } = require('../Helpers/db-connection.js');
const bcrypt = require('bcrypt');

const User = sequelize.define('Users', {
   userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   username: {
      type: DataTypes.STRING(100),
      allowNull: false
   },
   password: {
      type: DataTypes.STRING(100),
      allowNull: false
   },
   numberOfSurveys: {
      type: DataTypes.INTEGER,
      defaultValue: 0
   }
});

module.exports = { User };