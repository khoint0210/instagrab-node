var Instagram = require ('instagram-nodejs-without-api');
const request = require ('request');
var fs = require('fs');

Instagram = new Instagram()
var csrfStore;
var sessionid;
var end_cursor = "";
var check;
var options;


var getAvaUser = (username) => {

fs.readFile("value/session.json", (err, data) => {
    if (err) {
        console.log(err)
    }
    var dataParsed = JSON.parse(data)
    sessionid = dataParsed.SessionID;
    csrfStore = dataParsed.CSRF;
})

Instagram.getUserDataByUsername(`${username}`).then((t) =>
    {
        userID = t.graphql.user.id;
        console.log("Getting image link");

        var headers = {
            'referer': 'https://www.instagram.com/',
            'origin' : 'https://www.instagram.com',
            'x-instagram-ajax' : '1',
            'x-requested-with' : 'XMLHttpRequest',
            'x-csrftoken' : csrfStore,
            cookie :' sessionid='+sessionid+'; csrftoken='+csrfStore
        }

        options = {
            url: 'https://i.instagram.com/api/v1/users/'+userID+'/info/',
            method: 'GET',
            headers: headers,
        }

        request(options, function (err, response ,body) {
            var dataParsed = JSON.parse(body);
            console.log(dataParsed.user.hd_profile_pic_url_info.url);
        })

    })

}

module.exports.getAvaUser = getAvaUser;