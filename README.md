# <p align="center">Wingman</p>

<p align="center"><img width="10%" src="https://user-images.githubusercontent.com/52569205/207432376-8c2b3151-9cff-46eb-a5cf-3e388f8dc65b.png" /></p>

### Description

Wingman is a web-based application that aims to make referee assignments easier by tracking referee statistics and managing the interface to assign referees all from the same system. The assignment of referees to matches is among the most debated subjects in Turkish Football. Solving this problem is going to be the main goal of this application. To make this process smoother, our application will have two primary features. Firstly, it will track and display information for each referee that works under MHK to ease the burden and stress of picking a suitable referee for upcoming matches. This information will include statistics about the referee's past decisions and reviews collected from selected independent sports reporters and retired referees. First, statistical data will include statistics such as the total number of faults, red cards, yellow cards, and penalties in the season. Using these statistics TFF members will have easy access to information that can make decision processes easier and more streamlined. Second, the app will display a rating for each referee that is collected in a different interface accessed from a separate login page. The app will have an additional portal for selected independent sports reporters and retired referees. They can log in and rate the performance of referees in each match. 

### Current Working Application

You can use the current version of the application by clicking **[here](https://wingman-team29.herokuapp.com/)**.

## User Documentation

### How to install and run the software

The software requires no installation.

### How to run the software: 

First of all, if you are a reporter or retired referee or a TFF user, it must be invited by a super admin via e-mail. This invitation contains a key for the user so users can sign up. The sign up process is finished once the valid information is entered and the user pushes the sign up button.

After an account is succesfully created, the user enters the previously selected e-mail and password information on the respected fields. The login process is finished when user enters the correct information and push the login button. Afterwards, users can access their profile and start using the functions of the application.

### How to report a bug

If you came across a bug, you can create a new issue by clicking on 'Bug Report' and describing the symptoms from [this website.](https://github.com/SU-CS308-22FA/Wingman/issues/new/choose)

### Known bugs

Currently there are small bugs on front-end side, [it can be seen from the issues part with label bug.](https://github.com/SU-CS308-22FA/Wingman/issues)


## Developer Documentation

### Obtaining the source code

You can clone this GitHub repository to obtain the source code. All of the code for the application is in this repository. Once you have cloned the repository into your local machine, you should do the following:

1. Open the code editor of choice (VSCode is preffered as it has integrated terminals)
2. Run the following command in a terminal at the root of your project: `npm i`
3. Create an .env file at the root of your project. Your environment variables such as your `DB_URI`, `ACCESS_TOKEN_SECRET` will be in this file. You also need to put an email address and password of it for the mail sending operations of the web page. You need to write the email as `MAIL_MAIL` and password as `MAIL_PASS`. Put your environment variables here.
4. On both the client and server folders, run the following command: `npm i`
5. After installing the necessary modules, run the following commands:
    - In the server folder run: `nodemon server`
    - In the client folder run: `npm start`
6. Code as you wish!

### Directory Structure

The directory structure is as follows:
* Server → Front-end side of the application
  * api → Here are the API requests for the application
      * matchController → Here are the controllers of the matches and fixture that handle requests coming to the server
      * userController → Here are the controllers of the user,referees,teams that handle requests coming to the server  
      * wingman.route → Here are the API routes.
  * Middleware → Here are the middleware
  * Public → Here are the public files
  * package.json → Dependencies of the application are listed here
  * Server.js → The actual server file. Everything comes together around here
  * index.js → The parent file of the application
* Client → Back-end side of the application
  * public → Here are some of the public facing files like the index.html and the application icon
  * src → All of the pages, routing, context files, components
    * apis -> Here is the basic API config for the application
    * Components → Here are the components, we have separated components and pages so that we can manage all of them more easily
    * Contexts → Here we can manage the status of different contexts like users.
    * Routes → Here are the pages that are made of components
    * App.css → Basic css (default)
    * App.js → All the front end routes reside here
    * Index.css → Basic css (default)
    * Index.js → The parent file of the application
  * package.json → Dependencies of the client application


### Deployment

#### Heroku Deployment

To deploy your application to Heroku, you can follow these steps:
1. Open an Heroku account
2. Create a new application on Heroku
3. Subscribe to the Heroku Student Developer to receive credits or pay to get credits
4. Enable GitHub Integration
5. Select GitHub deploy
6. Select automatic deploy or manually deploy to the main branch.
7. Once you are done with the development, merge your code to the main branch. This will automatically build and host the new version of your application.
8. To add environment variables in your .env file, follow these steps:
    * Log in to your Heroku account and go to the dashboard.
    * Select the application for which you want to set the environment variables. This will take you to the overview page for that project.
    * Go to the "Settings" page.
    * Scroll down to the "Config Vars" section. To add or modify config vars (environment variables), click "Reveal Config Vars".
      * If you do not have any config vars, you should see a warning message.
    * Set the config vars by specifying the name of your environment variable in the KEY field, and its value in the VALUE field. For example, you might store the URL of your database as an environment variable.
    * After entering both the key and the value, click "Add". You are now done adding environment variables.
