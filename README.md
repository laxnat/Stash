# Getting Started with Stash

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

If Node.js and Node Package Manager is not installed, then go to https://nodejs.org/ and download the installer for your device.
Run the installer and follow the instructions to install Node.js.

(This project was developed on MacOS so some commands may be different.)
In your terminal, run the command 'npm install -g npx'.
Then go to Visual Studio Code and click 'Clone Git Repository' entering the github repo link.

Verify the project looks the same way. 
A .env.local file must also be created within the main section (where this README file is located at).
This will include the local environment variables to correctly connect the application to our Firebase console.
Once this file is created, copy and past the text below and save.
'REACT_APP_FIREBASE_API_KEY=AIzaSyCy2aJFK71nYQY731TZMQAYFgITehTLuK8
REACT_APP_FIREBASE_AUTH_DOMAIN=cecs327project2-879de.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=cecs327project2-879de
REACT_APP_FIREBASE_STORAGE_BUCKET=cecs327project2-879de.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=990352202883
REACT_APP_FIREBASE_APP_ID=1:990352202883:web:937ce0761cf3389b878fb6
REACT_APP_FIREBASE_MEASUREMENT_ID=G-JNMY8G5DQS'

## Scripts and Installations

In the terminal project directory, you can run these following commands:
'npm i firebase'
'npm i bootstrap react-bootstrap' (Should be the newest version)
'npm i react-router-dom' (Should be the newest version)
'npm i --save @fortawesome/fontawesome-svg-core'
'npm install --save @fortawesome/free-solid-svg-icons'
'npm install --save @fortawesome/react-fontawesome'
'npm i uuid'

## Running the project

### To run the project, in the terminal of the project directory, run the command `npm start`.

When signing in with a new user, an error message will pop up.
Simply close it and continue because this is a bug, so the application will function completely fine.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
