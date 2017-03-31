import mongoose from 'mongoose';

const UserAccScheme = new mongoose.Schema({
    login    : { type: String, required: true },
    password : { type: String, required: true },
    passwordList: { type: Array }
});

const UserAcc = mongoose.model('UserAcc', UserAccScheme);