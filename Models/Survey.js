/*
   Sequelize model for storing surveys 
*/

const { DataTypes } = require('sequelize');
const { sequelize } = require('../Helpers/db-connection');

const Survey = sequelize.define('Surveys', {
    surveyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    surveyName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numberOfQuestions: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

})

module.exports = { Survey };