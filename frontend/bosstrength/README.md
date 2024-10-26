<!-- @format -->

# Software requirements for this application (Inventory tracking application)

## System architecture

### Web stack to be used for this application

The chosen web stack for the development of the application is to be the MERN (MongoDB, Express.js, React.js, Node.js) stack. This is a useful stack that I as the developer have more experience in than other stacks, and it is also easier to use than some other stacks due to limiting the number of programming languages, as all logic on both the frontend and backend is handled by JavaScript and its modern framework Next.js, rather than having to rely on a backend language such as Python or Java.

### Rundown of technology used for the application

The following list provides details on which technology will be used for which purpose:

#### Frontend

- Framework - React.js, which is a framework for JavaScript. React.js is a popular JavaScript framework that allows me as the developer to implement the components required to create a modular application such as this one. This is something that would take far longer with vanilla JavaScript and HTML.

- State management - React useState Hook. Not necessary to use a state management library as the application will be relatively small.

- Routing - React router.

- Data retrieval - RESTful APIs (fetch). A third-party library, such as Axios, will not be used due to complications that arise when trying to test the application.

- Styling - CSS. The use of third-party libraries may be more limiting.

- Testing - Jest framework

#### Backend

- Framework - Express.js
- Data retrieval - RESTful APIs (fetch)

#### Database

- Database management system - MongoDB. Allows for an easier way to manage user data than using an SQL database.
- Database retrieval and schema system - Mongoose for Node.js. Set up to integrate with MongoDB.

#### Authentication

- Authentication system - JWT (JSON Web Tokens). Allows for a modular way to authenticate users and log them in by using functions to create, verify and send tokens. This makes the process of authentication faster and less tedious than using a different authentication system that must constantly communicate between endpoints.

#### Application deployment

- Vercel. The application is to be deployed as a Next.js application via Vercel to the web. The reason for choice is due to the ease of deploying the application and cost-free nature of Vercel to deploy an application.

## Version control system

- GitHub. GitHub is popular enough for the application to receive attention in the near future.

## System requirements

### Functional requirements

#### User recognition and database requirements

The system must allow for user authentication to sign in if they have an account or sign up if they do not have an account. MongoDB will allow the application to have a system where user information can be queried. There must be a measure in place to allow for admin users to have access to features that regular users do not have access to.

#### CRUD operations and state management

CRUD operations will be in place to check against the database for users who are signing in or signing up, as well as with the core functionality of the application. Users who have been assigned the role of admin will be allowed to perform CRUD operations to manage announcements and make them displayable to regular users, as well as to set thresholds on stock and add new stock items.

#### Component-based architecture

React.js components will be needed to ensure a modular approach to the creation of the application. Reusability is emphasised, so there will need to be a component in place for each and every major feature.

### Non-functional requirements

#### Colour reduction

The user interface must be limited to a three tone non-bright colour scheme to prevent the users from being distracted and/or disoriented while using the application.

#### Simplicity

Simple design is emphasised. The application's interface must not be cluttered or contain unnecessary components. Minimal text and large, recognisable symbols must be used to make for a hassle-free user experience.

#### Security standards

Helmet.js will be used to secure the API calls. Environment variables for the storing of credentials will also be preferable to prevent unauthorised access.

#### Physical requirements

A stable internet connection and electronic device, such as a laptop or smartphone, will be needed to access the application once it has been deployed.

#### Implementation requirements

As mentioned above, the MERN stack will be used to create the application.

#### Design constraints

The application will not be large, therefore the use of advanced frameworks, such as Redux for React.js will not be used. This application is also the work of someone who is fairly new to the field of web development, and as such, it may come with a few bugs that will need to be committed out once it has been pushed to GitHub.

### End users of the application

The end users of the application will include:

- Admins of the application will be assigned as admins in the application to add, edit, update and delete announcements, as well as set stock thresholds and add, edit or remove stock items.

- Regular users of the application are only allowed to view announcements and place orders for new stock.

### User stories

- Logging in - 'As a user, I want to be able to log in to the application with minimal effort. It musty not be a long procedure and ideally all I need to know is if my credentials are accepted or not. If I log in successfully, I want to be greeted with my profile immediately'.

- Signing up - 'I do not want to be rejected as a new user for no reason. I need to know if the reason for my rejection is due to a password or username issue'.

- Making an announcement - 'As an admin, this process must be fast and easy to do. I don't want to go through a long procedure of having to create and submit an announcement. An admin panel will be ideal for this, where I can enter the announcement and submit it without the hassle of having to click on a hundred buttons every time I try to perform this repetitive task'.

- Performing our duties - 'Us users want a simple design, but one that allows for creativity. Adding images is a must, and we can't stand not knowing how much stock to order. There must be a threshold in place to prevent us from ordering too much'.

# How to use this application

## Normal user

- Sign up with a valid username and password.
- Sign in with the username and password.
- You will only be allowed to view announcements on the interact page.
- On the product page, you must enter the amount of stock to order in the input provided and click the 'order' button. You may not order more stock than the threshold.

## Admin

- Sign up with a valid username and password. The password must end with @gmail.com.
- Sign in with the username and password.
- You will be allowed to add, edit and update announcements by clicking on the respective buttons.
- You will be allowed to edit or delete products, and add products by specifying the information that relates to it.

## Signing out

- Any user can sign out by clicking on "sign out" in the header.

# Instructions to install this application

## Installing the application

- Access the source code on GitHub.
- Download the source code.

## Running the application

- Open two separate command lines on your computer.

- In the one command line, navigate to the backend of the application (cd C:\Users\geron\Dropbox\GK23050008637\3 - Full Stack Web Development\L3T16\final_capstone_task\backend) and type 'npm start'.

- In the other command line, navigate to the frontend of the application (cd C:\Users\geron\Dropbox\GK23050008637\3 - Full Stack Web Development\L3T16\final_capstone_task\frontend\bosstrength) and type 'npm start'.

## Testing the application

- Open two separate command lines on your computer.

- In the one command line, navigate to the backend of the application (cd C:\Users\geron\Dropbox\GK23050008637\3 - Full Stack Web Development\L3T16\final_capstone_task\backend) and type 'npm test'.

- In the other command line, navigate to the frontend of the application (cd C:\Users\geron\Dropbox\GK23050008637\3 - Full Stack Web Development\L3T16\final_capstone_task\frontend\bosstrength) and type 'npm test'.

# Application security

## API keys

- The application is able to receive requests from other websites due to the use of cors in the backend.

## Authentication

- Two types of users exist: normal users and admins.
- Normal users have different permissions to admins, and one cannot be exchanged for another thanks to JSON Web Tokens.
- JSON Web Tokens prevent unathorised access.

# Third-party APIs used in this application

- None noted. This application is authentic to itself and does not use any third-party APIs as all of the data needed is served by its own backend to be used in its frontend, without requiring external resources.
