/*
   Sequelize model for storing survey questions
*/

const { DataTypes } = require('sequelize');
const { sequelize } = require('../Helpers/db-connection');


const Question = sequelize.define('Questions', {
    questionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numberOfOptions: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = { Question };