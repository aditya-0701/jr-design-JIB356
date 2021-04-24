# Junior Design Project - 2020/21 
 
## Team 0356

Members: Andrew Harris, Hannah Kim, Sam Sanders, Saket Shirsath, Aditya Sudarshan
Client: Chirsten Steele

## Release Notes
Version: 1.0

### New Features
- Student account creation, login, update account info
- Alumni account creation, login, update account info
- Alumni can create, read, update, and delete projects
- Students can view and save projects by swiping through cards with project details
- Students can provide filters to view only a set of desired projects
- Students can search directly for projects by using a keyword search
- Alumni can view and save student profiles by swiping through cards with student details
- Alumni can provide filters to view desired student profiles
- Alumni can search directly for student profiles by using a keyword search
- Alumni and students can contact each other by clicking on displayed emails that will open in any installed email app 

### Known Bugs and Defects
- Alumni and Students do not have the capability to change their password
- If quickly swiping, next card data will not load in time. Requires at most 1 second on each card to load next card
- After returning to card swiping screen after using Search and filtering screen, cards sometimes do not refresh until new swipe or left/right buttons used
- After removing/creating projects on the My Projects screen, sometimes the screen does not update with latest values until the refresh button is clicked
- After removing project Interests or saved student Profiles on the Saved Projects/Saved Profiles screens, sometimes the screen does not update with latest values until the refresh button is clicked


## Installation Guide
Verson 1.0

### Pre-requisites
#### 1. Install NodeJS
- Visit https://nodejs.org/en/download/
- Select LTS
- Select the Installer your operating system
- Follow instructions of the install wizard
#### 2. Install NPM
NPM is automatically installed with NodeJS. However, you should make sure you have the latest version installed

Check Version: ```npm -v```

Update NPM: ```npm install npm@latest -g```

### Dependent Libraries
To install dependencies, simply run:
```npm install```
Expo is needed to run this application. Please ensure that Expo is installed by running:

```npm install --global expo-cli```

### Download Instructions
Clone this repo locally

Cloning instructions:

https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository/


### Build Instructions
TODO

### Install Instructions
TODO

### Run Instructions
TODO

