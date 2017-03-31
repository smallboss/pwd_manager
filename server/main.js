import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import ServerConfig from '../etc/config.json';
import * as db from './utils/DBUtils';



db.setUpConnection();
const app = express();
app.use(bodyParser.json());
app.use( cors({ origin: '*' }) );

// db.removeAllUsers();
db.createUserAcc({
    login: 'test',
    password: 'test',
    passwordList: [{
        service: 'facebook',
        login: 'fb_login',
        password: 'fb_password'
    }]});


app.post(`/login/`, function (req, res) {
    const { login, password } = req.body;

    db.getUserAcc({ login, password })
        .then( result => res.send(result) );
});


app.post(`/registration/`, function (req, res) {
    const { login, password } = req.body;

    db.createUserAcc({ login, password })
        .then(
            result => {
                console.log(result);
                console.log('\n');
                console.log('============== [ New user registration ] ==============');
                console.log('Successfully');
                console.log(`Login:    ${login}`);
                console.log(`Password: ${password}`);
                console.log('=======================================================');
                return result;
            },
            reject => {
                console.log('\n');
                console.log('============== [ New user registration ] ==============');
                console.log('Error: ', reject);
                console.log(`Login:    ${login}`);
                console.log(`Password: ${password}`);
                console.log('=======================================================');
                return { errMessage: reject };
            }
        )
        .then(result => res.send(result));
});


app.post(`/addpassword/`, function (req, res) {
    const { login, passwordItem } = req.body;

    db.addPassword(login, passwordItem)
        .then( data => res.send(true) );
});


app.post(`/removepassword/`, function (req, res) {
    const { login, passwordItemIndex } = req.body;

    db.removePassword(login, passwordItemIndex)
        .then( data => res.send(true) );
});


app.post(`/editpassword/`, function (req, res) {
    const { login, passwordIndex, passwordItem } = req.body;

    db.editPassword(login, passwordIndex, passwordItem)
        .then( data => res.send(true) )
});


app.listen(ServerConfig.serverPort, function () {
    console.log(`app listening on port ${ServerConfig.serverPort}!`);
});
