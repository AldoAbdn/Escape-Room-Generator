# Escape Room Generator Server

> Server that provides an API for updating escape rooms (uses feathersjs)

## Environment Variables
The server has 5 environment variables that must be set. These can be put in a .env file that looks like this:
    HOST=127.0.0.1
    PORT=3030
    MONGOURI=PUT YOUR DB URI HERE
    AUDIENCE=PUT YOUR AUDIENCE HERE
    ISSUER=PUT YOUR ISSUER HERE
Refer to the server/config folder for how these variables are used

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/escape-room-generator-server
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
