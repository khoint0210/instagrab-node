var Instagram = require ('instagram-nodejs-without-api');
const util = require('util');
const fetch = require('node-fetch');
const request = require ('request');
const instagrab = require('./modules/getAllPhoto.js');
const instagrabAuth = require('./modules/auth.js');
const instagrabAva = require('./modules/getAvaUser.js');
const getStory = require('./modules/getStory.js');

var fs = require('fs');
var readline = require('readline-sync');

    console.log("🎧 === Instagrab === 🎧 ")
    console.log("1. Get all image of user ")
    console.log("2. Authenticate your account")
    console.log("3. Get User's Avatar")
    console.log("4. Get user's story")
    
    var key = readline.question("Enter your choice : ");
        switch (key) {
            case '1':
                var username = readline.question("Username : ");
                instagrab.getAllPhoto(username);            
                break;
            case '2':
                var username = readline.question("Username : ");
                var password = readline.question("Password : ");
                instagrabAuth.authenticate(username,password);
                break;
            case '3' :
                var username = readline.question("Username : ");
                instagrabAva.getAvaUser(username)
                break;
            case '4':
                var username = readline.question("Username : ");
                getStory.getUserStory(username)
                break;                
            default:
                process.exit()
                break;
        }    

