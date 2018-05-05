var Instagram = require ('instagram-nodejs-without-api');
const util = require('util');
const fetch = require('node-fetch');
const request = require ('request');
const instagrab = require('./modules/getAllPhoto.js');
const instagrabAuth = require('./modules/auth.js');
const instagrabAva = require('./modules/getAvaUser');
var fs = require('fs');
var readline = require('readline-sync');

console.log("=== Instagrab ===")
console.log("1. Get all image of user")
console.log("2. Authenticate your account")
console.log("3. Get User's Avatar")

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
        case '3' :
            var username = readline.question("Username of Intsagram account : ");
            instagrabAva.getAvaUser(username)
            break
        default:
            break;
    }