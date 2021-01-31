/*
    -Model for creating a new user session
    -Whenever a user logs in a new usersession is created

    -The token is put into the users local storage and is used to
     determine if the user is already signed in (After they have refreshed
     the page or left the browser and come back)
*/
const { DataTypes } = require('sequelize');
const { sequelize } = require('../Helpers/db-connection');

const UserSession = sequelize.define('UserSessions', {
    sessionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    openSession: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = { UserSession };