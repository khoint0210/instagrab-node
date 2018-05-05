var Instagram = require ('instagram-nodejs-without-api');
const util = require('util');
const fetch = require('node-fetch');
const request = require ('request');
const instagrab = require('./modules/getAllPhoto.js')
const instagrabAuth = require('./modules/auth.js')
var fs = require('fs');
var readline = require('readline-sync');

console.log("=== Instagrab ===")
console.log("1.Get all image of user")
console.log("2.Authenticate your account")

var key = readline.question("Enter your choice : ");

    switch (key) {
        case '1':
            var username = readline.question("Username of Intsagram account : ");
            instagrab.getAllPhoto(username);            
            break;
        case '2':
            var username = readline.question("Username of your Intsagram account : ");
            var password = readline.question("Password of your Intsagram account : ");
            instagrabAuth.authenticate(username,password);
            break;
        default:
            break;
    }