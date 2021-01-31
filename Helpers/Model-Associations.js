/* 
    Create sequelize associations for joining tables
*/
const { sequelize } = require('./db-connection');
const { User, UserSession, Survey, Question, Option } = require('../Models/Models.js');

// (One-To-One) Each User has one UserSession
User.hasOne(UserSession, { foreignKey: 'userId', onDelete: 'cascade' });
UserSession.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' });

// (One-To-Many) Each User has many Surveys
User.hasMany(Survey, { foreignKey: 'userId', onDelete: 'cascade' });
Survey.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' });

//(One-To-Many) Each Survey has many Questions
Survey.hasMany(Question, { foreignKey: 'surveyId', onDelete: 'cascade' });
Question.belongsTo(Survey, { foreignKey: 'surveyId', onDelete: 'cascade' });

// (One-To-Many) Each Question has many PollOption
Question.hasMany(Option, { foreignKey: 'questionId', onDelete: 'cascade' });
Option.belongsTo(Question, { foreignKey: 'questionId', onDelete: 'cascade' });

// Sync Models

// User.sync({ force: true });
// Survey.sync({ force: true });
// Question.sync({ force: true });

(async () => {
    await sequelize.sync({ force: false }).then(function () {
        console.log("Database Configured");
    });
})();