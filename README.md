# Instagrab-node
> Easy way to get ALL MEDIA of user on instagram

![screenshot](/screenshot/screenshoot.png)

## Require
```
npm install yarn -g
```

## How to use it:
```
git clone https://scm.innoteq.vn/khoint/instagrab-node.git
cd instagrab-node
yarn install
node app.js
# Remember to authenticate to your account for the first time 
```
## Login Manually 
Ok . This happen when you can't login via this app thi reason is Instagram think some one try to hack your account

Here is how to fix.

1. Log out on your laptop
2. Log in again
3. Use EditThisCookie extension to get SessionID and CRSF . Link download : http://www.editthiscookie.com/
4. Add SessionID and CRSF to value/session.json
5. Done. You good to go 
