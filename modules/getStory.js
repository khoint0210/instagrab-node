var Instagram = require ('instagram-nodejs-without-api');
const request = require ('request');
var fs = require('fs');

Insta = new Instagram()

var csrfStore;
var sessionid;
var options;


var getUserStory = (username) => {

    fs.readFile("value/session.json", (err, data) => {
        if (err) {
            console.log(err)
        }
        var dataParsed = JSON.parse(data)
        sessionid = dataParsed.SessionID;
        csrfStore = dataParsed.CSRF;
    })

    Insta.getUserDataByUsername(`${username}`).then((t) =>
        {
            userID = t.graphql.user.id;
            console.log("Getting story link");

            var headers = {
                'referer': 'https://www.instagram.com/',
                'origin' : 'https://www.instagram.com',
                'x-instagram-ajax' : '1',
                'x-requested-with' : 'XMLHttpRequest',
                'x-csrftoken' : csrfStore,
                cookie :' sessionid='+sessionid+'; csrftoken='+csrfStore
            }

            options = {
                url: 'https://www.instagram.com/graphql/query/?query_hash=45246d3fe16ccc6577e0bd297a5db1ab&variables={"reel_ids":["'+userID+'"],"tag_names":[],"location_ids":[],"highlight_reel_ids":[],"precomposed_overlay":true}',
                method: 'GET',
                headers: headers,
            }

            request(options, function (err, response ,body) {
                var dataParsed = JSON.parse(body);
                // console.log(dataParsed.data.reels_media[0].items)
                if (dataParsed.data.reels_media[0] == undefined) {
                   console.log("This user dont have story to get. Me really sad 😢") 
                }else{
                    var arrayLenth = 0;
                    for (index = 0; index < 10000; index++) {
                        if (dataParsed.data.reels_media[0].items[index] == undefined){
                            arrayLenth++;
                            break;
                        }
                    }
                    if(dataParsed.data.reels_media[0].items[--arrayLenth].__typename == 'GraphStoryImage'){
                        console.log(dataParsed.data.reels_media[0].items[arrayLenth].display_url)
                    }else{
                        if (dataParsed.data.reels_media[0].items[arrayLenth].video_resources[1] == undefined) {
                            console.log(dataParsed.data.reels_media[0].items[arrayLenth].video_resources[0].src)
                        }
                    }
                }
            })
        })
    }

module.exports.getUserStory = getUserStory;