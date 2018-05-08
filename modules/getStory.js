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
                let arrayLenth = 0;
                if (dataParsed.data.reels_media[0] == undefined) {
                   console.log("This user dont have story to get. Me really sad 😢") 
                }else{
                    for (var index = 0; index < 10000; index++) {
                        arrayLenth++;
                        if (dataParsed.data.reels_media[0].items[index] == undefined){
                            break;
                        }
                    }
                    arrayLenth--
                    for (var index = 0; index < arrayLenth ; index++) {
                        if (dataParsed.data.reels_media[0].items[index].__typename == 'GraphStoryImage'){
                            console.log(dataParsed.data.reels_media[0].items[index].display_url)
                            fs.appendFile(`value/${username}-story.html`, `<img src="${dataParsed.data.reels_media[0].items[index].display_url}" style=" width: 270px;height: 280px;float: left;margin-left: 70px;margin-top: 20px;margin-bottom: 60px;position: relative;">`, function(err){
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }else{
                            if (dataParsed.data.reels_media[0].items[index].video_resources[1] == undefined) {
                                fs.appendFile(`value/${username}-story.html`, `\n<video controls style="width: 270px;height: 280px;float: left;margin-left: 70px;margin-top: 20px;margin-bottom: 60px;position: relative;"> <source src=${dataParsed.data.reels_media[0].items[index].video_resources[0].src} type="video/mp4"> </video>`, function(err){
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                                console.log(dataParsed.data.reels_media[0].items[index].video_resources[0].src)
                            }else{
                                fs.appendFile(`value/${username}-story.html`, `\n<video controls style="width: 270px;height: 280px;float: left;margin-left: 70px;margin-top: 20px;margin-bottom: 60px;position: relative;"> <source src=${dataParsed.data.reels_media[0].items[index].video_resources[1].src} type="video/mp4"> </video>`, function(err){
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                                console.log(dataParsed.data.reels_media[0].items[index].video_resources[1].src)   
                            }
                        }
                    }
                }
            })
        })
    }

module.exports.getUserStory = getUserStory;