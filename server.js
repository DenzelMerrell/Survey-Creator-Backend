/*
    The Server

    Description: 

    This is the backend for a survey creator website that will allow the user to create 
    multiple choice polls with questions and options. Each user will also be able to vote 
    on surveys created and posted by other users.

*/

const express = require('express');
const cors = require('cors');
const { testConnection } = require('./Helpers/db-connection');
require('./Helpers/Model-Associations');
require('dotenv').config();

const app = express();


const port = process.env.PORT || 3000;


app.use(cors());

//Middleware that converts incoming json requests to objects
app.use(express.json());


// Test the database connection
testConnection();

//Create routers

//User routes
const loginRouter = require('./routes/api/User/login.js');
const logoutRouter = require('./routes/api/User/logout.js');
const signupRouter = require('./routes/api/User/signup.js');
const verifyTokenRouter = require('./routes/api/User/verifyToken.js');
const deleteUserRouter = require('./routes/api/User/deleteUser.js');

app.use('/accessAccount', loginRouter);
app.use('/accessAccount', logoutRouter);
app.use('/accessAccount', signupRouter);
app.use('/accessAccount', verifyTokenRouter);
app.use('/accessAccount', deleteUserRouter);

//Survey routes
const addSurveyRouter = require('./routes/api/Survey/addSurvey.js');
const addQuestionRouter = require('./routes/api/Survey/addQuestion.js');
const addOptionRouter = require('./routes/api/Survey/addOption.js');
const deleteSurveyRouter = require('./routes/api/Survey/deleteSurvey.js');
const getSurveysRouter = require('./routes/api/Survey/getSurveys.js');
const getSurveyRouter = require('./routes/api/Survey/getSurvey.js');
const getQuestionsRouter = require('./routes/api/Survey/getQuestions.js');
const getOptionsRouter = require('./routes/api/Survey/getOptions.js');
const voteRouter = require('./routes/api/Survey/vote.js');

app.use('/accessAccount', addSurveyRouter);
app.use('/accessAccount', addQuestionRouter);
app.use('/accessAccount', addOptionRouter);
app.use('/accessAccount', deleteSurveyRouter);
app.use('/accessAccount', getSurveysRouter);
app.use('/accessAccount', getSurveyRouter);
app.use('/accessAccount', getQuestionsRouter);
app.use('/accessAccount', getOptionsRouter);
app.use('/accessAccount', voteRouter);


app.listen(port, () => {
    console.log("listening");
})

// app.get('/', (req, res) => {
//     console.log("Request Made");
//     res.json({
//         message: "Request Made"
//     })
// })