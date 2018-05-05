var Instagram = require ('instagram-nodejs-without-api');
const request = require ('request');
var fs = require('fs');

Instagram = new Instagram()
var csrfStore;
var sessionid;
var end_cursor = "";
var check;
var options;


var getAllPhoto = (username) => {

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
        // console.log(t);
        // console.log("")
        // console.log(util.inspect(t.graphql.user.edge_owner_to_timeline_media))
        userID = t.graphql.user.id;
        console.log("Getting image link");
        // console.log("Get Object from node")
        // console.log(util.inspect(t.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url))        

        var headers = {
            'referer': 'https://www.instagram.com/',
            'origin' : 'https://www.instagram.com',
            'x-instagram-ajax' : '1',
            'x-requested-with' : 'XMLHttpRequest',
            'x-csrftoken' : csrfStore,
            cookie :' sessionid='+sessionid+'; csrftoken='+csrfStore
        }

        options = {
            url: 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"'+userID+'","first":50}',
            method: 'GET',
            headers: headers,
        }

        count = 0;        


        function getImage() {
            request(options, function (error, response, body) {
                // console.log(response.statusCode);
                // console.log(body);
                if (!error && response.statusCode == 200) {
                    var parsedData = JSON.parse(body);
                    var arrayLength = parsedData.data.user.edge_owner_to_timeline_media.count;
                    if (arrayLength > 50) {
                        for (let index = 0; index < 50 ; index++) {
                            count++
                            console.log(count)
                            // console.log(parsedData.data.user.edge_owner_to_timeline_media.edges[index].node.display_url)
                            check = parsedData.data.user.edge_owner_to_timeline_media.page_info.has_next_page;
                            fs.appendFile(`value/${username}-all-image.html`, `\n<img src="${parsedData.data.user.edge_owner_to_timeline_media.edges[index].node.display_url}" style=" width: 270px;height: 280px;float: left;margin-left: 70px;margin-top: 20px;margin-bottom: 60px;position: relative;">`, (err) => {  
                                if (err) throw err;
                            });

                            if (count == parsedData.data.user.edge_owner_to_timeline_media.count) {
                                console.log(`File is saved at : value/${username}-all-image.html`);                                
                                break;
                            }
                        }
                            if (check == true) {
                                end_cursor = parsedData.data.user.edge_owner_to_timeline_media.page_info.end_cursor
                                options = {
                                    url: 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"'+userID+'","first":50,"after":"'+end_cursor+'"}',
                                    method: 'GET',
                                    headers: headers,
                                }
                                getImage();
                            }
                    } else {
                        for (let index = 0; index < arrayLength ; index++) {
                            count++
                            console.log(count)
                            // console.log(parsedData.data.user.edge_owner_to_timeline_media.edges[index].node.display_url)
                            fs.appendFile(`value/${username}-all-image.html`, `\n<img src="${parsedData.data.user.edge_owner_to_timeline_media.edges[index].node.display_url}" style=" width: 270px;height: 280px;float: left;margin-left: 70px;margin-top: 20px;margin-bottom: 60px;position: relative;">`, (err) => {  
                                if (err) throw err;
                            });
                            if (count == parsedData.data.user.edge_owner_to_timeline_media.count) {
                                console.log(`File is saved at : value/${username}-all-image.html`);                                
                                break;
                            }
                        }
                    }
                }
            })
        }
        fs.stat(`value/${username}-all-image.html`, function (err, stat) {
            if (err == null) {
                fs.unlink(`value/${username}-all-image.html`, (err) => {
                    if (err) throw err;
                })
            }                        
        })
        getImage();
    })
}
    module.exports.getAllPhoto = getAllPhoto;