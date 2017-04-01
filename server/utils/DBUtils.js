import mongoose from 'mongoose';

import ServerConfig from '../../etc/config.json';
import '../models/UserAccount';

const UserAcc = mongoose.model('UserAcc');

export function setUpConnection() {
    mongoose.Promise = require('bluebird');
    const db_path = `mongodb://${ServerConfig.db.host}:${ServerConfig.db.port}/${ServerConfig.db.name}`;
    mongoose.connect(db_path)
        .catch(err => {
            console.log(err.message);
            console.log(`Please run mongodb on [${ServerConfig.db.host}:${ServerConfig.db.port}] and run server`);
            console.log(process.exit())
        });
}

export function getUserAcc(userData) {
    const { login, password } = userData;
    return UserAcc.findOne({ login, password });
}

export function createUserAcc(newUserData) {

    return UserAcc.findOne({login: newUserData.login})
        .then(data => {
            if(data) {
                return Promise.reject('User already exist');
            }
            else{
                const userAcc = new UserAcc({
                    login    : newUserData.login,
                    password : newUserData.password,
                    passwordList: newUserData.passwordList || []
                });

                return userAcc.save();
            }
        });
}


export function addPassword(login, passwordItem) {
    return UserAcc.findOne({ login }, (err, user) =>{
        user.passwordList.unshift(passwordItem);
        return user.save();
    });
}


export function removePassword(login, passwordIndex) {
    return UserAcc.findOne({ login }, (err, user) =>{
        user.passwordList.splice(passwordIndex, 1);
        return user.save();
    });
}


export function editPassword(login, passwordIndex, passwordItem) {
    return UserAcc.findOne({ login }, (err, user) => {
        user.passwordList.splice(passwordIndex, 1, passwordItem);
        return user.save();
    });
}


export function listUserAcc() {
    return UserAcc.find();
}


export function removeAllUsers() {
    UserAcc.remove({}, function(err) {
        console.log('Collection UserAcc removed')
    });
}


export function deleteUserAcc(id) {
    return UserAcc.findById(id).remove();
}