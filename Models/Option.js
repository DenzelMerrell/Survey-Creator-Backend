/*
   Sequelize model for storing options
*/

const { DataTypes } = require('sequelize');
const { sequelize } = require('../Helpers/db-connection');


const Option = sequelize.define('Options', {
    optionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    option: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numberOfVotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

module.exports = { Option };