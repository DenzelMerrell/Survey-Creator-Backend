const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('heroku_22556ec67a33e58', 'b96164ebb91a63', '6cb8f327', {
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return true;
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
}

module.exports = { sequelize, testConnection };