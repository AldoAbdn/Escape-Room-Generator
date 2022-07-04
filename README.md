# Escape Room Generator
This was my honours project for BsC(Hons) Computing: Application Software Development at Robert Gordon University, I have since graduated with first class honours

This is a web app for designing an escape room using drag and drop components, videos of the project can be found [here](https://www.youtube.com/playlist?list=PLbEHeQNU7jcQWKMR6TECMAHtNvJxbaehY)
## Audience 
This web app is aimed at escape room designers of all levels  

There will be a focus on ease of use for users such as teachers, as the web app could be used to design escape rooms for a classroom
## Key Features of the App 
- Allows the creation of escape room designs using a drag and drop interface 
- Allows the export of escape room designs in JSON or PDF format 
- All designs are tied to a user account and can be accessed by signing in 
- Allows accessibility options to be set for a room, that defines constraings that the room must adhere to
- Were possible, will auto generate puzzle solutions 
## Wireframe 
A simple wireframe of the design can be found [here](https://ninjamock.com/s/KCMW2Tx), this was the original wireframe submitted as part of the project and may not reflect the projects current state 
## Main Focuses of the Project 
There are 3 main focuses of the project: 
### Escape Room Design/Portability 
This web app has been designed to allow easy creation and exchange of escape room designs  

As far as I am aware there is no set standard for an escape room design, this project attempts to address this by defining escape room designs in JSON format   

The web app has been designed to be easy to use so that novice designers such as teachers could use the web app for purposes such as gamification of the classroom 
### Puzzle Generation 
Where possible the web app will attempt to generate solutions to puzzles within a design  

Various methods will be experimented with 
### Accessibility 
Escape rooms are becoming more and more popular however accessibility within the escape room industry has not been heavily researched   

I have incorporated accessibility options within the designer so that designers can specify the accessibility of their designs 
## Structure of the Project
The project is made up of two main packages. One is the client side react app and the other is a node/feathersjs backend server. Please refer to the readmes in the client and server folders.
## Available Scripts
In the project directory, you can run:
### `npm start`
Starts the server project
### `npm build`
Builds the react appp
Refer to the readme in the client folder for the environment variables needed for the client application.
### `npm postbuild`
Puts React App build into servers public directory
### `npm buildandstart`
Runs the build script first and then starts the server. Use this command to get the project working on your own machine. Please refer to the readmes of the client and server folders.
### `npm dev`
Starts both the client server and the main server for easier development of the react application.
### `npm postinstall`
Runs npm install in both the client and server package after npm install is run
## Developers Guide
You will need to setup two sets of environment variables, one for the client and one for the server. You can do this using .env files within 
the client and server folders of this project. Refer to the readmes in the client and server folders to setup your environment variables

Once you've done this, from the root directory run the following scripts

    npm install
    npm run dev

This will start both the client and server projects in dev mode on your machine

Once you are happy with your build use the following script from the root directory

    npm run build

This will build the react app and put the build in the servers public folder

You can then start the server with the following script

    npm start

Alternativly you can run the script:

    npm buildandstart

To build the react app, put it in the servers client folder and then start the server

Refer to your hosting platforms docs for how to host your server with the react build. Remember to set the server environment variables from the readme
## Use of Project Code 
Please refer to the attached license
