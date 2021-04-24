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

### Download Instructions
Clone this repo locally

Cloning instructions:

https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository/

### Dependent Libraries
After cloning the repository, you will need to install the dependencies for this project. To install dependencies, open the terminal for the "jr_design_app
 folder, and then run:
```npm install```

(Expo)[https://docs.expo.io/] is needed to run this application. Please ensure that Expo is installed by running:
```npm install --global expo-cli```

### Run Instructions
After installing all dependent libraries, you can run the application by opening the terminal for the "jr_design_app folder, and then run:
 ```expo start```
 
Expo will then display a QR code that you can scan on your device to run the app locally. 

### Troubleshooting
- When running the app using Expo, sometimes you will notice that the app does not build on your device after you scan the QR code. In order to get past this problem, go to the browser window which opened when you ran `expo start` and select "Tunnel" as the connection type.
- If you run into errors with npm dependencies, or with expo dependencies, a good start to solving these issues is to delete your cloned copy of the app and re-clone it from this GitHub repository. Aditionally, deleting and reinstalling Expo, and restarting your computer will help you run this app.
