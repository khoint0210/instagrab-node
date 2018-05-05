var Instagram = require ('instagram-nodejs-without-api');
var fs = require('fs');

Instagram = new Instagram()

var authenticateAccount = (username, password) => {

var csrfStore;

Instagram.getCsrfToken().then((csrf) =>
{
  Instagram.csrfToken = csrf;
  csrfStore = csrf;

}).then(() =>
{
  Instagram.auth(`${username}`, `${password}`).then(sessionId =>
  {
    Instagram.sessionId = sessionId

    fs.writeFile("value/session.json", `{\n "SessionID" : "${sessionId}",\n" CSRF" : "${csrfStore}"\n}`, function(err){
        if (err) {
            console.log(err)
        }
        console.log("File have been save")
    })
  })
})
}

module.exports.authenticate = authenticateAccount;