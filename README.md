# Description

This is the backend for a survey creator website that will allow the user to create 
multiple choice polls with questions and options. Each user will also be able to vote 
on surveys created and posted by other users.

Technologies:
Node Js
MySQL
Sequelize


#Models

##Models

Makes importing models easier. Imports all models so that they can all be exported from the same file.

##User

Stores users username and password

##User Session

Whenever a user signs up a new usersession is created. It is toggled on and off as they log in and out

The token is put into the users local storage and is used to
determine if the user is already signed in (After they have refreshed
the page or left the browser and come back)

##Survey

Stores the survey name

One to many association with the user table; one user has many surveys

##Question

Stores the question

One to many association with the survey table; one survey has many questions

##Option

Stores the options and votes

One to many association with the question table; one question has many options



#Routes

*docs*

The information to be provided and supplied in the requests and responses

*User Routes (Routes pertaining to user accounts)*

##signup

Create a new user account in the database

##login

Verify and give an existing user access to their account

##logout

End the user session associated with the token provided in the request

##verifyToken 

Verify that the user's token is correct.
If the user already has a token when they open the webpage, verify that the token is valid
and allow access to the site.

##deleteUser

Delete a single user along with all associated surveys, questions, and options

*Survey Routes (Routes pertaining to the creation and retrieval of surveys)*

##"add" routes

Add's one of the thing in question (i.e. "addSurvey" adds one survey name, "addQuestion" adds one question to a survey, etc)

##"get" routes

Retrieve information regarding the survey (i.e. "getQuestions" retrieves all question given the surveyId, "getOptions" retrieves all options given the questionId etc)

"getSurvey" retirves a single survey by its surveyId
"getSurveys" retrieves all surveys matching a given search query

##vote

Increments the vote count of the poll option after someone takes a survey

##deleteSurvey

Deletes a survey, along with all of its questions and options


#Helpers

##Model-Associations

Joins tables with one-to-one and one-to-many relationships
