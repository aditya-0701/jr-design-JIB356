# Junior Design Project - 2020/21 
 
## Team 0356

Members: Andrew Harris, Hannah Kim, Sam Sanders, Saket Shirsath, Aditya Sudarshan

Client: Chirsten Steele

## File Structure Overview

There are two main, top level folders in our GitHub. Firstly, we have the `jr_design_app` folder, which houses all the code for our React Native application that we built for this project. Secondly, we have the `matchingapp-api` folder, which serves as a backup of all of our API code. This is simply a copy from our AWS Lambda that we keep as a backup and for reference. The `miscellaneous` folder holds files and documents that are not used in the codebase for either our app our API. In order to run the app or change the codebase, all changes must be made in the `jr_design_app` folder.

## Release Notes
### Version: 1.0

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
Version 1.0

We have a .apk file ready to go for Android users, with installation instructions in our ReadME. Currently, iOS users will have to use Expo to run the application, and if they choose to, they can package the app themselves to be run on iOS. Intructions are not provided for iOS packaging, but can be found on the [Expo website](https://docs.expo.io/). Separate instructions are given below for users installing the .apk, and users that want to use Expo to run the application.

## Running app using [tech_connect.apk](https://github.com/aditya-sudarshan/jr_design_JIB356/raw/master/tech_connect.apk)

Details are provided below on how you can download, install, and run the .apk version of our application on your Android device. This [article](https://www.lifewire.com/install-apk-on-android-4177185) by Lifewire also provides a helpful guide of how you can install the application. 

### Pre-requisites

- To download and install the .apk, you must first enable the setting `Install unknown apps` on your device. You might be prompted multiple times asking you to confirm whether you want to install the app through the installation process. This is because the .apk does not have a recognized/registered developer linked to it. Simply say yes every time you are asked whether you want to proceed.

### Download Instructions
- To download tech_connect.apk on your Android device, use this [link](https://github.com/aditya-sudarshan/jr_design_JIB356/raw/master/tech_connect.apk) to download the file. You can download the file directly to your phone if you choose to, or you can download it to another device and move it to your phone.

### Install Instructions
- After downloading the file, you must install it on your Android device. To do this, navigate to the file using your file manager. 
- After navigating to the file in your file manager, click on the file to install it. You will be asked a few times whether you want to proceed with installation. Simply say yes every time you are prompted with this question and proceed through the steps given by your device to install the app.

### Run Instructions

The app will now be available in your list of applications with the name `Tech Connect`. To run the application you can open it the same way you would any other app on your device.

### Troublshooting

- If you are running into issues with the download or installation of the app, ensure that all of your phones settings to enable installation of apps from unknown sources are enabled. As our application is not registered with Google Play, and does not have a registered developer account linked to it, it is imperative that you enable all settings on your device to let you download files from unknown sources.

## Running app on Expo

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

[Expo](https://docs.expo.io/) is needed to run this application. Please ensure that Expo is installed by running:
```npm install --global expo-cli```

### Run Instructions
After installing all dependent libraries, you can run the application by opening the terminal for the "jr_design_app folder, and then run:
 ```expo start```
 
Expo will then display a QR code that you can scan on your device to run the app locally. 

### Troubleshooting
- When running the app using Expo, sometimes you will notice that the app does not build on your device after you scan the QR code. In order to get past this problem, go to the browser window which opened when you ran `expo start` and select "Tunnel" as the connection type.
- If you run into errors with npm dependencies, or with expo dependencies, a good start to solving these issues is to delete your cloned copy of the app and re-clone it from this GitHub repository. Aditionally, deleting and reinstalling Expo, and restarting your computer will help you run this app.
